import {
  createTRPCRouter,
  protectedProcedure,
  VerifyRoles,
} from "@/server/api/trpc";
import { ActivityCreateInputSchema, ActivityUpdateArgsSchema } from "pg/generated/zod";

export const activityRouter = createTRPCRouter({

  create: protectedProcedure
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

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const activity = await ctx.db.activity.findMany({
      orderBy: { createdAt: "desc" },
    });

    return activity ?? null;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
