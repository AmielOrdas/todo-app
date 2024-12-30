import { parse } from "dotenv";
import { Request, Response, NextFunction } from "express";

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
