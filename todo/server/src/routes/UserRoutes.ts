import express, { Request, Response } from "express";
import { ZloginSignupSchemaServer, ZsignupSchemaServer } from "../../../lib/serverTypes";
import { ZodError } from "zod";
import { UserCollection } from "../main";
import { validateData } from "../../../lib/middleware";
// Import Libraries for Authentication and Authorization
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const router = express.Router();

router.use(cookieParser());

// console.log("HELLO FROM USER ROUTES");

// PROTECTED GET ROUTE
// router.use('/protected', verifyUser: any, (req: Request, res: Response) => {
//   res.json("Success");
// })

// LOGIN POST ROUTE
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

      if (password !== undefined) {
        // If account exists, check if password matches
        if (user) {
          // Compare passwords
          bcrypt.compare(password, user.password, (error, response) => {
            // If password is correct
            if (response) {
              // Generate token - secret key must be at least 32 chars - expires in 1 hour
              const token = jwt.sign(
                { _id: user._id, email: user.email },
                process.env.JWT_SECRET || "",
                { expiresIn: "1h" }
              );
              // Set Cookie
              res.cookie("token", token);
              // Send Response with token
              return res.status(200).json({
                Status: "Success",
                message: "Account Successfully Logged In",
                token: token,
              });
            } else {
              // Return if password is incorrect
              return res.status(401).json({ message: "Password is incorrect" });
            }
          });
        } else {
          return res.status(404).json({ message: "User does not exist" });
        }
      }

      console.log("Received data: ", { email, password });
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .sendStatus(401)
          .json({ error: "Account Login Failed", details: error.errors });
      } else {
        console.error("Unexpected error: ", error);
        return res.status(500).json({ error: "Unexpected error" });
      }
    }
  }
);

// SIGNUP POST ROUTE
router.post(
  "/signup",
  validateData(ZsignupSchemaServer) as any,
  async (req: Request, res: Response) => {
    try {
      console.log("HELLO FROM SIGN UP ROUTE");
      // Get data from client
      const signupData = ZsignupSchemaServer.safeParse(req.body);

      // Initialize properties for authentication purposes
      const email = signupData.data?.email;
      const password = signupData.data?.password;

      // Check if account already exists
      const user = await UserCollection.findOne({ email });

      // Prevent account creation if account already exists
      if (user) {
        return res.status(409).json({ message: "Account already exists." });
      } else {
        // If new record, hash password with 10x calculation then insert data to database
        if (password !== undefined) {
          const hashPassword = await bcrypt.hash(password, 10);
          await UserCollection.insertOne({ email, password: hashPassword });
          res.status(201).json({
            Status: "Success",
            message: "Account Successfully Created",
          });
          console.log("RETRIEVED: ", signupData.data, hashPassword);
        }
      }
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .sendStatus(401)
          .json({ error: "Account Creation Failed", details: error.errors });
      } else {
        console.error("Unexpected error: ", error);
        return res.status(500).json({ error: "Unexpected error" });
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
