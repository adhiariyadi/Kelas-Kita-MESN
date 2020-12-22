var router = require("express").Router();
const ApiController = require("../controllers/ApiController");

router.get("/home", ApiController.index);
router.get("/siswa", ApiController.siswa);
router.get("/siswa/:id", ApiController.siswaDetail);
router.get("/jadwal", ApiController.jadwal);
router.get("/piket", ApiController.piket);
router.get("/artikel", ApiController.artikel);
router.get("/artikel/:id", ApiController.artikelDetail);

module.exports = router;
