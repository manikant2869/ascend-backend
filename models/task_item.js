const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('task_item', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    task_list_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'task_list',
        key: 'id'
      }
    },
    item: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'task_item',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "task_item_FK",
        using: "BTREE",
        fields: [
          { name: "task_list_id" },
        ]
      },
    ]
  });
};
