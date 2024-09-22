import { z } from "zod";

export const SignupValidation = z.object({
  name: z.string().min(2, { message: "Too Short" }),
  username: z.string().min(2, { message: "Too Short" }),
  email: z.string().min(2),
  password: z
    .string()
    .min(8, { message: "Password Should be at least 8 Characters" }),
});

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password Should be at least 8 Characters" }),
});

export const PostValidation = z.object({
  caption : z.string().max(2200).min(5 , {message :"Caption must be at least 5 characters"}),
  file : z.custom<File[]>(),
  location : z.string().min(2 , {message :"Caption must be at least 2 characters"}).max(100),
  tags: z.string()
});
