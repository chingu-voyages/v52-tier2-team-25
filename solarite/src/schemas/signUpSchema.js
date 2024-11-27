import {z } from "zod";
import validator from 'validator';


export const signUpSchema = z.object({
    email: z.string().email("Invalid email address"),
    emailConfirm: z.string().email("Invalid email address"),
    name: z.string(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    passwordConfirm: z.string(),
    phone: z.string().refine(validator.isMobilePhone, "Invalid phone number"),
    address: z.string(),
    profileName: z.string()
})