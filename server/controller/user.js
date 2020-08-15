
/**
 * @file Creates  UserController for all the user routes.
 * @this UserController
 * 
 * @author Sanjay Sharma
 */

const { user } = require('../db/connect');
const jwt = require("jsonwebtoken");

// To find a user in database
exports.findOne = function (req, res) {
  let USERNAME = req.body.username;
  let PASSWORD = req.body.password;

  try {
    user.findOne({ where: { USERNAME, PASSWORD } })
      .then(data => {
        console.log("-->", data);
        if (data) {
          let token = jwt.sign({ status: "verified", email: USERNAME }, "password");
          res.cookie('jwt', token, { maxAge: 3600000 })
          res.send({ user: "authorised" });
        } else {
          res.send({ user: "unauthorised" });
        }
      }).catch(e => res.send({ user: "unauthorised" }));
  } catch (e) {
    res.send({ user: "unauthorised" });
  }
}

// To create the user in postgre
exports.createUser = function (req, res) {
  let USERNAME = req.body.username;
  let PASSWORD = req.body.password;
  const userData = {
    USERNAME: USERNAME,
    PASSWORD: PASSWORD
  }
  user.create(userData)
    .then(data => {
      if (data) {
        let token = jwt.sign({ status: "verified", email: USERNAME }, "password");
        res.cookie('jwt', token, { httpOnly: true, secure: true, maxAge: 3600000 });
        res.redirect('http://localhost:3001/');
      } else {
        res.send({ user: "invalid" })
      }
    });
}