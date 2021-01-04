'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class genres extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      genre.hasMany(models.books)
    }
  };
  genres.init({
    genre: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: 'Please enter a genre name.'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: 'Please enter the description.'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'genres',
  });
  return genres;
};