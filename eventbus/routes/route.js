const express = require("express");
const route = express.Router();
const axios = require("axios");
const url = require("../utils/url");

route.get("/getuser/:userid", async (req, res) => {
  // axios call to user service to get user details and send them back
  try {
    const userDetails = await axios.get(
      url.USER_SERVICE + "/users/" + req.params.userid
    );

    res.status(200).send({ user: userDetails.data.user });
  } catch (err) {
    console.log(err);
    res.json({ message: "Error in event bus" });
  }
});

route.get("/boughtitems/:uid", async (req, res) => {
  // axios call to buy service to get user bought items
  try {
    const boughtItemsIdDetails = await axios.get(
      url.BUY_SERVICE + "/buy/" + req.params.uid
    );

    boughtItemsId = boughtItemsIdDetails.data.boughtItemsId;

    let query = "";
    for (i = 0; i < boughtItemsId.length; i++) {
      query = query + "itemid=" + boughtItemsId[i] + "&";
    }

    const itemsDetails = await axios.get(url.ITEM_SERVICE + "/items?" + query);

    const userBoughtItems = itemsDetails.data.items;

    res
      .status(200)
      .send({ message: "Success", userBoughtItems: userBoughtItems });
  } catch (err) {
    console.log(err);
    res.json({ message: "Error in event bus" });
  }
});

module.exports = route;
