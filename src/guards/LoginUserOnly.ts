import { Elysia } from "elysia";
import JwtConfig from "@/configs/JwtConfig";
import bearer from "@elysiajs/bearer";
import loginUserState from "@/states/LoginUserState";

const loginUserOnly = new Elysia()
	.use(loginUserState)
	.use(JwtConfig)
	.use(bearer())
	.onBeforeHandle(async ({ bearer, set, jwt, store }) => {
		if (!bearer) {
			set.status = "Unauthorized";
			return {
				error: true,
				message: "Unauthorized",
			};
		}
		const verify = await jwt.verify(bearer);
		if (!verify) {
			set.status = "Forbidden";
			return {
				error: true,
				message: "Forbidden",
			};
		}
		store.user = {
			email: verify.email,
			id: verify.id,
		};
	})

export default loginUserOnly;
