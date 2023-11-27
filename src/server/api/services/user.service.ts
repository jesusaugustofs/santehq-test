import type { Prisma, PrismaClient } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";
import type { CreateUser } from "~/models/create-user.schema";
import type { DeleteUser } from "~/models/delete-user.schema";
import type { SearchUser } from "~/models/search-user.schema";
import type { UpdateUser } from "~/models/update-user.schema";
import { TRPCError } from "@trpc/server";

type Context = {
  db: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
};

type ServiceInputParams<T> = {
  ctx: Context;
  input: T;
};

const getAllUsers = async ({ ctx, input }: ServiceInputParams<SearchUser>) => {
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
};

const createUser = async ({ ctx, input }: ServiceInputParams<CreateUser>) => {
  const existing = await ctx.db.user.findUnique({
    where: {
      email: input.email,
    },
  });

  if (existing) {
    throw new TRPCError({
      code: "CONFLICT",
      message: "Email is already registered",
    });
  }

  return ctx.db.user.create({
    data: input,
  });
};

const updateUser = async ({ ctx, input }: ServiceInputParams<UpdateUser>) => {
  const user = await ctx.db.user.findUnique({
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

  if (user.email !== input.email) {
    const existing = await ctx.db.user.findUnique({
      where: {
        email: input.email,
      },
    });

    if (existing) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Email is already registered",
      });
    }
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
};

const deleteUser = async ({ ctx, input }: ServiceInputParams<DeleteUser>) => {
  const user = await ctx.db.user.findUnique({
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

  return ctx.db.user.delete({
    where: {
      id: input.id,
    },
  });
};

export const UserService = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
