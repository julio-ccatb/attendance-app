import {
  createTRPCRouter,
  protectedProcedure,
  VerifyRoles,
} from "@/server/api/trpc";
import {
  VolunteerCreateInputSchema,
  VolunteerUpdateArgsSchema,
} from "pg/generated/zod";
import { z } from "zod";

export const volunteerRouter = createTRPCRouter({
  create: protectedProcedure
    .use(VerifyRoles(["ADMIN", "OPERATOR"]))
    .input(VolunteerCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.volunteer.create({ data: input });
    }),
  update: protectedProcedure
    .use(VerifyRoles(["ADMIN", "OPERATOR"]))
    .input(VolunteerUpdateArgsSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.volunteer.update({ ...input });
    }),

  getLatest: protectedProcedure
    .use(VerifyRoles(["ADMIN", "OPERATOR", "READER"]))
    .query(async ({ ctx }) => {
      const activity = await ctx.db.volunteer.findMany({
        orderBy: { createdAt: "desc" },
      });

      return activity ?? null;
    }),
  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .use(VerifyRoles(["ADMIN", "OPERATOR", "READER"]))
    .query(async ({ ctx, input }) => {
      return await ctx.db.volunteer.findUnique({
        where: { id: input.id },
        include: { attendances: { include: { user: true, activity: true } } },
      });
    }),
  getAll: protectedProcedure
    .use(VerifyRoles(["ADMIN", "OPERATOR", "READER"]))
    .query(async ({ ctx }) => {
      return await ctx.db.volunteer.findMany();
    }),
  delete: protectedProcedure
    .use(VerifyRoles(["ADMIN"]))
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.volunteer.delete({ where: { id: input.id } });
    }),
});
