import type { UserTokenPayload } from "@services/UserService";
import type { Handler } from "express";
import jwt from "jsonwebtoken";

const handler: Handler = (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(401).json({
			message: "Unauthorized",
			error: "No token provided",
		});
	}
	// get Bearer token from header
	const [tokenType, token] = req.headers.authorization!.split(" ")!;
	if (tokenType !== 'Bearer') {
		return res.status(401).json({
			message: "Unauthorized",
			error: "Invalid authorization type"
		})
	}
	if (!token) {
		return res.status(401).json({
			message: "Unauthorized",
			error: "No token provided",
		});
	}
	// verify token
	jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
		if (err) { 
		 	res.status(403).json({
				message: "Forbidden",
				error: "Token invalid"
			})
			return;
		}
		req.user = user as UserTokenPayload;
		next()
	});
};

export default handler;
