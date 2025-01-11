import { z } from "zod";
import { Collection } from "mongodb";

export const ZloginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  confirmPassword: z.string().optional(),
});

export const ZsignupSchema = z
  .object({
    email: z
      .string()
      .email("Enter a valid email address!")
      .refine((value) => value.endsWith("@gmail.com") || value.endsWith("@yahoo.com"), {
        message: "Email must be a gmail or yahoo account",
      }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters!")
      .refine((value) => /[A-Z]/.test(value), {
        message: "Password must contain at least one uppercase letter",
      })
      .refine((value) => /[0-9]/.test(value), {
        message: "Password must contain at least one number",
      }),
    confirmPassword: z.string().optional(),
  })
  .refine((value) => value.confirmPassword === value.password, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

if (typeof window !== "undefined") {
}

export const ZnewTaskSchemaClient = z.object({
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
  TaskDescription: z.string({
    invalid_type_error: "Task Description must be a string",
  }),
});

export type TloginSignupSchema = z.infer<typeof ZloginSchema>;

export type TnewTaskSchemaClient = z.infer<typeof ZnewTaskSchemaClient>;

export type TnewTaskSchemaServer = z.infer<typeof ZnewTaskSchemaServer>;

export type TTaskImage = FileList | File | undefined;

export const TImage = ["image/jpeg", "image/png", "image/gif"];

export type collections = {
  TaskCollection: Collection;
  UserCollection: Collection;
};

// Types for  Pending Task Props
export const ZTaskSchema = z.object({
  _id: z.string(),
  TaskName: z.string(),
  TaskDeadline: z.date(),
  TaskDescription: z.string(),
  ImageName: z.string(),
  ImageData: z.string(),
  isPending: z.boolean(),
});

export type TtaskProps = z.infer<typeof ZTaskSchema>;

export type TmodifiedPendingTaskProps = TtaskProps & {
  onEdit?: (
    _id: string,
    newTaskName: string,
    newTaskDeadline: Date,
    newTaskDescription: string
  ) => void;
  onDone?: (_id: string) => void;
  onDelete?: (_id: string) => void;
};

export type TmodifiedFinishedTaskProps = TtaskProps & {
  onPending?: (_id: string) => void;
  onDelete?: (_id: string) => void;
};

// MAKE SCHEMA AND PROPERTIES CONSISTENT THROUGHOUT DIFFERENT PAGES?
