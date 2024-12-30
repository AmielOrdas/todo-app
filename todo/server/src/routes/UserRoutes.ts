import express, { Request, Response } from "express";
import {
  ZloginSignupSchemaServer,
  ZsignupSchemaServer,
} from "../../../lib/serverTypes";
import { ZodError } from "zod";
import { UserCollection } from "../main";
import { validateData } from "../../../lib/middleware";
const router = express.Router();

// console.log("HELLO FROM USER ROUTES");

router.post(
  "/login",
  validateData(ZloginSignupSchemaServer) as any,
  async (req: Request, res: Response) => {
    try {
      // Get Input from Client
      const loginData = ZloginSignupSchemaServer.safeParse(req.body);

      const email = loginData.data?.email;
      const password = loginData.data?.password;

      // Check if account with the entered email already exists
      const user = await UserCollection.findOne({ email });

      // If account do not exist, return
      if (!user) {
        return res.status(404).json({ message: "User does not exist" });
      }

      // If account exists, check if password matches
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid email or password." });
      }

      console.log("Received data: ", { email, password });

      // Permit entry
      res.status(200).json({ message: "Account Successfully Logged In" });
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
  }
);

router.post(
  "/signup",
  validateData(ZsignupSchemaServer) as any,
  async (req: Request, res: Response) => {
    try {
      console.log("HELLO FROM SIGN UP ROUTE");
      // Get data from client
      const signupData = ZsignupSchemaServer.safeParse(req.body);
      const email = signupData.data?.email;
      const password = signupData.data?.password;

      // Check if account already exists
      const user = await UserCollection.findOne({ email });

      // Prevent account creation if account already exists
      if (user) {
        return res.status(409).json({ message: "Account already exists." });
      }

      // If new record, insert data to database
      await UserCollection.insertOne({ email, password });

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
  }
);

// router.post("/test", async (req: Request, res: Response) => {
//   console.log("data: ", req.body);
//   return res.send({ message: "HELLO FROM POST" });
// });

// router.Statusget("/mama", (req: Request, res: Response) => {
//   return res.send({ message: "HELLO FROM GET" });
// });

export default router;
