import { describe, it, expect, beforeAll } from 'bun:test';

describe("home api route", () => {
  let response: Response;
  beforeAll(async () => {
    response = await fetch("http://localhost:3000/api")
  });
});
