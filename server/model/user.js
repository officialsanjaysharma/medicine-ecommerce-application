/**
 * @file Creates UserModel for users.
 * @this UserModel
 * @exports User
 * 
 * @author Sanjay Sharma
 */
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("usr", {
    USERNAME: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    PASSWORD: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });
  return User;
};