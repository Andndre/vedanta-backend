import jwt from "jsonwebtoken"

// accessTokens
export const generateAccessToken = (user: { id: number }) => {
	return jwt.sign(user, Bun.env.JWT_SECRET!, {expiresIn: 60 * 60 * 2 }) 
}
