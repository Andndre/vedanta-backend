import jwt from "@elysiajs/jwt";
import { t } from "elysia";

export default jwt({
	name: 'jwt',
	secret: Bun.env.JWT_SECRET || "secret",
	exp: "7d",
	schema: t.Object({
		email: t.String(),
		id: t.String()
	})
})
