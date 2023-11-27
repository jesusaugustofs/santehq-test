import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { ZCreateUser } from "~/models/create-user.schema";
import { ZUpdateUser } from "~/models/update-user.schema";
import { UserService } from "../services/user.service";
import { ZSearchUser } from "~/models/search-user.schema";
import { ZDeleteUser } from "~/models/delete-user.schema";

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.input(ZSearchUser).query(({ ctx, input }) => {
    return UserService.getAllUsers({ ctx, input });
  }),
  create: publicProcedure
    .input(ZCreateUser)
    .mutation(async ({ ctx, input }) => {
      return UserService.createUser({ ctx, input });
    }),
  update: publicProcedure
    .input(ZUpdateUser)
    .mutation(async ({ ctx, input }) => {
      return UserService.updateUser({ ctx, input });
    }),
  delete: publicProcedure
    .input(ZDeleteUser)
    .mutation(async ({ ctx, input }) => {
      return UserService.deleteUser({ ctx, input });
    }),
});
