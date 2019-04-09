module.exports = app => {
  const user = require("../controllers/User/user.controller.js");
  //#region User And Athuntication
  //Create User and Signup User
  app.post("/user/create", user.create);
  //Get All User
  app.get("/user/list", user.allUsers);
  //Retrive a single User with UserID/UserName
  app.get("/user/:userId", user.findOne);
  //Find A User By UserName
  app.get("/user/find/:username", user.findOnebyName);
  //Delete A User
  app.delete("/user/del/:userId", user.delete);
  //Update Profile After User Created
  app.put("/user/update/:userId", user.updateProfile);
  //#endregion
};
