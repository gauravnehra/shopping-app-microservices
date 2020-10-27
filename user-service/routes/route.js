const express = require("express");
const route = express.Router();
const axios = require("axios");
const User = require("../models/userModel");

route.post("/users", async (req, res) => {
  if (!req.body.name || !req.body.userid) {
    return res.status(400).send({ message: "Bad Request" });
  }

  let user = new User(req.body);

  user.save((err) => {
    if (err) res.status(500).send(err);
    else {
      res.status(200).send({ message: "Success", user: user });
    }
  });
});

route.get("/users/:userid", async (req, res) => {
  let user = await User.findOne({ userid: req.params.userid });

  if (!user) {
    return res.status(404).send({ message: "Not Found" });
  }

  res.status(200).send({ message: "Success", user: user });
});

route.get("/users/items/:userid", async (req, res) => {
  let user = await User.findOne({ userid: req.params.userid });

  if (!user) {
    return res.status(404).send({ message: "Not Found" });
  }

  try {
    const boughtItemsDetails = await axios.get(
      "http://localhost:4444/boughtitems/" + user._id
    );

    let boughtItems = boughtItemsDetails.data.userBoughtItems;

    const finalObject = {
      user: user,
      boughtItems: boughtItems,
    };

    res.status(200).send({ message: "Success", userBoughtItems: finalObject });
  } catch (err) {
    console.log(err);
    res.json({ message: "Error in user service" });
  }
});

module.exports = route;
