const request = require('supertest')
const server = require('../api/server')
const db = require('../database/dbConfig')
const Users = require('../users/users-model.js')


describe("auth-router.js", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("POST /login", () => {
    test("did it return 404 err?", () => {
      return request(server)
      .post("/login")
      .then(res => {
        expect(res.status).toBe(404)
      })
    })
  })

  describe("POST /register", () => {
    test("did it return 404 err?", async () => {
      await request(server)
        .post("/register")
        .then(res => {
          expect(res.status).toBe(404)
      })
    })
})
})