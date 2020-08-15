const jwt = require("jsonwebtoken");
exports.authMiddleWare = function (req, res, next) {
  let token;
  console.log(req.headers.authorization)
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[1]) {
    token = req.headers.authorization.split(' ')[1];
  } else {
    token = ""
  }
  jwt.verify(token, "password", (err) => {
    console.log("err", err)
    if (err) {
      res.sendStatus(401)
    }
    next();
  })
}