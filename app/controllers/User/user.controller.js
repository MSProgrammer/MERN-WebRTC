const User = require("../../models/user.model");

/***
 * Create User
 * Route serving the Create Form
 * @function
 * @memberof Route:/user/create
 * @type {object}
 * @namespace CreateUser
 * @param {string} user_name
 * @param {string} password
 * @callback  JSON
 */
exports.create = (req, res) => {
  //Validate request
  if (req.body.lenght === 0) {
    return res.status(400).send({
      Message: "UserField Can not Empty"
    });
  }
  //Create A User
  const user = User({
    user_name: req.body.username,
    password: req.body.password
  });
  user
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      if (err) {
        if (err.name === "MongoError" && err.code === 11000) {
          return res.status(500).send({
            Message: "UserName is Existed"
          });
        }
      }
      res.status(500).send({
        Message: err.Message || "Some Error Occurred While Creating the User"
      });
    });
};
/***
 * Show All Of the Users
 * @function
 * @memberof Route:/user/list
 * @type {object}
 * @callback JSON
 */
exports.allUsers = (req, res) => {
  User.find()
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some Error While Getting ALl Users"
      });
    });
};
/***
 * Find One Of Users By User ID
 * @function
 * @params userId
 * @memberof Route:/user/:userId
 * @callback User.JSON
 */
exports.findOne = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "The Wanted User IS Not Found!"
        });
      }
      res.send(user);
    })
    .catch(err => {
      if (err.kind === "objectId") {
        return res.status(404).send({
          message: "Not Found User With ID" + req.params.noteId
        });
      }
      return res
        .status(500)
        .send({ message: "Has Some Error Occured!" + req.params.noteId });
    });
};
/**
 * Find The User By UserName
 * @function
 * @memberof Route:/user/:?username
 * @params UserName
 * @callback User.JSON
 */
exports.findOnebyName = (req, res) => {
  User.find({ user_name: req.params.username }, (err, data) => {
    if (!data.length) {
      return res.status(505).send({ message: "User Not Found" });
    }
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.send(data);
  });
};
/**
 * update Fill And Compelete The User Details
 * @function
 * @memberof /users/:userId
 * @callback Resolve.JSON
 * @param userId
 */
exports.updateProfile = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "The User Details IS Empty"
    });
  }
  let id = req.params.userId;
  User.findOneAndUpdate(id, {
    name: { first: req.body.firstname, last: req.body.lastname },
    email: req.body.email ,
    description: req.body.description
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User Not Founded"
        });
      }
      res.send(user);
    })
    .catch(err => {
      if (err.kind === "ObjectID") {
        return res.status(404).send({
          messa: "User Not Founded"
        });
      }
      return res.status(500).send({
        message: "Error updating user"
      });
    });
};
/**
 * Delete A User with UserId
 * @function
 * @memberof Route:user/del/:userId
 * @callback Resolve.JSON
 */
exports.delete = (req, res) => {
  User.findByIdAndDelete(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User Not Found with ID" + req.params.userId
        });
      }
      res.send({ message: "User Deleted successfully" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "User Not Founded with ID" + req.params.userId
        });
      }
      return res.status(500).send({
        message: "Could Not Delete User With ID" + req.params.userId
      });
    });
};
