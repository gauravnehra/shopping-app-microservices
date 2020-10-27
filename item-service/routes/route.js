const express = require("express");
const route = express.Router();
const axios = require("axios");
const Item = require("../models/itemModel");

route.post("/items", async (req, res) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).send({ message: "Bad Request" });
  }

  let item = new Item(req.body);

  item.save((err) => {
    if (err) res.status(500).send(err);
    else {
      res.status(200).send({ message: "Success", item: item });
    }
  });
});

route.get("/items", async (req, res) => {
  let itemIds = req.query.itemid;

  if (!itemIds || itemIds.length === 0) {
    return res.status(400).send({ message: "Bad Request" });
  }
  Item.find({ _id: { $in: itemIds } }, (err, items) => {
    if (err) res.status(500).send(err);
    else {
      res.status(200).send({ message: "Success", items: items });
    }
  });
});

module.exports = route;
