import { Elysia, t } from "elysia";

import loginUserOnly from "@/guards/LoginUserOnly";
import SessionModel from "@/models/SessionModel";
import { GaneshChatSession } from "@/services/ChatService";

const chatRoute = new Elysia({ prefix: "/api/chat" })
  .use(loginUserOnly)
  .post(
    "/",
    async ({ body }) => {
      const response = await GaneshChatSession.singleChat(body.message);
      return response;
    },
    {
      body: t.Object({
        message: t.String(),
      }),
      response: t.Object({
        error: t.Boolean({ description: "true if error" }),
        text: t.String({ description: "response message" }),
      }),
      detail: {
        tags: ["Chat"],
        summary: "Quick Chat",
        description:
          "Dapatkan Jawaban Cepat dari Ganesh Bot tanpa membuat percakapan (Chat Session)",
      },
    }
  )
  .get(
    "/sessions",
    async ({ store }) => ({
      sessions: await SessionModel.listFromUser(store.user!.id),
    }),
    {
      response: t.Object({
        sessions: t.Array(
          t.Object({
            id: t.String(),
            title: t.String(),
          })
        ),
      }),
      detail: {
        tags: ["Chat"],
        summary: "Sessions",
        description: "Dapatkan semua session pada User",
      },
    }
  )
  .get(
    "/sessions/create",
    async ({ store }) => {
      const session = await GaneshChatSession.newSession(store.user!.id);
      return {
        sessionId: session.id,
      };
    },
    {
      response: t.Object({
        sessionId: t.String(),
      }),
      detail: {
        tags: ["Chat"],
        summary: "Create Chat Session",
        description: "Buat percakapan baru (dapatkan session id)",
      },
    }
  )
  .get("/session/:id", async ({ store, params, set }) => {
      const session = await SessionModel.findById(params.id);
      if (!session) {
        set.status = 404;
        return {
          error: true,
          response: "Session not found",
        };
      }
      if (session.userId !== store.user!.id) {
        set.status = 404;
        return {
          error: true,
          response: "Session not found",
        };
      }

      return {
        error: false,
        session,
      };
    },
    {
      response: {
        200: t.Object({
          error: t.Boolean(),
          session: t.Object({
            id: t.String(),
            userId: t.String(),
            title: t.String(),
            createdAt: t.Date(),
            history: t.Array(
              t.Object({
                id: t.Number(),
                role: t.String(),
                parts: t.String(),
                sessionId: t.String(),
              })
            ),
          }),
        }),
				404: t.Object({
					error: t.Boolean(),
					response: t.String(),
				})
      },
			detail: {
        tags: ["Chat"],
        summary: "Get Chat Session",
        description: "Dapatkan informasi tentang chat session dengan id tertentu",
      },
    }
  )
  .post(
    "/session/:id/chat",
    async ({ params, body, set }) => {
      const response = await GaneshChatSession.sendMessage(
        params.id,
        body.message
      );
      if (!response) {
        set.status = 500;
        return {
          error: true,
          response: "Something went wrong",
        };
      }
      return {
        error: false,
        response,
      };
    },
    {
      body: t.Object({
        message: t.String(),
      }),
      response: {
        200: t.Object({
          error: t.Boolean({ description: "false" }),
          response: t.String({ description: "response message" }),
        }),
        500: t.Object({
          error: t.Boolean({ description: "true" }),
          response: t.String(),
        }),
      },
      detail: {
        tags: ["Chat"],
        summary: "Send Message",
        description:
          "Kirim pesan ke session yang diberikan dan dapatkan respon dari lanjutan percakapan sebelumnya pada session tersebut",
      },
    }
  );

export default chatRoute;
