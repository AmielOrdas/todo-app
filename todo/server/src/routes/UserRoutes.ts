import express, { Request, Response } from "express";
import {
  ZloginSignupSchemaServer,
  ZsignupSchemaServer,
} from "../../../lib/serverTypes";
import { ZodError } from "zod";
import { UserCollection } from "../main";

const router = express.Router();

// console.log("HELLO FROM USER ROUTES");

router.post("/login", async (req: Request, res: Response) => {
  try {
    // Get Input from Client
    const loginData = ZloginSignupSchemaServer.safeParse(req.body);
    // Insert validation for authentication

    const email = loginData.data?.email;
    const password = loginData.data?.password;
    // Insert validation for authentication

    console.log("Received data: ", { email, password });

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
    console.log("HELLO FROM SIGN UP ROUTE");
    // Get data from client
    const signupData = ZsignupSchemaServer.safeParse(req.body);
    const email = signupData.data?.email;
    const password = signupData.data?.password;
    // const email = "h";
    // const password = "xdd";
    // Insert validation for authentication

    // Insert data to database
    // await UserCollection.insertOne({ email, password });
    // res.sendStatus(201).json({ message: "Account Successfully Created" });
    console.log("RETRIEVED: ", signupData.data);
    res.status(201).json({ message: "Account Successfully Created" });
  } catch (error) {
    if (error instanceof ZodError) {
      return res
        .sendStatus(401)
        .json({ error: "Account Creation Failed", details: error.errors });
    } else {
      console.error("Unexpected error: ", error);
      return res.sendStatus(500).json({ error: "Unexpected error" });
    }
  }
});

// router.post("/test", async (req: Request, res: Response) => {
//   console.log("data: ", req.body);
//   return res.send({ message: "HELLO FROM POST" });
// });

// router.get("/mama", (req: Request, res: Response) => {
//   return res.send({ message: "HELLO FROM GET" });
// });

export default router;
