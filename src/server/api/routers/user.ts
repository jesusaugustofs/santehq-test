import { z } from "zod";
import { ZCreateUser } from "~/models/create-user.schema";
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
  create: publicProcedure
    .input(ZCreateUser)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.create({
        data: input,
      });

      return user;
    }),
});
