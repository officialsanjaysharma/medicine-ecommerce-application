/**
 * @file Creates a connection to redis.
 * @this RedisClient
 * @exports client
 * 
 * @author Sanjay Sharma
 */
const redis = require("redis");
const client = redis.createClient();
client.on("connect", function () {
  console.log("connected")
})
client.on("error", function (error) {
  console.error(error);
});
module.exports = client;



