/**
 * @file Creates a connection to redis.
 * @this RedisClient
 * @exports client
 * 
 * @author Sanjay Sharma
 */
const redis = require("redis");
const client = redis.createClient(6379, "127.0.0.1");
client.on("connect", function () {
  console.log("connected")
})
client.on("error", function (error) {
  console.error(error);
});
module.exports = client;



