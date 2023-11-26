import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { ZCreateUser } from "~/models/create-user.schema";
import { ZUpdateUser } from "~/models/update-user.schema";
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
  update: publicProcedure
    .input(ZUpdateUser)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findFirst({
        where: {
          id: input.id,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      const { name, email, phoneNumber } = input;

      return ctx.db.user.update({
        where: {
          id: input.id,
        },
        data: {
          name,
          email,
          phoneNumber,
        },
      });
    }),
});
