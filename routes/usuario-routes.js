const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");

//Instanciando Controller
const UsuarioController = require("../controllers/usuario-controller")

const usuarioController = new UsuarioController() 

//GET
//Exibe todos os usuários da tabela usuario
router.get("/", (req, res) => {
  usuarioController.buscarTodos(req,res)
})

//Exibe o usuarío por nome na tabela usuario (exemplo: host:porta/usuariox)
router.get("/:user", (req, res) => {
  usuarioController.buscarPorNome(req,res)
})

//Exibe o usuarío por nif na tabela usuario (exemplo: host:porta/33321)
router.get("/nif/:nif", (req, res) => {
  usuarioController.buscarPorNif(req,res)
})

//Rota para verificar se o usuário está logado (validateToken do Middleware AuthMiddleware)
router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});


//PUT
//Rota para alterar um usuario da tabela usuario por ID
router.put('/:nif', (req, res) => {
  usuarioController.alterarPorNif(req,res)
});

//Rota para atualizar a senha
router.put("/changepassword", validateToken, (req, res) => {
  usuarioController.mudarSenha(req,res)
});


//Delete
//Rota para deletar um usuario da tabela usuario por nif
router.delete('/:nif', (req, res) => {
  usuarioController.excluirPorNif(req,res)
});

module.exports = router;

//ROTA FOI PARA AUTH-ROUTER
//POST

// //Rota para logar utilizando email ou nif com autenticação da senha registrada com hash na tabela usuario 
// router.post("/login", (req, res) => {
//   usuarioController.logar(req,res)
// })

// //Rota para registrar usuários na tabela usuario
// router.post("/", (req, res) => {
//   usuarioController.adicionar(req,res)
// })