import { z } from "zod";

export const ZloginSignupSchema = z.object({
  email: z.string().email("Enter a valid email address!"),
  password: z.string().min(8, "Password must be at least 8 characters!"),
  confirmPassword: z.string().optional(),
});

export const ZsignupSchema = ZloginSignupSchema.refine(
  (value) => value.confirmPassword === value.password,
  {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  }
);

export const ZnewTodoSchema = z.object({
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
  TaskDescription: z.string({
    invalid_type_error: "Task Description must be a string",
  }),
  TaskImage: z
    .union([z.instanceof(FileList), z.instanceof(File)])
    .refine(
      (value) => {
        if (value instanceof FileList) {
          const fileList = value;
          if (fileList.length === 0) return true;
          const file = fileList[0];
          return TImage.includes(file.type);
        } else if (value instanceof File) {
          const file = value;
          if (!file) return true;
          return TImage.includes(file.type);
        }
      },
      {
        message: "Must be an image (JPEG, PNG, GIF)",
      }
    )
    .refine(
      (value) => {
        if (value instanceof FileList) {
          const fileList = value;
          const file = fileList[0];
          if (fileList.length === 0) return true;
          return file.size < 2 * 1024 ** 2;
        } else if (value instanceof File) {
          const file = value;
          if (!file) return true;
          return file.size < 2 * 1024 ** 2;
        }
      },
      { message: "File size must be less than 2MB" }
    ),
});

export type TloginSignupSchema = z.infer<typeof ZloginSignupSchema>;

export type TnewTodoSchema = z.infer<typeof ZnewTodoSchema>;

export type TTaskImage = FileList | File | undefined;

export const TImage = ["image/jpeg", "image/png", "image/gif"];

// Types for  Pending Task Props
export const ZpendingTaskSchema = z.object({
  id: z.number().int(),
  isDone: z.boolean(),
  taskImage: z.string(),
  taskName: z.string().min(1, "Task name is required!"),
  taskDeadline: z.date(),
  taskDescription: z.string().min(1, "A task description must be entered!"),
});
export type TpendingTaskProps = z.infer<typeof ZpendingTaskSchema>;

// MAKE SCHEMA AND PROPERTIES CONSISTENT THROUGHOUT DIFFERENT PAGES?
