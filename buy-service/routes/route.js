const express = require("express");
const route = express.Router();
const axios = require("axios");
const UserItem = require("../models/userItemModel");

route.post("/buy/:userid", async (req, res) => {
  let itemIds = req.query.itemid;

  if (!itemIds || itemIds.length === 0) {
    return res.status(400).send({ message: "Bad Request" });
  }
  // axios call to get user details with userid
  try {
    const userDetails = await axios.get(
      "http://localhost:4444/getuser/" + req.params.userid
    );

    let user = userDetails.data.user;

    let userItem = new UserItem({
      userid: user._id,
      itemid: itemIds,
    });

    userItem.save((err) => {
      if (err) res.status(500).send(err);
      else {
        res.status(200).send({ message: "Success", userItem: userItem });
      }
    });
  } catch (err) {
    console.log(err);
    res.json({ message: "Error in buy service" });
  }
});

route.get("/buy/:userid", async (req, res) => {
  let boughtItems = await UserItem.findOne({ userid: req.params.userid });

  if (!boughtItems) {
    return res.status(404).send({ message: "Not Found" });
  }

  res
    .status(200)
    .send({ message: "Success", boughtItemsId: boughtItems.itemid });
});

module.exports = route;
