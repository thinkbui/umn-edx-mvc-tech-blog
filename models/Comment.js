const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    content: {
      type: DataTypes.STRING
    },
    post_id: {
      type: DataTypes.INTEGER
    },
    user_id: {
      type: DataTypes.INTEGER
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'Comment'
  }
);

module.exports = Comment;
