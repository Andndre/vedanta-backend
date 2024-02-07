import jwt from "jsonwebtoken"

export type UserTokenPayload = {
	id: number;
	email: string;
	name: string;
}

// accessTokens
export const generateAccessToken = (user: UserTokenPayload) => {
	return jwt.sign(user, Bun.env.JWT_SECRET!, {expiresIn: 60 * 60 * 2 }) 
}
