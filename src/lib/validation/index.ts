import { z } from "zod";


export const SignupValidation = z.object({
    name : z.string().min(2, {message : 'Too Short'}),
    username: z.string().min(2,{message:'Too Short'}),
    email : z.string().min(2),
    password : z.string().min(8, {message : 'Password Should be at least 8 Characters'}),
  });