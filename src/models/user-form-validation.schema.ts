import { z } from "zod";
import isMobilePhone from "validator/lib/isMobilePhone";

export const ZUserFormValidation = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(3, { message: "Name must be at least 3 characters" }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .min(1, { message: "Email must be at least 1 character" })
    .email({
      message: "Must be a valid email",
    }),
  phoneNumber: z
    .string({
      required_error: "Phone number is required",
    })
    .min(8, { message: "Phone number must be at least 8 digits" })
    .refine(isMobilePhone, {
      message: "Phone number is not valid",
    }),
});

export type UserFormValidation = z.infer<typeof ZUserFormValidation>;
