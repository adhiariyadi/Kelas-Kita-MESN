const Student = require("../models/Student");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  index: async (req, res) => {
    try {
      const student = await Student.find().sort("_id");
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/student/index", {
        student,
        alert,
        title: "Kelas Kita | Student",
        user: req.session.user,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/student");
    }
  },

  create: async (req, res) => {
    try {
      const { name, description } = req.body;
      await Student.create({
        name,
        image: `/images/students/${req.file.filename}`,
        description,
      });
      req.flash("alertMessage", "Success Add Student!");
      req.flash("alertStatus", "success");
      res.redirect("/admin/student");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/student");
    }
  },

  update: async (req, res) => {
    try {
      const { id, name, description } = req.body;
      const student = await Student.findOne({ _id: id });
      if (req.file != undefined) {
        await fs.unlink(path.join(`public${student.image}`));
        student.image = `/images/students/${req.file.filename}`;
      }
      student.name = name;
      student.description = description;
      await student.save();
      req.flash("alertMessage", "Success Update Student!");
      req.flash("alertStatus", "success");
      res.redirect("/admin/student");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/student");
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const student = await Student.findOne({ _id: id });
      await fs.unlink(path.join(`public${student.image}`));
      await student.remove();
      req.flash("alertMessage", "Success Delete Student!");
      req.flash("alertStatus", "success");
      res.redirect("/admin/student");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/student");
    }
  },
};
