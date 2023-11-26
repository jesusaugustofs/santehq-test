import { type z } from "zod";
import { ZUser } from "./user.schema";

export const ZCreateUser = ZUser.pick({
  name: true,
  email: true,
  phoneNumber: true,
});

export type CreateUser = z.infer<typeof ZCreateUser>;
