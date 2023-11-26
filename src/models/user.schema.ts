import { z } from "zod";

export const ZUser = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

export type User = z.infer<typeof ZUser>;
