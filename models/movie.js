'use strict';
module.exports = (sequelize, DataTypes) => {
  var Movie = sequelize.define('Movie', {
    imdbid: DataTypes.STRING,
    title: DataTypes.STRING,
    mpaarating: DataTypes.STRING,
    released: DataTypes.DATE,
    runtime: DataTypes.STRING,
    genre: DataTypes.STRING,
    director: DataTypes.STRING,
    writer: DataTypes.STRING,
    actors: DataTypes.STRING,
    plot: DataTypes.STRING,
    poster: DataTypes.STRING,
    imdbrating: DataTypes.STRING
  }, {});
  Movie.associate = function(models) {
    Movie.hasMany(models.Usermovie);
  };
  return Movie;
};