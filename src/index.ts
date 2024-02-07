import express from "express";
import { PrintResponseTimeMiddleware } from "@middlewares";
import ApiRoutes from "@routes";
import cors from "./config/corsConfig";

// Express
const app = express();

// Is on development mode
const isDev = Bun.env.NODE_ENV === "development";

// Middlewares
{
	app.use(cors);
	if (isDev) app.use(PrintResponseTimeMiddleware);
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	console.log("✅ Middlewares are loaded");
}

// Routes
{
	app.use("/api", ApiRoutes);
	console.log("✅ Routes are loaded");
}

app.listen(3000, "localhost", async () => {
  console.log("Server is running on http://localhost:3000");

  if (isDev) console.log(`\n\nMETHOD\tSTATUS\tURL`);
});

export default app;
