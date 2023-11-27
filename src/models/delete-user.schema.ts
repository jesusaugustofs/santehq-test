import { type z } from "zod";
import { ZUser } from "./user.schema";

export const ZDeleteUser = ZUser.pick({
  id: true,
});

export type DeleteUser = z.infer<typeof ZDeleteUser>;
