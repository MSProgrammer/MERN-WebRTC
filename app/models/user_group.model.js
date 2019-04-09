const mongoose = require("mongoose");

const groupSchema = mongoose.Schema(
  {
    name: String,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: user },
    group_id: { type: mongoose.Schema.Types.ObjectId, ref: group },
    is_active: { type: Boolean, default: false }
  },
  { id: true, timestamp: true }
);

module.exports = mongoose("user_group", groupSchema);
