import {
  createTRPCRouter,
  protectedProcedure,
  VerifyRoles,
} from "@/server/api/trpc";
import {
  ActivityCreateInputSchema,
  ActivityUpdateArgsSchema,
} from "pg/generated/zod";
import { z } from "zod";

export const activityRouter = createTRPCRouter({
  create: protectedProcedure
    .use(VerifyRoles(["ADMIN"]))
    .input(ActivityCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.activity.create({ data: input });
    }),
  update: protectedProcedure
    .use(VerifyRoles(["ADMIN"]))
    .input(ActivityUpdateArgsSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.activity.update({ ...input });
    }),

  getLatest: protectedProcedure
    .use(VerifyRoles(["ADMIN", "OPERATOR", "READER"]))
    .query(async ({ ctx }) => {
      const activity = await ctx.db.activity.findMany({
        orderBy: { createdAt: "desc" },
      });

      return activity ?? null;
    }),
  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .use(VerifyRoles(["ADMIN", "OPERATOR", "READER"]))
    .query(async ({ ctx, input }) => {
      return await ctx.db.activity.findUnique({
        where: { id: input.id },
        include: { attendances: { include: { user: true } } },
      });
    }),
  getAll: protectedProcedure
    .use(VerifyRoles(["ADMIN", "OPERATOR", "READER"]))
    .query(async ({ ctx }) => {
      return await ctx.db.activity.findMany();
    }),
  delete: protectedProcedure
    .use(VerifyRoles(["ADMIN"]))
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.activity.delete({ where: { id: input.id } });
    }),
});
