const express = require("express")
const Users = require("./users-model")
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const users = await Users.find()
   
    res.json(users)
  } catch (err) {
    next(err)
  }
});


router.post('/', async (req, res, next) => {
  try {
    const [id] = await db('users').insert(req.body)
    const newUser = await db('users').where('id', id).first()
    return res.status(201).json(newUser)
  } catch (err) {
    next(err)
  }
});



module.exports = router;