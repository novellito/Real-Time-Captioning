"use strict";

const AdminModel = require("../models/admin");

let AdminController = {};

AdminController.getAllAdmins = (req, res) => {
  console.log("Getting all admins");

  AdminModel.find({}, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
};

module.exports = AdminController;
