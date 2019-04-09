const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    user_name: { type: String, unique: true, required: true, dropDups: true },
    password: String,
    name: {
      first: String,
      last: String
    },
    email: { type: String, unique: true },
    avatar: {
      data: Buffer,
      contentType: String
    },
    description: String
  },
  {
    id: true,
    timestamps: true
  }
);

module.exports = mongoose.model("user", UserSchema);
