const request = require('supertest')
const server = require('../api/server')
const db = require('../database/dbConfig')



describe("GET /login", () => {
    test("did it return GET err?", () => {
      return request(server)
      .get("/login")
      .then(res => {
        expect(res.status).toBe(404)
      })
    })
  });

  describe("POST /register", () => {
    test("did it return 200?", async () => {
      await request(server)
        .post("/register")
        .then(res => {
          expect(res.status).toBe(200)
      })
    })
})
