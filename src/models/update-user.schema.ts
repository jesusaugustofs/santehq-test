import { type z } from "zod";
import { ZUser } from "./user.schema";

export const ZUpdateUser = ZUser.pick({
  id: true,
  name: true,
  email: true,
  phoneNumber: true,
});

export type UpdateUser = z.infer<typeof ZUpdateUser>;
