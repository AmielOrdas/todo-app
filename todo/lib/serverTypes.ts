import { z } from "zod";
import { Collection } from "mongodb";

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

export const TImage = ["image/jpeg", "image/png", "image/gif"];
