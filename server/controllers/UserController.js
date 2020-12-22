const User = require("../models/User");

module.exports = {
  index: async (req, res) => {
    try {
      const users = await User.find().sort("id");
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/user/index", {
        users,
        alert,
        title: "Kelas Kita | User",
        user: req.session.user,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/user");
    }
  },

  create: async (req, res) => {
    try {
      const { name, username, password } = req.body;
      await User.create({ name, username, password });
      req.flash("alertMessage", "Success Add User!");
      req.flash("alertStatus", "success");
      res.redirect("/admin/user");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/user");
    }
  },

  update: async (req, res) => {
    try {
      const { id, name, username, password } = req.body;
      const user = await User.findOne({ _id: id });
      user.name = name;
      user.username = username;
      if (password != undefined) {
        user.password = password;
      }
      await user.save();
      req.flash("alertMessage", "Success Update User!");
      req.flash("alertStatus", "success");
      res.redirect("/admin/user");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/user");
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findOne({ _id: id });
      await user.remove();
      req.flash("alertMessage", "Success Delete User!");
      req.flash("alertStatus", "success");
      res.redirect("/admin/user");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/user");
    }
  },
};
