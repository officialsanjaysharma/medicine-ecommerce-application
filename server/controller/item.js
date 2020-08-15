
/**
 * @file Creates a ItemContoller for item methods.
 * @this ItemController
 * 
 * @author Sanjay Sharma
 */
const { item } = require("../db/connect.js");
const jwt = require("jsonwebtoken");

exports.findAll = function (req, res) {
  item.findAll()
    .then(data => {
      res.send(data);
    })
}