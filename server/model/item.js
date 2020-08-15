/**
 * @file Creates a Model for  Items.
 * @this ItemModel
 * @exports Item
 * 
 * @author Sanjay Sharma
 */
module.exports = (sequelize, Sequelize) => {
  const { STRING, INTEGER } = Sequelize.DataTypes;
  const Item = sequelize.define('item', {
    "S.no": { type: INTEGER, unique: true },
    "Included Tests": { type: STRING },
    "Best-sellers": { type: STRING },
    itemName: { type: STRING },
    type: { type: STRING },
    Keyword: { type: STRING },
    testCount: { type: INTEGER },
    itemId: { type: STRING },
    url: { type: STRING },
    minPrice: { type: STRING },
    labName: { type: STRING },
    fasting: { type: INTEGER },
    availableAt: { type: INTEGER },
    popular: { type: STRING },
    category: { type: STRING },
    objectID: { type: STRING },
    itemName: { type: STRING },
    Keyword: { type: STRING },
    category: { type: STRING },
    ["Included Tests"]: { type: STRING },
  });
  return Item;
}

