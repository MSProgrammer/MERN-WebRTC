const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    chat_parent_id: Number,
    chat_author_user_id: { type: mongoose.Schema.types.ObjectId, ref: "user" },
    chat_message_author_client_id: Number,
    message_body: String,
    message_deliverd: { type: Boolean, default: false },
    message_read: { type: Boolean, default: false },
    is_group_message: { type: Boolean, default: false },
    expiry_date: Date
  },
  { id: true, timestamp: true }
);

module.exports = mongoose.model("message", chatSchema);
