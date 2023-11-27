import { z } from "zod";

export const ZSearchUser = z.object({
  search: z.string(),
});

export type SearchUser = z.infer<typeof ZSearchUser>;
