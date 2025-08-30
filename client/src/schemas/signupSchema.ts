import z from "zod"

export const usernameValidation = z
    .string()
    .min(6, "minimum length should be 6")
    .max(20, "max length should be 20")
    .regex(/^[a-zA-Z0-9_]+$/, "Username shall not contain any special characters")

export const signUpSchema = z.object({
    display_name: z.string(),
    username: usernameValidation,
    email: z.email({ error: "Email address is not valid" }),
    password: z.string().min(6, "password should be minimum of 6 length")
})