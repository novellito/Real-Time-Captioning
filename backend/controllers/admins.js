"use strict";

const AdminModel = require("../models/admin");

let AdminController = {};

AdminController.getAllAdmins = (req, res) => {
  let getAllAdminsPromise = AdminModel.find({}).exec();
  getAllAdminsPromise
    .then(admins => {
      return res.status(200).json(admins);
    })
    .catch(err => {
      return res.status(500).json({ error: err });
    });
};

AdminController.storeAdmin = (req, res) => {
  let admin = new AdminModel(req.body);
  let createAdminPromise = admin.save();

  createAdminPromise
    .then(admin => {
      return res.status(200).json(admin);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: err });
    });
};

AdminController.destroyById = (req, res) => {
  let adminID = req.params.id;
  let findByIdAndRemovePromise = AdminModel.findByIdAndRemove(adminID).exec();

  findByIdAndRemovePromise
    .then(admin => {
      return admin
        ? res.status(200).json(admin)
        : res.status(404).json({ error: `No Admin found with id: ${adminID}` });
    })
    .catch(err => {
      console.log("Error: " + err.message);
      return res.status(500).json({ error: err.message });
    });
};

module.exports = AdminController;
