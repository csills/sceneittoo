'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      imdbid: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      mpaarating: {
        type: Sequelize.STRING
      },
      released: {
        type: Sequelize.DATE
      },
      runtime: {
        type: Sequelize.STRING
      },
      genre: {
        type: Sequelize.STRING
      },
      director: {
        type: Sequelize.STRING
      },
      writer: {
        type: Sequelize.STRING
      },
      actors: {
        type: Sequelize.STRING
      },
      plot: {
        type: Sequelize.STRING
      },
      poster: {
        type: Sequelize.STRING
      },
      imdbrating: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Movies');
  }
};