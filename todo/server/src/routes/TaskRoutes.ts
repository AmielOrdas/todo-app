import express, { Request, Response } from "express";
import { ZnewTaskSchemaServer, TImage } from "../../../lib/serverTypes";
import { parse } from "dotenv";
import { ZodError } from "zod";
import { validateData, authenticateUser } from "../../../lib/middleware";
import multer from "multer";
import { connectMongoAtlas, getDBVariables } from "../database/db";
import { ObjectId } from "mongodb";

const router = express.Router();

const assets = multer.memoryStorage();

const upload = multer({ storage: assets });

router.post(
  "/",
  authenticateUser,
  upload.single("TaskImage"),
  validateData(ZnewTaskSchemaServer),
  async (req: Request, res: Response) => {
    await connectMongoAtlas();
    const { TaskCollection } = getDBVariables();
    const file = req.file;
    console.log(file);
    console.log(req.user);
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
      // Get userID from cookie's token
      const userID = req.user?._id;
      // Fetch all pending tasks from database using userID as key - Convert Cursor to Array
      const pendingTasks = await TaskCollection.find({
        userID,
        isPending: true,
      }).toArray();
      console.log(userID);
      if (pendingTasks.length === 0) {
        return res
          .status(404)
          .json({ pendingTasks: [], message: "User has no pending tasks" });
      } else {
        return res.status(200).json({
          pendingTasks,
          message: "Successfully fetched pending tasks",
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
);

router.get("/finished", (req: Request, res: Response) => {
  res.send({ message: "Hello from get all forms" });
});

router
  .route("/:id")
  .get((req: Request, res: Response) => {
    res.send({
      message: `Hello from get specific form with an ID of ${req.params.id}`,
    });
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

export default router;
