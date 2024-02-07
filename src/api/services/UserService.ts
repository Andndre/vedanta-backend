import { insertRefreshToken } from "@models/UserModel"
import jwt from "jsonwebtoken"

// accessTokens
export const generateAccessToken = (user: { id: number }) => {
	return jwt.sign(user, Bun.env.JWT_SECRET!, {expiresIn: "15m"}) 
}

// refreshTokens
export const generateRefreshToken = async (user : { id: number }) => {
	const refreshToken = jwt.sign(user, Bun.env.JWT_SECRET!, { expiresIn: "20m" })
	await insertRefreshToken.execute({ token: refreshToken })
	return refreshToken
}
