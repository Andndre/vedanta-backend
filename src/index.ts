import SwaggerConfig from "@/configs/SwaggerConfig";
import chatRoute from "@/routes/ChatRoute";
import gitaRoute from "@/routes/GitaRoute";
import userRoute from "@/routes/UserRoute";

import { AudioAssetDownloader } from "@/models/SlokaModel";
import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import { PrismaClient } from "@prisma/client";
import { Elysia } from "elysia";
import { rateLimit } from 'elysia-rate-limit';
import { readdir } from "node:fs/promises";

export const prismaClient = new PrismaClient();

// ---------------------------------------------
// Downloading audio files
// ---------------------------------------------
{
  const AUDIO_FILES_COUNT = 640;
  const filesCount = (await readdir("./public/audio")).length;
  if (
    AUDIO_FILES_COUNT !== filesCount
  ) {
    console.log("[!] Downloading audio files...");
    await AudioAssetDownloader.downloadAllPelafalan();
    if (AUDIO_FILES_COUNT === (await readdir("./public/audio")).length) {
      console.log('[✅] All audio has been downloaded..')
    } else {
      console.log('[❌] Failed to download some audios.. Please restart the server to retry')
    }
  } else {
    console.log('[✅] All audio has been downloaded..')
  }
}

const PORT = Bun.env.PORT || 3000;

const app = new Elysia()
  .use(cors())
  .use(staticPlugin())
  .use(SwaggerConfig)
  .use(rateLimit({
    max: 300
  }))
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
