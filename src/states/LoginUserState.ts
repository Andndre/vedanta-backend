import { LoginUser } from "@/types";
import { Elysia } from "elysia";

export const loginUserState = new Elysia()
	.state('user', null as LoginUser)

export default loginUserState;
