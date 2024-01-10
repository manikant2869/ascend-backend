const express = require("express");
const router = express.Router()
const user = require("../controllers/user")

router.route("/signup").post( user.add )
router.route("/login").post(user.login)
router.route("/add/list").post(user.addList);
router.route("/add/list/item").post(user.addListItem);
router.route("/list/all").post(user.listAll);
router.route("/change/item/:id").put(user.changeItem);
router.route("/delete/item/:id").delete(user.deleteItem);
router.route("/remove/list/:id").delete(user.deleteList);
module.exports = router