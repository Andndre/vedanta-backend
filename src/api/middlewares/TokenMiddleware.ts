import type { Handler } from "express";
import jwt from "jsonwebtoken";

const handler: Handler = (req, res, next) => {
	// get Bearer token from header
	const token = req.headers.authorization?.split(" ")[1];
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

		req.user = user as { id: number };
		next()
	});
};

export default handler;
