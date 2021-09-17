const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");
const multer = require('multer');


//UPLOAD DE IMAGENS
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //cb(null, './uploads/');
        cb(null, 'uploads/user-img');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/gif') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 2048 * 2048 * 5
    },
    fileFilter: fileFilter
});

//GET
const UsuarioController = require("../controllers/usuario-controller")

const usuarioController = new UsuarioController () 
//Exibe todos os usuários da tabela usuario
router.get("/", (req, res) => {
  usuarioController.buscarTodos(req,res)
})

//Exibe o usuarío por nome na tabela usuario (exemplo: host:porta/usuariox)
router.get("/:user", (req, res) => {
  usuarioController.buscarPorUser(req,res)
})

//Exibe o usuarío por nif na tabela usuario (exemplo: host:porta/33321)
router.get("/nif/:nif", (req, res) => {
  usuarioController.buscarPorNif(req,res)
})


//Rota para verificar se o usuário está logado (validateToken do Middleware AuthMiddleware)
router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});


//POST

//Rota para logar utilizando email ou nif com autenticação da senha registrada com hash na tabela usuario 
router.post("/login", (req, res) => {
  usuarioController.logar(req,res)
})

//Rota para registrar usuários na tabela usuario
router.post("/", upload.single('imagem_cliente'), (req, res) => {
  usuarioController.adicionar(req,res)
})


//PUT

//Rota para alterar um usuario da tabela usuario por ID
router.put('/:nif', (req, res) => {
  usuarioController.alterarPorNif(req,res)
});


//Delete

//Rota para deletar um usuario da tabela usuario por nif
router.delete('/:nif', (req, res) => {
  usuarioController.excluirPorNif(req,res)
});

//Rota para atualizar a senha
router.put("/changepassword", validateToken, (req, res) => {
  usuarioController.mudarSenha(req,res)
});


module.exports = router;