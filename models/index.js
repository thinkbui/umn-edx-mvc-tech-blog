const User = require("./User");
const Other = require("./Other");
const Post = require("./Post");

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});



module.exports = { Other, User, Post }
