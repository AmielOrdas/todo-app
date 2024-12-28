import express, { Request, Response } from "express";
import { ZloginSignupSchema, ZsignupSchema } from "../../../lib/types";
import { ZodError } from "zod";
import { UserCollection } from "../main";

const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  try {
    // Get Input from Client
    // const loginData = ZloginSignupSchema.safeParse(req.body);
    // Insert validation for authentication

    return res
      .sendStatus(202)
      .json({ message: "Account Successfully Logged In" });
  } catch (error) {
    if (error instanceof ZodError) {
      return res
        .sendStatus(401)
        .json({ error: "Account Login Failed", details: error.errors });
    } else {
      console.error("Unexpected error: ", error);
      return res.sendStatus(500).json({ erorr: "Unexpected error" });
    }
  }
});

router.post("/signup", async (req: Request, res: Response) => {
  try {
    // Get data from client
    // const signupData = ZsignupSchema.safeParse(req.body);
    // Insert validation for authentication

    // Insert data to database
    // await UserCollection.insertOne({ signupData });
    return res
      .sendStatus(201)
      .json({ message: "Account Successfully Created" });
  } catch (error) {
    if (error instanceof ZodError) {
      return res
        .sendStatus(401)
        .json({ error: "Account Creation Failed", details: error.errors });
    } else {
      console.error("Unexpected error: ", error);
      return res.sendStatus(500).json({ erorr: "Unexpected error" });
    }
  }
});

export default router;
