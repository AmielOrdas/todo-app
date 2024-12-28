import express, { Request, Response } from "express";
import { ZnewTaskSchemaServer } from "../../../lib/serverTypes";
import { parse } from "dotenv";
import { ZodError } from "zod";
import { connectMongoAtlas } from "../database/db";
const router = express.Router();

router.post("/", (req: Request, res: Response) => {
  try {
    // const { TaskName, TaskDeadline, TaskDescription, TaskImage } = req.body;
    ZnewTaskSchemaServer.safeParse(req.body);
    res.sendStatus(401).json({
      message: "New Task Created Successfully",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.errors,
      });
    } else {
      console.error("Unexpected Error: ", error);
      return res.status(500).json({
        error: "Unexpected Error",
      });
    }
  }
});

router.get("/", (req: Request, res: Response) => {
  res.send({ message: "Hello from get all forms" });
});

router
  .route("/:id")
  .get((req: Request, res: Response) => {
    res.send({
      message: `Hello from get specific form with an ID of ${req.params.id}`,
    });
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
