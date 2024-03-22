import {z} from "zod";

// for signup
export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(3),
    name: z.string().optional()
})


// for signin
export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(3)
})


//for create blog
export const createBlog = z.object({
    title: z.string(),
    content: z.string()
})


//for update blog
export const updateBlog = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string()
})



export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>
export type CreateBlog = z.infer<typeof createBlog>
export type UpdateBlog = z.infer<typeof updateBlog>