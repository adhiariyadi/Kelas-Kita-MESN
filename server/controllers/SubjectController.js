const Subject = require("../models/Subject");

module.exports = {
  index: async (req, res) => {
    try {
      const subject = await Subject.find().sort("id");
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/subject/index", {
        subject,
        alert,
        title: "Kelas Kita | Subject",
        user: req.session.user,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/subject");
    }
  },

  create: async (req, res) => {
    try {
      const { name } = req.body;
      await Subject.create({ name });
      req.flash("alertMessage", "Success Add Subject!");
      req.flash("alertStatus", "success");
      res.redirect("/admin/subject");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/subject");
    }
  },

  update: async (req, res) => {
    try {
      const { id, name } = req.body;
      const subject = await Subject.findOne({ _id: id });
      subject.name = name;
      await subject.save();
      req.flash("alertMessage", "Success Update Subject!");
      req.flash("alertStatus", "success");
      res.redirect("/admin/subject");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/subject");
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const subject = await Subject.findOne({ _id: id });
      await subject.remove();
      req.flash("alertMessage", "Success Delete Subject!");
      req.flash("alertStatus", "success");
      res.redirect("/admin/subject");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/subject");
    }
  },
};
