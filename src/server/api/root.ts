import { activityRouter } from "@/server/api/routers/activity";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { volunteerRouter } from "./routers/volunteer";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  activity: activityRouter,
  volunteer: volunteerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.activity.all();
 *       ^? activity[]
 */
export const createCaller = createCallerFactory(appRouter);
