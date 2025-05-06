import { z } from "zod";

export const formSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+1\d{10}$/, "Phone number must start with +1 and have 10 digits"),
  corporationNumber: z
    .string()
    .min(9, "Corporation number must be 9 characters")
    .max(9, "Corporation number must be 9 characters"),
});

export type FormSchema = typeof formSchema;
export type FormValues = z.infer<typeof formSchema>;
