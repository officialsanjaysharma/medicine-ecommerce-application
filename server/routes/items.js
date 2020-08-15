/**
 * @file CRUD methods for items.
 * @this ItemRoute
 * 
 * @author Sanjay Sharma
 */
const express = require('express');
const router = express.Router();
const client = require("../db/redis");
const itemController = require('../controller/item');
const { authMiddleWare } = require("../middleware/auth");
/* GET home page. */
router.get('/', authMiddleWare, itemController.findAll);
router.post('/', authMiddleWare, ((req, res, next) => {
  data = req.body.data;
  id = req.body.id
  client.get(id, ((err, value) => {
    if (err) res.sendStatus(500)
    else {
      if (value) {
        var tempValue = JSON.parse(value);

        tempValue.push(data);
        client.set(id, JSON.stringify(tempValue), ((err, value) => {
          if (err) res.send({ status: "unsuccessful" })
          else res.send({ status: "success" });
        })
        )
      } else {
        client.set(id, JSON.stringify([data]), ((err, value) => {
          if (err) res.send({ status: "unsuccessful" })
          else res.send({ status: "success" });
        }));
      }
    }
  })
  )
})
)

module.exports = router;
