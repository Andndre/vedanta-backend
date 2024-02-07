import { describe, it, expect, beforeAll } from 'bun:test';

describe("home api route", () => {
	let response: Response;
	beforeAll(async () => {
		response = await fetch("http://localhost:3000/api")
	});
	it("should return hello world", async () => {
		expect(await response.text()).toBe("Hello World!")
	})
	it("should return with status 200", () => {
		expect(response.status).toBe(200)
	})
})
