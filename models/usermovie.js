'use strict';
module.exports = (sequelize, DataTypes) => {
  var Usermovie = sequelize.define('Usermovie', {
    sceneitlist: DataTypes.BOOLEAN,
    wishlist: DataTypes.BOOLEAN
  }, {});
  Usermovie.associate = function(models) {
    // associations can be defined here
    Usermovie.belongsTo(models.User);
    Usermovie.belongsTo(models.Movie);
  };
  return Usermovie;
};