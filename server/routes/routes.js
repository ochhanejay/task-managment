
const router = require("express").Router();
const userController = require("../controller/userController");


router.post("/addUser", userController.addUser);
router.post("/addTask", userController.addTask);
router.get("/getUserTask", userController.getUserTask);
router.get("/getUser", userController.getUser);
router.delete("/deleteTask", userController.deleteTask);



module.exports = router;
