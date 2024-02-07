import type { Handler } from "express"

export const index: Handler = (_req, res) => {
	// redirect to /api-docs
	res.redirect("/api-docs")
}
