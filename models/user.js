'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    github_id: DataTypes.INTEGER,
    twitter_id: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Usermovie);

  };
  return User;
}; 