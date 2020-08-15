/**
 * @file CRUD methods for cart.
 * @this CartRoute
 * 
 * @author Sanjay Sharma
 */
const express = require('express');
const router = express.Router();
const { authMiddleWare } = require("../middleware/auth");

const client = require("../db/redis");
router.get("/", authMiddleWare, (req, res) => {
  const id = req.query.id
  let data
  client.get(id, (error, value) => {
    if (error) {
      data = error
      res.sendStatus(500);
    } else {
      data = JSON.parse(value);
      res.send(data);
    }
  });
})

router.post("/", authMiddleWare, (req, res) => {
  const id = req.body.id;
  data = client.get(id);
  client.get(id, (error, value) => {
    if (error) {
      client.set(id, JSON.stringify([req.body.data]))
      res.send("success");
    } else {
      JSON.parse(value).data.push(req.body.data)
    }
  })
  res.send("success");
})

router.delete("/delete", authMiddleWare, ((req, res) => {
  const id = req.body.id;
  const index = req.body.index;
  client.get(id, ((err, value) => {
    if (err) res.sendStatus(500);
    else {
      const temp = JSON.parse(value);
      temp.splice(index, 1);
      client.set(id, JSON.stringify(temp), (err, value) => {
        if (err) {
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      })
    }
  }))
}))

router.delete("/empty", authMiddleWare, ((req, res) => {
  const id = req.body.id
  client.DEL(id, (err, value) => {
    if (err) res.sendStatus(500);
    res.sendStatus(200);
  })
}))

router.put("/quantity", authMiddleWare, ((req, res) => {
  const quantity = req.body.quantity;
  const id = req.body.id;
  const index = req.body.index;
  client.get(id, ((err, value) => {
    if (err) res.sendStatus(500)
    else {
      const temp = JSON.parse(value);
      temp[index].quantity = quantity;
      client.set(id, JSON.stringify(temp), ((err, value) => {
        if (err) res.sendStatus(500)
        else res.sendStatus(200)
      }))
    }
  }))

}))

module.exports = router;