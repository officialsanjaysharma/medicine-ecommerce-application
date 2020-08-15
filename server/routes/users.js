/**
 * @file CRUD methods for users.
 * @this UserRoute
 * 
 * @author Sanjay Sharma
 */
const express = require('express');
const router = express.Router();

const userController = require('../controller/user');
const jwt = require("jsonwebtoken");

/* GET users listing. */
router.post('/', userController.findOne);
router.post('/create', userController.createUser);
router.get("/protected", function (req, res) {
  console.log("author", req.headers.authorization)
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, "password", (err, data) => {
    console.log(err, data)
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        data: data
      })
    }
  })
})
module.exports = router;
