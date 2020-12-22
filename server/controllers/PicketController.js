const Day = require("../models/Day");
const Student = require("../models/Student");
const Picket = require("../models/Picket");

module.exports = {
  index: async (req, res) => {
    try {
      const day = await Day.find().sort("_id");
      const student = await Student.find().sort("_id");
      const picket = await Picket.find()
        .sort("dayId")
        .populate({
          path: "studentId",
          select: "_id name",
        })
        .populate({
          path: "dayId",
          select: "_id name",
        });
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/picket/index", {
        day,
        student,
        picket,
        alert,
        title: "Kelas Kita | Picket",
        view: "index",
        user: req.session.user,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/picket");
    }
  },

  create: async (req, res) => {
    try {
      const { dayId, studentId } = req.body;
      const day = await Day.findOne({ _id: dayId });
      const student = await Student.findOne({ _id: studentId });
      const picket = await Picket.create({
        dayId: day._id,
        studentId: student._id,
      });
      day.picketId.push({ _id: picket._id });
      await day.save();
      req.flash("alertMessage", "Success Add Picket!");
      req.flash("alertStatus", "success");
      res.redirect("/admin/picket");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/picket");
    }
  },

  edit: async (req, res) => {
    try {
      const { id } = req.params;
      const day = await Day.find().sort("_id");
      const student = await Student.find().sort("_id");
      const picket = await Picket.findOne({ _id: id })
        .populate({
          path: "studentId",
          select: "_id name",
        })
        .populate({
          path: "dayId",
          select: "_id name",
        });
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/picket/index", {
        day,
        student,
        picket,
        alert,
        title: "Kelas Kita | Picket",
        view: "edit",
        user: req.session.user,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/picket");
    }
  },

  update: async (req, res) => {
    const { id } = req.body;
    try {
      const { dayId, studentId } = req.body;
      const day = await Day.findOne({ _id: dayId });
      const student = await Student.findOne({ _id: studentId });
      const picket = await Picket.findOne({ _id: id });
      const cekDay = await Day.findOne({
        _id: picket.dayId,
      }).populate("picketId");
      for (let i = 0; i < cekDay.picketId.length; i++) {
        if (cekDay.picketId[i]._id.toString() === picket._id.toString()) {
          cekDay.picketId.pull({ _id: picket._id });
          await cekDay.save();
        }
      }
      picket.dayId = day._id;
      picket.studentId = student._id;
      await picket.save();
      day.picketId.push({ _id: id });
      await day.save();
      req.flash("alertMessage", "Success Update Picket!");
      req.flash("alertStatus", "success");
      res.redirect("/admin/picket");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/picket/${id}`);
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const picket = await Picket.findOne({ _id: id });
      const day = await Day.findOne({
        _id: picket.dayId,
      }).populate("picketId");
      for (let i = 0; i < day.picketId.length; i++) {
        if (day.picketId[i]._id.toString() === picket._id.toString()) {
          day.picketId.pull({ _id: picket._id });
          await day.save();
        }
      }
      await picket.remove();
      req.flash("alertMessage", "Success Delete Picket!");
      req.flash("alertStatus", "success");
      res.redirect("/admin/picket");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/picket");
    }
  },
};
