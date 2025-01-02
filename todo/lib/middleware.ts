import { parse } from "dotenv";
import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

export function validateData(schema: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const parseResult = schema.safeParse(req.body);

    if (!parseResult.success) {
      // Validation failed, send error response
      return res.status(400).json({
        message: "Validation failed. Please input the necessary information",
        errors: parseResult.error.errors,
      });
    }

    // Validation passed, continue to the next middleware/route handler
    next();
  };
}

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
