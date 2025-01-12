import { z } from "zod";
import { ObjectId } from "mongodb";

export const ZnewTaskSchemaServer = z.object({
  TaskName: z
    .string({
      invalid_type_error: "Task Name must be a string",
    })
    .min(1, {
      message: "Task Name is required",
    })
    .refine((value) => value.trim().length > 0, {
      message: "Task Name cannot be blank",
    }),
  TaskDeadline: z
    .string({ required_error: "Task Deadline must be a string" })
    .min(1, { message: "Task Deadline is required" })
    .refine(
      (value) => {
        const date = new Date(value);
        date.setHours(23, 59, 59, 59);
        return date >= new Date();
      },
      { message: "Task Deadline must be in the future" }
    ),
  TaskDescription: z
    .string({
      invalid_type_error: "Task Description must be a string",
    })
    .optional()
    .nullable(),
});

export const ZloginSchemaServer = z.object({
  email: z.string().email({ message: "Enter a valid email address!" }),
  password: z.string(),
});

export const ZsignupSchemaServer = z
  .object({
    userName: z.string().min(1, { message: "Username is required" }),
    email: z.string().email({ message: "Enter a valid email address!" }),
    password: z.string(),
    confirmPassword: z.string().optional(),
  })
  .refine((value) => value.confirmPassword === value.password, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });
// This type is created for image file type validation
export const TImage = ["image/jpeg", "image/png", "image/gif"];

export type TdatabaseTaskProps = {
  _id: ObjectId;
  name: string;
  deadline: Date;
  description: string;
  imageName: string;
  imageData: string;
  isPending: boolean;
  userID: string;
};
// Put "user" in Request so that "req.user" is possible.
declare global {
  namespace Express {
    interface Request {
      user?: { _id: string; email: string; userName: string };
    }
  }
}
