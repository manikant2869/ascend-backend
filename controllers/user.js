const User = require("../services/user")
const utils = require("../utils/utils")
const { TIME } = require("sequelize");

module.exports = {
    add: async function(req,res){
        let result = await User.add(req.body);
        utils.sendResponse(result,req,res);
    },
    login: async function(req,res){
        let result = await User.login(req.body);
        utils.sendResponse(result,req,res);
    },
    addList: async function(req,res){
        let result = await User.addList(req.body);
        utils.sendResponse(result,req,res);
    },
    addListItem: async function(req,res){
       let result = await User.addListItem(req.body);
       utils.sendResponse(result,req,res);
    },
    listAll: async function(req,res){
        let result = await User.listAll(req.body.id);
        utils.sendResponse(result,req,res);
    },
    changeItem : async function(req,res){
        let result = await User.changeItem(req.params.id,req.body.task_list_id);
        utils.sendResponse(result,req,res);
    },
    deleteItem : async function(req,res){
        let result = await User.deleteItem(req.params.id);
        utils.sendResponse(result,req,res);
    },
    deleteList: async function(req,res){
        let result = await User.deleteList(req.params.id);
        utils.sendResponse(result,req,res);
    }
}