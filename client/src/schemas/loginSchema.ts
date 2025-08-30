import z from "zod"

export const loginSchema = z.object({
    email: z.email({ error: "Email address is not valid" }),
    password: z.string().min(6, "password should be minimum of 6 length")
})