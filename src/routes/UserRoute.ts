import { Elysia, t } from "elysia";

import JwtConfig from "@/configs/JwtConfig";
import UserModel from "@/models/UserModel";

const userRoute = new Elysia({ prefix: "/api/user" })
  .use(JwtConfig)
  .post(
    "/register",
    async ({ body, set }) => {
      if (await UserModel.isExists(body.email)) {
        set.status = 409;
        return {
          message: "User already exists",
          error: true,
        };
      }
      const user = await UserModel.create(body.email, body.password, body.name);
      set.status = 201;
      return {
        message: "Successfully created user",
        error: false,
        user,
      };
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String(),
        password: t.String(),
      }),
      response: {
        201: t.Object({
          message: t.String(),
          user: t.Object({
            id: t.String(),
            email: t.String(),
            name: t.String(),
          }),
          error: t.Boolean(),
        }),
        409: t.Object({
          message: t.String(),
          error: t.Boolean(),
        }),
      },
      detail: {
        tags: ["User"],
        summary: "Register",
        description: "Membuat akun baru"
      },
    }
  )
  .post(
    "/login",
    async ({ jwt, body, set }) => {
      const user = await UserModel.findOne(body.email);
      if (!user) {
        set.status = 400;
        return {
          error: true,
          message: "Invalid Credentials",
        };
      }
      if (!(await Bun.password.verify(body.password, user.password))) {
        set.status = 400;
        return {
          error: true,
          message: "Invalid Credentials",
        };
      }
      const token = await jwt.sign({
        id: user.id,
        email: user.email,
      });
      return {
        error: false,
        token,
      };
    },
    {
      body: t.Object({
        email: t.String({ examples: "example@email.com" }),
        password: t.String(),
      }),
      response: {
        200: t.Object({
          error: t.Boolean(),
          token: t.String(),
        }),
        400: t.Object({
          error: t.Boolean(),
          message: t.String(),
        }),
      },
      detail: {
        tags: ["User"],
        summary: "Login",
        description: "Login dengan akun yang sudah ada (untuk mendapatkan access token)"
      },
    }
  );

export default userRoute;
