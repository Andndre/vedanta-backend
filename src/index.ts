import { PrismaClient } from "@prisma/client";
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

import SwaggerConfig from "@/configs/SwaggerConfig";
import gitaRoute from "@/routes/GitaRoute";
import chatRoute from "@/routes/ChatRoute";
import userRoute from "@/routes/UserRoute";

export const prismaClient = new PrismaClient();

const PORT = Bun.env.PORT || 3000;

const app = new Elysia()
  .use(cors())
  .use(SwaggerConfig)
  .use(userRoute)
  .use(gitaRoute)
  .use(chatRoute)
  .get("/", ({ set }) => {
    set.redirect = "/docs";
  })
  .get("/api", ({ set }) => {
    set.redirect = "/docs";
  })
  .listen(PORT);

console.log(`⚡ App is running at ${app.server?.url}`);
