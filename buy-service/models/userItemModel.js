const mongoose = require("mongoose");

const userItemSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  itemid: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Item",
    },
  ],
});

const UserItem = mongoose.model("userItem", userItemSchema);

module.exports = UserItem;
