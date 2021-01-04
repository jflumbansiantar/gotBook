'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      books.belongsToMany(models.genre);
    }
  };
  books.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: 'Please enter a title.'
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: 'Please enter the author.'
        }
      }
    },
    year: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          message: 'Please enter the year.'
        }
      }
    },
    pages: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: 'Please enter the amount of pages in the books.'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          message: 'Please enter the description.'
        }
      }
    },
    genreId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'books',
  });
  return books;
};