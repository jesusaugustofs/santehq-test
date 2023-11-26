import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ search: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.user.findMany({
        where: {
          OR: [
            {
              name: {
                contains: input.search,
              },
            },
            {
              email: {
                contains: input.search,
              },
            },
          ],
        },
      });
    }),
});
