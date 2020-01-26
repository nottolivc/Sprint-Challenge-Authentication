const request = require('supertest');
const server = require('../api/server');

describe("jokes-router.js", () => {
  describe("POST /jokes", () => {
    test("did it return 404 status?", async () => {
      await request(server)
      .post("/jokes")
      .then(res => {
        expect(res.status).toBe(404)
      })
    })
  })
});
