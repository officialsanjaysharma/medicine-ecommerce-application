/**
 * @file Insert the data to database on start.
 * @this DatabaseSeed
 * 
 * @author Sanjay Sharma
 */

const { endpoint } = require("../config/config.js");
const fetch = require('node-fetch');
const { item, user } = require("../db/connect.js");


module.exports = async function storeData() {
  const data = await seedData();
  await user.create({ USERNAME: "netmeds", PASSWORD: "test" });

  data.map(i => {
    item.create({
      "S.no": i["S.no"],
      "Included Tests": i["Included Tests"],
      "Best-sellers": i["Best-sellers"],
      "itemName": i.itemName,
      "type": i.type,
      "Keyword": i.Keyword,
      "testCount": i.testCount,
      "itemId": i.itemId,
      "url": i.url,
      "minPrice": i.minPrice,
      "labName": i.labName,
      "fasting": i.fasting,
      "availableAt": i.availableAt,
      "popular": i.popular,
      "category": i.category,
      "objectID": i.objectID,
      ["_highlightResult-itemName"]: JSON.stringify(i["_highlightResult"].itemName),
      ["_highlightResult-Keyword"]: JSON.stringify(i["_highlightResult"].Keyword),
      ["_highlightResult-category"]: JSON.stringify(i["_highlightResult"].category),
      ["_highlightResult-Included Tests"]: JSON.stringify(i["_highlightResult"]["Included Tests"])
    })
  })
}


function seedData() {
  return new Promise((resolve, reject) => {
    fetch(endpoint)
      .then(res => res.json())
      .then(res => resolve(res)).catch(e => console.log("Error getting data from api"))
  })
}