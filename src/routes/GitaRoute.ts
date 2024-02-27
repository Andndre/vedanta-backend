import { Elysia, t } from "elysia";

import LoginUserOnly from "@/guards/LoginUserOnly";
import BabModel from "@/models/BabModel";
import SlokaModel from "@/models/SlokaModel";
import ChatService from "@/services/ChatService";

const gitaRoute = new Elysia({ prefix: "/api/gita" })
  .use(LoginUserOnly)
  .get(
    "/",
    async () => {
      const allBab = await BabModel.allBab();
      return { babs: allBab };
    },
    {
      response: t.Object({
        babs: t.Array(
          t.Object({
            number: t.Number(),
            title: t.String(),
            titleHindi: t.String(),
            summary: t.String(),
            translationIndo: t.String(),
          })
        ),
      }),
      detail: {
        tags: ["Gita"],
        summary: "Find All",
        description: "Dapatkan semua bab dalam bhagavad gita",
      },
    }
  )
  .group("/bab/:bab_number", (app) => {
    return app
      .get(
        "/",
        async ({ params, set }) => {
          const bab = await BabModel.one(+params.bab_number);
          if (!bab) {
            set.status = 404;
            return null;
          }
          return bab;
        },
        {
          response: {
            200: t.Object({
              number: t.Number(),
              title: t.String(),
              titleHindi: t.String(),
              summary: t.String(),
              translationIndo: t.String(),
            }),
            404: t.Null(),
          },
          detail: {
            tags: ["Gita"],
            summary: "Find One",
            description: "Dapatkan satu bab dari number bab yang diberikan",
          },
        }
      )
      .group("/slokas", (app) => {
        return app
          .get(
            "/",
            async ({ params }) => {
              return { slokas: await SlokaModel.allInBab(+params.bab_number) };
            },
            {
              response: t.Object({
                slokas: t.Array(
                  t.Object({
                    number: t.Number(),
                    id: t.Number(),
                    translationIndo: t.String(),
                    content: t.String(),
                  })
                ),
              }),
              detail: {
                tags: ["Gita"],
                summary: "All Sloka in BAB",
              },
            }
          )
          .get(
            "/:sloka_number",
            async ({ params, set }) => {
              const sloka = await SlokaModel.one(
                +params.bab_number,
                +params.sloka_number
              );
              if (!sloka) {
                set.status = 404;
                return null;
              }
              return sloka;
            },
            {
              response: {
                200: t.Object({
                  id: t.Number(),
                  number: t.Number(),
                  numberBab: t.Number(),
                  content: t.String(),
                  translationIndo: t.String(),
                  makna: t.Nullable(t.String()),
                }),
                404: t.Null(),
              },
              detail: {
                tags: ["Gita"],
                summary: "One Sloka",
              },
            }
          )
          .get(
            "/:sloka_number/makna",
            async ({ params, set }) => {
              const sloka = await SlokaModel.one(
                +params.bab_number,
                +params.sloka_number
              );
              if (!sloka) {
                set.status = 404;
                return {
                  message: "Sloka not found",
                  error: true,
                };
              }
              let makna = sloka.makna;
              if (!makna) {
                const { text, error } = await ChatService.singleChat(
                  `Dalam Bab ${sloka.numberBab} Sloka ${sloka.number} Bhagavad Gita, disebutkan: "${sloka.content}" jika diterjemahan: "${sloka.translationIndo}". Apa makna dari isi sloka tersebut?`
                );
                if (error) {
                  set.status = 500;
                  return {
                    message: text,
                    error: true,
                  };
                }
                makna = text;
                await SlokaModel.saveMakna(
                  +params.bab_number,
                  +params.sloka_number,
                  text
                );
              }
              return {
                makna,
                error: false,
              };
            },
            {
              response: {
                200: t.Object({
                  makna: t.String(),
                  error: t.Boolean(),
                }),
                500: t.Object({
                  message: t.String(),
                  error: t.Boolean(),
                }),
                404: t.Object({
                  message: t.String(),
                  error: t.Boolean(),
                }),
              },
              detail: {
                tags: ["Gita"],
                summary: "Sloka Meaning",
                description: "Dapatkan makna dari satu sloka yang diberikan",
              },
            }
          );
      });
  });

export default gitaRoute;
