import express, { Request, Response } from "express";
import {
  ZloginSchemaServer,
  ZsignupSchemaServer,
} from "../../../lib/serverTypes";
import { ZodError } from "zod";
import { connectMongoAtlas, getDBVariables } from "../database/db";
import { authenticateUser, validateData } from "../../../lib/middleware";
// Import Libraries for Authentication and Authorization
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const router = express.Router();

// LOGIN POST ROUTE
router.post(
  "/login",
  validateData(ZloginSchemaServer),
  async (req: Request, res: Response) => {
    try {
      // Connect to Database
      await connectMongoAtlas();
      // Get UserCollection
      const { UserCollection } = getDBVariables();
      // Get Input from Client
      const loginData = ZloginSchemaServer.safeParse(req.body);
      // Initialize properties for authentication purposes
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
                { _id: user._id, email: user.email, userName: user.userName },
                process.env.JWT_SECRET_KEY || "",
                { expiresIn: "1h" }
              );
              // Set Cookie
              res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                path: "/", // Explicit path
                maxAge: 3600000, // 1 hour
              });
              // Send Response
              return res.status(200).json({
                Status: "Success",
                message: "Account Successfully Logged In",
              });
            } else {
              // Return if password is incorrect
              return res.status(401).json({ error: "Password is incorrect" });
            }
          });
        } else {
          return res.status(404).json({ error: "User does not exist" });
        }
      }
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(401)
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
  validateData(ZsignupSchemaServer),
  async (req: Request, res: Response) => {
    try {
      // Connect to Database
      await connectMongoAtlas();
      // Get UserCollection
      const { UserCollection } = getDBVariables();
      // Get data from client
      const signupData = ZsignupSchemaServer.safeParse(req.body);
      // Initialize properties for authentication purposes
      const userName = signupData.data?.userName;
      const email = signupData.data?.email;
      const password = signupData.data?.password;

      // Check if account already exists
      const user = await UserCollection.findOne({ email });

      // Prevent account creation if account already exists
      if (user) {
        return res.status(409).json({ error: "Account already exists." });
      } else {
        // If new record, hash password with 10x hashing rounds then insert data to database
        if (password !== undefined) {
          const hashPassword = await bcrypt.hash(password, 10);
          await UserCollection.insertOne({
            userName,
            email,
            password: hashPassword,
          });
          res.status(201).json({
            Status: "Success",
            message: "Account Successfully Created",
          });
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

// Navigation Route for Display Name
router.get(
  "/navName",
  authenticateUser,
  async (req: Request, res: Response) => {
    try {
      // Get userName from cookie
      const userName = req.user?.userName;
      return res.json({ userName });
    } catch (error) {
      console.error(error);
    }
  }
);

// SIGN OUT ROUTE
router.post("/signout", async (req: Request, res: Response) => {
  try {
    // Clear Cookie Once Signed Out
    res.clearCookie("token", {
      path: "/", // Explicit path to match
    });
    res.send({ message: "Successfully Signed out" });
  } catch (error) {
    console.error("Unexpected error: ", error);
    return res.status(500).json({ error: "Unexpected error" });
  }
});

export default router;
