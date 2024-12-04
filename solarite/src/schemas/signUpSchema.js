import {z } from "zod";


export const signUpSchema = z.object({
    email: z.string().email("Invalid email address"),
    emailConfirm: z.string().email("Invalid email address"),
    name: z.string().min(2, "Name must be at least 2 characters long"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    passwordConfirm: z.string(),
    phone: z.string(),
    address: z.string(),
    profileName: z.string()
}).refine((data) => data.email === data.emailConfirm, {
    message: "Emails do not match",
    path: ["emailConfirm"],
  }).refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  })