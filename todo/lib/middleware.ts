import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

dotenv.config({ path: "../.env" });

// Middleware to validate incoming data using zod schema
export function validateData(schema: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Use zod safeParse to validate the data using the provided zod schema.
    const parseResult = schema.safeParse(req.body);

    if (!parseResult.success) {
      // Validation failed, send error response
      return res.status(400).json({
        message: "Validation failed. Please input the necessary information",
        errors: parseResult.error.errors,
      });
    }

    // Continue to the next middleware/route handler after validation passed.
    next();
  };
}

// Middleware for Authentication
export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  // Get token when token is in authorization header
  // const token = req.headers.authorization?.split(" ")[1];

  // Get token in cookies
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return;
  }

  try {
    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || "");

    // Checking if the decoded token is an object and verify id, email and username properties.
    if (
      typeof decoded === "object" &&
      "_id" in decoded &&
      "email" in decoded &&
      "userName" in decoded
    ) {
      req.user = decoded as { _id: string; email: string; userName: string }; // put the token in "req.user"
      next();
    } else {
      return;
    }
  } catch (error) {
    res.status(403).json({ message: "Invalid or token expired." });
  }
};
