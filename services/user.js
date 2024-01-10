const initModels = require("../models/init-models");
const models = initModels(global.sequelize);
const moment = require("moment");
const user = models.user;
const task_list = models.task_list;
const task_item = models.task_item;
const bcrypt = require("bcrypt");
module.exports = {
  add: async function (data) {
    try {
      let userExist = await user.findOne({
        where: {username: data.username}
      });
      if(userExist){
        return {
          message: "You are already registered with us",
          exist: true
        }
      }else{
      let saltrounds = 10;
      let salt = bcrypt.genSaltSync(saltrounds);
      let hash = bcrypt.hashSync(data.password,salt)
      data.password = hash;
      let result = await user.create(data);
      return {
        message: "user inserted successfully",
        exist : false
      };
    }
    } catch (err) {
      return {
        err: err,
      };
    }
  },
  login: async function (data) {
    try {
      let finduser;
      let userdata = await user.findOne({
        where: { username: data.username }
      });
      if (userdata) {
        let password = userdata.password;
        let isMatched = await bcrypt.compare(data.password,userdata.password)
        console.log("password matched",isMatched)
        if (isMatched) {
          // finduser = userdata;
          return {
            "verified": true,
            "finduser":JSON.stringify(userdata),
            "message": "user verified successfully",
          };
        } else {
          return {
            verified: false,
            message: "incorrect password",
          };
        }
      } else {
        return {
          verified: false,
          message: "username does not exist",
        };
      }
    } catch (err) {
      return {
        err: err
      };
    }
  },
  addList:async function(data){
    try{
        console.log("data to add ",data);
        const list = {user_id: data.user_id,list_heading:data.list_heading};
        let taskList =await task_list.create(list);
        for(let i =0 ; i<data.item.length;i++){
          const taskItem = {task_list_id:taskList.id,item:data.item[i]};
          console.log("task item is",taskItem)
          await task_item.create(taskItem);
        }
        return {
          message: "inserted successfully"
        };
    }catch(err){
      return {
        err:err
      }
    }
  },
  deleteList: async function(listId){
     try{
      let response = await task_item.destroy({
        where: {task_list_id: listId}
       })
       let result = await task_list.destroy({
        where: {id: listId}
       })
       
       return {
        response: response,
        message: "deleted list successfully"
       }
     }catch(err){
       return {
        err:err
       }
     }
  },
  addListItem: async function(data){
    try{
        const taskItem = {task_list_id:data.task_list_id,item:data.item};
        let result =  await task_item.create(taskItem);
      return {
        result : result,
        message: "inserted successfully"
      };
  }catch(err){
    return {
      err:err
    }
  }
  },
  listAll: async function(id){
    try{
       let result = await task_list.findAll({
        where: {user_id:id},
        include: [
          {model: task_item , as: "task_items"}
        ]
       })
       return {
        data: result
       }
    }
    catch(err){
        return{
          err: err
        }
    }
  },
  changeItem: async function(itemId,taskId){
    console.log(itemId,taskId);
    try{
      const result = await task_item.update({task_list_id:taskId},{
        where: {id:itemId}
      })
       return {
        result : result,
        message: "successfully changed"
       }
    }
    catch(err){
      return {
        err: err
      }
    }
  },
  deleteItem: async function(itemId){
    try{
      const result = await task_item.destroy({
        where: {id: itemId}
      })
      return {
        result : result,
        message : "deleted successfully"
      }
    }catch(err){
      return {
        err: err
      }
    }
  }
};
