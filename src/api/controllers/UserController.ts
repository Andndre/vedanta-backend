import { UserModel } from "@models";
import { UserService } from "@services";
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
				data: {
					email: body.email,
					name: body.name,
				},
			});
		} catch (e: any) {
			console.log(e);
			res.status(500).json({
				message: "Something went wrong",
				error: e.message,
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
			message: "Bad Request",
			error: "User not found",
		});
		return;
	}
	const valid = await Bun.password.verify(body.password, user.password);
	if (!valid) {
		res.status(400).json({
			message: "Bad Request",
			error: "Incorrect password",
		});
		return;
	}
	// genrate access token
	const payload = {
		id: user.id,
		email: user.email,
		name: user.name,
	};
	const token = UserService.generateAccessToken(payload);
	res.json({
		data: payload,
		token,
	});
}
