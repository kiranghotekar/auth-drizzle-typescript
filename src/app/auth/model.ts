import { z } from 'zod'

export const signupPayloadModel = z.object({
    name: z.string().min(2),
    age: z.coerce.number().int().positive(),
    email: z.email(),
    password: z.string().min(8)
})

export const signInPayloadModel = z.object({
    email: z.email(),
    password: z.string().min(8)
})