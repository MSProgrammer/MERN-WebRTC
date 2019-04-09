const mongoose = require("mongoose");
const groupSchema = mongoose.Schema(
  {
    name: String,
    created_date: Date,
    is_active: { type: Boolean, default: false }
  },
  { id: true, timestamp: true }
);
module.exports = mongoose("group", groupSchema);
