import { object, string, z } from "zod";

export const RegisterSchema = object({
  name: string().min(4, "Name must be at least 4 characters long"),
  email: string().email("Invalid email address"),
  password: string()
    .min(8, "Password must be at more than 8 characters")
    .max(32, "Password must be at less than 32 characters"),
  confirmPassword: string()
    .min(8, "Password must be at more than 8 characters & ")
    .max(32, "Password must be at less than 32 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const LoginSchema = object({
  email: string().email("Invalid email address"),
  password: string()
    .min(8, "Password must be at more than 8 characters")
    .max(32, "Password must be at less than 32 characters"),
});

export const QueueSchema = object({
  fullname: string().min(6, "Name must be at least 6 characters long"),
  nik: string().min(16, "NIK must be at least 16 characters long"),
  phonenumber: string().min(10, "Phone number must be at least 10 characters long"),
  address: string().min(4, "Address must be at least 4 characters long"),
  poli: string(),
});
