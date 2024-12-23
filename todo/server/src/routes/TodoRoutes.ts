import express, { Request, Response } from "express";

const router = express.Router();

router.post("/form", (req: Request, res: Response) => {
  res.send({ message: "Hello from creating a new form!" });

  res.sendStatus(404);
});

router.get("/form", (req: Request, res: Response) => {
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
