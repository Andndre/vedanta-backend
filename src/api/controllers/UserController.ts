import { db } from "@database";
import { UserModel } from "@models";
import { selectRefreshToken } from "@models/UserModel";
import { UserService } from "@services";
import type { Handler } from "express";
import { v4 } from "uuid";

interface RegisterParams {
	email: string;
	name: string;
	password: string;
}

export const register: Handler = async (req, res) => {
	const body = req.body as RegisterParams;
	await db.transaction(async (tx) => {
		try {
			const queryResult = await UserModel.insertUserThrows({
				email: body.email,
				name: body.name,
				password: await Bun.password.hash(body.password),
			})
			res.status(201).json(queryResult);
		} catch (e: any) {
			tx.rollback();
			res.status(500).json({
				message: "Something went wrong",
				error: e.message,
			});
		}
	})
}

export const login: Handler = async (_req, res) => {
	
}

export const refreshToken: Handler = async (req, res) => {
	if (!req.body.token) {
		res.status(400).json({
			message: "Bad Request",
			error: "No token provided",
		})
	}
	let [{ token }] = await selectRefreshToken.execute({
		token: req.body.token,
	});
	if (!token) {
		res.status(400).json({
			message: "Bad Request",
			error: "No token provided",
		})
	}
	//remove the old refreshToken from the refreshTokens list
	const accessToken = UserService.generateAccessToken ({id: req.body.id})
	const refreshToken = UserService.generateRefreshToken ({id: req.body.name})
	//generate new accessToken and refreshTokens
	res.json ({accessToken: accessToken, refreshToken: refreshToken})
}
