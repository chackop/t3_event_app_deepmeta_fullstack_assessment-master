/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const countRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.eventItem.findMany({
      orderBy: [{ priority: "desc" }],
    });
  }),
  create: publicProcedure
    .input(z.object({ title: z.string().min(6) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.eventItem.create({
        data: {
          title: input.title,
          priority: 1,
        },
      });
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.eventItem.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
