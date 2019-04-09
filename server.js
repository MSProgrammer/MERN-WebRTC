const express = require("express");
const http = require("http");
const bodyparser = require("body-parser");
const dbConfig = require("./config/database.config");
const mongoose = require("mongoose");
const app = express();
const reload = require("reload");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

mongoose.Promise = global.Promise;
/***
 * @function mongoose
 */
mongoose
  .connect(dbConfig.url, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.log("DB Successfuly Connected");
  })
  .catch(err => {
    console.log("DB Couldn`t Connect", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to KAVA-IM" });
});

//#region Save And Relaod The Code When Saved
// //Reload Server When Save The Code
// var server = http.createServer(app);
// reload(app)
//   .then(function() {
//     //reload Started ,Start web Server
//     server.listen(app.get("port"), function() {
//       console.log("Web Server Listening on port" + app.get("port"));
//     });
//   })
//   .catch(function(err) {
//     console.error(
//       "Reload could not Start ,Could not Start server/sample app",
//       err
//     );
//   });
//#endregion
/***
 * Make Router Promises
 * @callback express.app
 *
 */
require("./app/routes/kavaim.routes")(app);
const server = app.listen(3000, "127.0.0.1", () => {
  const { address, port } = server.address();
  console.log("Server is Listening at http://%s:%s", address, port);
});
