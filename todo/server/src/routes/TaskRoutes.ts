import express, { Request, Response } from "express";
import { ZnewTaskSchemaServer, TImage } from "../../../lib/serverTypes";
import { parse } from "dotenv";
import { ZodError } from "zod";
import { validateData, authenticateUser } from "../../../lib/middleware";
import multer from "multer";
import { connectMongoAtlas, getDBVariables } from "../database/db";
import { ObjectId, WithId } from "mongodb";

import { TdatabaseTaskProps } from "../../../lib/serverTypes";
const router = express.Router();

const assets = multer.memoryStorage();

const upload = multer({ storage: assets });

process.on("uncaughtException", (err) => {
  console.error("Unhandled error:", err);
  // Optionally, gracefully shut down the server or restart it
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled promise rejection:", reason);
  // Optionally, gracefully shut down the server or restart it
});

router.post(
  "/",
  authenticateUser,
  upload.single("TaskImage"),
  validateData(ZnewTaskSchemaServer),
  async (req: Request, res: Response) => {
    await connectMongoAtlas();
    const { TaskCollection } = getDBVariables();
    const file = req.file;

    if (file?.mimetype && !TImage.includes(file.mimetype)) {
      res.status(400).json({
        message: "File must be an image (JPEG, PNG, GIF)",
      });
    } else if (file?.mimetype && !(file.size < 2 * 1024 ** 2)) {
      res.status(400).json({
        message: "File size must be less than 2 mb",
      });
    } else {
      await TaskCollection.insertOne({
        name: req.body.TaskName,
        deadline: req.body.TaskDeadline,
        description: req.body.TaskDescription,
        imageName: file?.originalname,
        imageData: file?.buffer.toString("base64"),
        isPending: true,
        userID: req.user?._id, // _id from the token
      });
      res.status(201).json({
        message: "New Task Created",
      });
    }
  }
);

router.get(
  "/pending",
  authenticateUser,
  async (req: Request, res: Response) => {
    try {
      // Connect to Database
      await connectMongoAtlas();
      // Get TaskCollection
      const { TaskCollection } = getDBVariables();
      // Get userID and userName from cookie's token
      const userID = req.user?._id;
      const userName = req.user?.userName;
      // Fetch all pending tasks from database using userID as key - Convert Cursor to Array
      const pendingTasks = (await TaskCollection.find({
        userID,
        isPending: true,
      }).toArray()) as WithId<TdatabaseTaskProps>[];

      const modifiedData = pendingTasks.map((myData: TdatabaseTaskProps) => ({
        _id: myData._id,
        TaskName: myData.name,
        TaskDeadline: myData.deadline,
        TaskDescription: myData.description,
        ImageName: myData.imageName,
        ImageData: myData.imageData,
        isPending: myData.isPending,
      }));

      if (pendingTasks.length === 0) {
        return res.status(404).json({
          pendingTasks: [],
          userName,
          message: "User has no pending tasks",
        });
      } else {
        return res.status(200).json({
          modifiedData,
          userName,
          message: "Successfully fetched pending tasks",
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
);

router.get(
  "/finished",
  authenticateUser,
  async (req: Request, res: Response) => {
    try {
      // Connect to Database
      await connectMongoAtlas();
      // Get TaskCollection
      const { TaskCollection } = getDBVariables();
      // Get userID and userName from cookie's token
      const userID = req.user?._id;
      const userName = req.user?.userName;
      // Fetch all pending tasks from database using userID as key - Convert Cursor to Array
      const pendingTasks = (await TaskCollection.find({
        userID,
        isPending: false,
      }).toArray()) as WithId<TdatabaseTaskProps>[];

      const modifiedData = pendingTasks.map((myData: TdatabaseTaskProps) => ({
        _id: myData._id,
        TaskName: myData.name,
        TaskDeadline: myData.deadline,
        TaskDescription: myData.description,
        ImageName: myData.imageName,
        ImageData: myData.imageData,
        isPending: myData.isPending,
      }));

      if (pendingTasks.length === 0) {
        return res.status(404).json({
          finishedTasks: [],
          userName,
          message: "User has no finished tasks",
        });
      } else {
        return res.status(200).json({
          modifiedData,
          userName,
          message: "Successfully fetched pending tasks",
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
);

router
  .route("/:id")
  .get(authenticateUser, async (req: Request, res: Response) => {
    // Retrieve ID and Key/Value Pairs
    const { id } = req.params;
    const { TaskName, TaskDeadline, TaskDescription } = req.body;
    // Retrieve User ID and userName from cookie
    const userID = req.user?._id;
    const userName = req.user?.userName;

    try {
      await connectMongoAtlas();
      // Get TaskCollection
      const { TaskCollection } = getDBVariables();

      // Find Task

      const task = (await TaskCollection.find({
        userID,
        _id: new ObjectId(id),
      }).toArray()) as WithId<TdatabaseTaskProps>[];

      const modifiedData = task.map((myData: TdatabaseTaskProps) => ({
        _id: myData._id,
        TaskName: myData.name,
        TaskDeadline: myData.deadline,
        TaskDescription: myData.description,
        ImageName: myData.imageName,
        ImageData: myData.imageData,
        isPending: myData.isPending,
      }));

      if (task.length === 0) {
        return res.status(404).json({
          task: [],
          userName,
          message: "Task not found in the database or Unauthorized",
        });
      } else {
        return res.status(200).json({
          modifiedData,
          userName,
          message: "Successfully fetched the task",
        });
      }
    } catch (error) {
      console.error(error);
    }
  })
  .put(authenticateUser, async (req: Request, res: Response) => {
    // Retrieve ID and Key/Value Pairs
    const { id } = req.params;
    const { TaskName, TaskDeadline, TaskDescription } = req.body;
    // Retrieve User ID from cookie
    const userID = req.user?._id;

    try {
      // Connect to Database
      await connectMongoAtlas();
      // Get TaskCollection
      const { TaskCollection } = getDBVariables();

      // Update Task
      const result = await TaskCollection.updateOne(
        { _id: new ObjectId(id), userID },
        {
          $set: {
            name: TaskName,
            deadline: TaskDeadline,
            description: TaskDescription,
          },
        }
      );

      // Check if task has found in database
      if (result.matchedCount === 0) {
        return res
          .status(404)
          .json({ message: "Task not found in the database or Unauthorized" });
      }
      return res.status(200).json({ message: "Task updated successfully" });
    } catch (error) {
      console.error(error);
    }
  })
  .delete(authenticateUser, async (req: Request, res: Response) => {
    // Retrieve Task ID
    const { id } = req.params;
    // Retrieve User ID from cookie
    const userID = req.user?._id;
    const { TaskName, TaskDeadline, TaskDescription } = req.body;
    try {
      // Connect to Database
      await connectMongoAtlas();
      // Get TaskCollection
      const { TaskCollection } = getDBVariables();

      // Delete the task using its id and userID
      const result = await TaskCollection.deleteOne({
        _id: new ObjectId(id),
        userID,
      });
      // Check if a task has been deleted
      if (result.deletedCount === 0) {
        return res
          .status(404)
          .json({ message: "Task not found in the database or Unauthorized" });
      }
      return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error(error);
    }
  });

router.put(
  "/:id/ModifyIsPending",
  authenticateUser,
  async (req: Request, res: Response) => {
    // Retrieve Task ID
    const { id } = req.params;
    // Retrieve User ID from cookie
    const userID = req.user?._id;

    const { isPending } = req.body;

    try {
      await connectMongoAtlas();
      const { TaskCollection } = getDBVariables();
      // Update Task
      const result = await TaskCollection.updateOne(
        { _id: new ObjectId(id), userID },
        {
          $set: {
            isPending,
          },
        }
      );

      res.status(200).json({ message: "Edit successful" });
    } catch (error) {
      console.error(error);
    }
  }
);

export default router;
