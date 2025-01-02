import express, { Request, Response } from "express";
import { ZnewTaskSchemaServer, TImage } from "../../../lib/serverTypes";
import { parse } from "dotenv";
import { ZodError } from "zod";
import { connectMongoAtlas } from "../database/db";
import { validateTask } from "../../../lib/middleware";
import multer from "multer";
import { getDBVariables } from "../database/db";

const router = express.Router();

const assets = multer.memoryStorage();

const upload = multer({ storage: assets });

router.post(
  "/",
  upload.single("TaskImage"),
  validateTask(ZnewTaskSchemaServer) as any,
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
      TaskCollection.insertOne({
        name: req.body.TaskName,
        deadline: req.body.TaskDeadline,
        description: req.body.TaskDescription,
        imageName: file?.originalname,
        imageData: file?.buffer.toString("base64"),
        isPending: true,
      });
      res.status(201).json({
        message: "New Task Created",
      });
    }
  }
);

router.get("/", (req: Request, res: Response) => {
  res.send({ message: "Hello from get all forms" });
});

router
  .route("/:id")
  .get((req: Request, res: Response) => {
    res.send({ message: `Hello from get specific form with an ID of ${req.params.id}` });
  })
  .put((req: Request, res: Response) => {
    res.send({
      message: `Hello from edit specific form with an ID of ${req.params.id} `,
    });
  })
  .delete((req: Request, res: Response) => {
    res.send({ message: `Delete form with ID ${req.params.id}` });
  });

export default router;
