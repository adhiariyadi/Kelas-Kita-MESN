const Student = require("../models/Student");
const Subject = require("../models/Subject");
const User = require("../models/User");
const Article = require("../models/Article");

module.exports = {
  index: async (req, res) => {
    try {
      const student = await Student.find().sort("id");
      const subject = await Subject.find().sort("id");
      const users = await User.find().sort("id");
      const article = await Article.find()
        .sort({ _id: -1 })
        .limit(10)
        .populate("userId");
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/index", {
        student,
        subject,
        users,
        article,
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
};
