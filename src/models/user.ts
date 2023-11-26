import { z } from "zod";

const ZUser = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

export type User = z.infer<typeof ZUser>;
