import { z } from "zod";
import { Collection, ObjectId } from "mongodb";

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
        console.log(value, typeof value);
        const date = new Date(value);
        console.log(date, date instanceof Date);
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
  confirmPassword: z.string().optional(),
});

export const ZsignupSchemaServer = ZloginSchemaServer.refine(
  (value) => value.confirmPassword === value.password,
  {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  }
);

export const TImage = ["image/jpeg", "image/png", "image/gif"];

export type TdatabaseTaskProps = {
  _id: string;
  name: string;
  deadline: Date;
  description: string;
  imageName: string;
  imageData: string;
  isPending: boolean;
  userID: string;
};

declare global {
  namespace Express {
    interface Request {
      user?: { _id: string; email: string };
    }
  }
}
