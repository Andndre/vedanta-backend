import { UserModel } from "@models";
import { UserService } from "@services";
import type { UserTokenPayload } from "@services/UserService";
import type { Handler } from "express";

interface RegisterParams {
	email: string;
	name: string;
	password: string;
}

export const register: Handler = async (req, res) => {
	const body = req.body as RegisterParams;
		try {
			// check if user already exists
			const user = await UserModel.selectUserByEmail(body.email)
			if (user) {
				res.status(400).json({
					message: "User already exists",
					error: true,
				});
				return;
			}
			// insert user
			await UserModel.insertUserThrows({
				email: body.email,
				name: body.name,
				password: await Bun.password.hash(body.password),
			})
			// success
			res.json({
				message: "User registered successfully",
				error: false,
			});
		} catch (e: any) {
			res.status(500).json({
				message: "Something went wrong",
				error: true,
			});
			return;
		}
}

type LoginParams = {
	email: string;
	password: string;
}

export const login: Handler = async (req, res) => {
	const body = req.body as LoginParams;
	const user = await UserModel.selectUserByEmail(body.email);
	if (!user) {
		res.status(400).json({
			message: "User not found",
			error: true,
		});
		return;
	}
	const valid = await Bun.password.verify(body.password, user.password);
	if (!valid) {
		res.status(400).json({
			message: "Incorrect password",
			error: true,
		});
		return;
	}
	// genrate access token
	const payload: UserTokenPayload = {
		id: user.id,
		email: user.email,
		name: user.name,
	};
	const token = UserService.generateAccessToken(payload);
	res.json({
		loginResult: {
			userId: user.id,
			name: user.name,
			token
		},
		message: "Success",
		error: false,
	});
}
