/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const countRouter = createTRPCRouter({
  getAll: publicProcedure.query(
    async ({ ctx }) =>
      await ctx.prisma.eventItem.findMany({
        orderBy: [{ priority: "desc" }],
      })
  ),
  getByID: publicProcedure.input(z.object({ id: z.string() })).query(
    async ({ ctx, input }) =>
      await ctx.prisma.eventItem.findUnique({
        where: { id: input.id },
      })
  ),
  getPriorityMaxCount: publicProcedure.query(
    async ({ ctx }) =>
      await ctx.prisma.eventItem.aggregate({
        _max: {
          priority: true,
        },
        _count: {
          priority: true,
        },
      })
  ),
  create: publicProcedure
    .input(z.object({ priority: z.number(), title: z.string().min(6) }))
    .mutation(
      async ({ ctx, input }) =>
        await ctx.prisma.eventItem.create({
          data: {
            title: input.title,
            priority: input.priority,
          },
        })
    ),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) =>
      ctx.prisma.eventItem.delete({
        where: {
          id: input.id,
        },
      })
    ),

  updateTitle: publicProcedure
    .input(z.object({ id: z.string(), title: z.string().min(6) }))
    .mutation(
      async ({ ctx, input }) =>
        await ctx.prisma.eventItem.update({
          data: {
            title: input.title,
          },
          where: {
            id: input.id,
          },
        })
    ),

  updatePriority: publicProcedure
    .input(z.object({ id: z.string(), priority: z.number() }))
    .mutation(
      async ({ ctx, input }) =>
        await ctx.prisma.eventItem.update({
          data: {
            priority: input.priority,
          },
          where: {
            id: input.id,
          },
        })
    ),
});
