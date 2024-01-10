var DataTypes = require("sequelize").DataTypes;
var _task_item = require("./task_item");
var _task_list = require("./task_list");
var _user = require("./user");

function initModels(sequelize) {
  var task_item = _task_item(sequelize, DataTypes);
  var task_list = _task_list(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  task_item.belongsTo(task_list, { as: "task_list", foreignKey: "task_list_id"});
  task_list.hasMany(task_item, { as: "task_items", foreignKey: "task_list_id"});
  task_list.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(task_list, { as: "task_lists", foreignKey: "user_id"});

  return {
    task_item,
    task_list,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
