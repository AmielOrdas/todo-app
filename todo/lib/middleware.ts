import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

dotenv.config({ path: "../.env" });

export function validateData(schema: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const parseResult = schema.safeParse(req.body);

    if (!parseResult.success) {
      // Validation failed, send error response
      console.log("FAILED VALIDATION");
      return res.status(400).json({
        message: "Validation failed. Please input the necessary information",
        errors: parseResult.error.errors,
      });
    }

    // Validation passed, continue to the next middleware/route handler
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
    // Attach info to request

    if (typeof decoded === "object" && "_id" in decoded && "email" in decoded) {
      req.user = decoded as { _id: string; email: string };
      next();
    } else {
      return;
    }
  } catch (error) {
    res.status(403).json({ message: "Invalid or token expired." });
  }
};

// For Role Authorization
// export function verifyUser(req: Request, res: Response, next: NextFunction) {
//   // Get Token from Cookies
//   const token = req.cookies.token;
//   // Check if Token exists
//   if (!token) {
//     return res.json("Token is missing");
//   } else {
//     // If token exists, verify then add secret key made from UserRoutes
//     jwt.verify(token, "jwt-test-secret-key", (error, decoded) => {
//       if (error) {
//         return res.json("Error with token");
//       } else {
//         if (decoded.someProp === "SomeValue") {
//           next();
//         } else {
//           return res.json("Not the Role");
//         }
//       }
//     });
//   }
// }
