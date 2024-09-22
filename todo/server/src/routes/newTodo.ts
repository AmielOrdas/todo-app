import express, { Request, Response } from "express";

const router = express.Router();

router.post("/", (req: Request, res: Response) => {
  res.send({ message: "Hello XD XD" });

  res.sendStatus(404);
});

export default router;
