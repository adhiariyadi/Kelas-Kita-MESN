const Article = require("../models/Article");
const User = require("../models/User");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  index: async (req, res) => {
    try {
      const article = await Article.find().sort("_id");
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/article/index", {
        article,
        alert,
        title: "Kelas Kita | Student",
        user: req.session.user,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/article");
    }
  },

  create: async (req, res) => {
    try {
      const { title, content } = req.body;
      const user = await User.findOne({ _id: req.session.user.id });
      await Article.create({
        title,
        content,
        image: `/images/articles/${req.file.filename}`,
        userId: user._id,
      });
      req.flash("alertMessage", "Success Add Article!");
      req.flash("alertStatus", "success");
      res.redirect("/admin/article");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/article");
    }
  },

  update: async (req, res) => {
    try {
      const { id, title, content } = req.body;
      const article = await Article.findOne({ _id: id });
      if (req.file != undefined) {
        await fs.unlink(path.join(`public${article.image}`));
        article.image = `/images/articles/${req.file.filename}`;
      }
      article.title = title;
      article.content = content;
      await article.save();
      req.flash("alertMessage", "Success Update Article!");
      req.flash("alertStatus", "success");
      res.redirect("/admin/article");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/article");
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const article = await Article.findOne({ _id: id });
      await fs.unlink(path.join(`public${article.image}`));
      await article.remove();
      req.flash("alertMessage", "Success Delete Article!");
      req.flash("alertStatus", "success");
      res.redirect("/admin/article");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/article");
    }
  },
};
