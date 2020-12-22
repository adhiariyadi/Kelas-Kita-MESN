const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = {
  signup: (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("auth/register", {
        alert,
        title: "Kelas Kita | Register",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/register");
    }
  },

  register: async (req, res) => {
    try {
      const { name, username, password } = req.body;
      const user = await User.create({ name, username, password });
      req.session.user = {
        id: user.id,
        name: user.name,
      };
      res.redirect("/admin/dashboard");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/register");
    }
  },

  signin: async (req, res) => {
    try {
      if (req.session.user == null || req.session.user == undefined) {
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        const alert = { message: alertMessage, status: alertStatus };
        res.render("auth/login", {
          alert,
          title: "Kelas Kita | Login",
          user: req.session.user,
        });
      } else {
        res.redirect("/admin/dashboard");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/signin");
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username: username });
      if (!user) {
        req.flash("alertMessage", "User yang anda masukan tidak ada!");
        req.flash("alertStatus", "danger");
        res.redirect("/admin/signin");
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        req.flash("alertMessage", "Password yang anda masukan tidak cocok!");
        req.flash("alertStatus", "danger");
        res.redirect("/admin/signin");
      }
      req.session.user = {
        id: user.id,
        name: user.name,
      };
      res.redirect("/admin/dashboard");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/signin");
    }
  },

  logout: (req, res) => {
    req.session.destroy();
    res.redirect("/admin/signin");
  },
};
