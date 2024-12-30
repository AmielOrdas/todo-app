import express, { Request, Response } from "express";
import { ZnewTaskSchemaServer } from "../../../lib/serverTypes";
import { parse } from "dotenv";
import { ZodError } from "zod";
import { connectMongoAtlas } from "../database/db";
import { validateTask } from "../../../lib/middleware";
const router = express.Router();

router.post(
  "/",
  validateTask(ZnewTaskSchemaServer) as any,
  (req: Request, res: Response) => {
    console.log("Test");
  }
);

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
