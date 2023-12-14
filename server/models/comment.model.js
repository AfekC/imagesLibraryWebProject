import Item from './item.model';

module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
    }
    },
    text: {
      type: Sequelize.STRING
    },
    itemId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'items',
        key: 'id'
    }
    }
  });
  return Comment;
};