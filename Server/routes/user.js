const express = require("express");
const router = express.Router();
const multer = require("multer");
const UserContoller = require("../controllers/user");
const check = require("../middlewares/auth");
const cors = require("cors");

router.use(cors());
// Configuracion de subida
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/avatars/")
    },
    filename: (req, file, cb) => {
        cb(null, "avatar-"+Date.now()+"-"+file.originalname);
    }
});

const uploads = multer({storage});

// Definir rutas
router.get("/prueba-usuario", check.auth, UserContoller.pruebaUser);
router.post("/register", UserContoller.register);
router.post("/registerAdmin",UserContoller.registerAdmin)
router.post("/login", UserContoller.login);
router.get("/profile/:id", check.auth, UserContoller.profile);
router.get("/list/:page?", check.auth, UserContoller.list);
router.put("/update", check.auth, UserContoller.update);
router.put("/update2/:id", check.auth, UserContoller.update2);
router.delete('/delete/:id',check.auth, UserContoller.removeUser);
router.post("/upload", [check.auth, uploads.single("file0")], UserContoller.upload);
router.get("/avatar/:file", UserContoller.avatar); // TODO mirar como meter foto distinta cambio 
router.get("/counters/:id", check.auth, UserContoller.counters);
router.get("/list2/:page?",check.auth, UserContoller.list2 )
//Rutas BackOffice TODO revisar como no duplicar codigo

// Exportar router
module.exports = router;