const express = require("express");
const router = express.Router();

const { validateToken } = require("../middlewares/AuthMiddleware");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const { sign } = require("jsonwebtoken");

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
router.get("/", (req,res) => {
  usuarioController.buscarTodos(req,res)
})

//Exibe o usuarío por nome na tabela usuario (exemplo: host:porta/usuariox)
router.get("/:user", async (req, res ) => {
  user = req.params.user;
let usuarios = await usuario.findAll({where: {
  nome: `${user}`
}})
  console.log(usuarios)
  res.json(usuarios)
})

//Exibe o usuarío por nif na tabela usuario (exemplo: host:porta/33321)
router.get("/id/:nif", async (req, res ) => {
  const { nif } = req.params;
  let usuarios = await usuario.findOne({where: {
  nif: `${nif}`
}})
  console.log(usuarios);
  res.status(200).json(usuarios);
})

//Rota para verificar se o usuário está logado (validateToken do Middleware AuthMiddleware)
router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});


//POST

//Rota para logar utilizando email ou nif com autenticação da senha registrada com hash na tabela usuario 
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  const user = await usuario.findOne({ where: { email: email } });

  if (!user) res.json({ error: "Usuário não existente" });
 
  bcrypt.compare(senha, user.senha).then(async (match) => {
    if (!match) res.json({ error: "Usuário ou senha inválidos" });

    const accessToken = sign(
      { email: user.email, nif: user.nif },
      "importantsecret"
    );
    res.json({ token: accessToken, email: email, nif: user.nif });
    res.status(200);
  });
});

//Rota para registrar usuários na tabela usuario
router.post("/", upload.single('imagem_cliente'), async (req, res) => {
  const { nif, senha, nome, telefone, depto, tipo_usuario, email, cfp, imagem } = req.body; 
  imagem = 'uploads/user-img/default/usuario.png';

	if (tipo_usuario === "true") {
		tipo_usuario = 1;
	}else{
		tipo_usuario = 0;
	}

	if (depto === "true") {
		depto = 1;
	}else{
		depto = 0;
	}

	if (req.file) {
		imagem = req.file.path;
	}
  
	// if (select === "Escolha um departamento") {
	// 	select = "Nenhum"
	// }

  bcrypt.hash(senha, saltRounds).then((hash) => {
    usuario.create({
      nif: nif,
      senha: hash,
      nome: nome,
      telefone: telefone,
      id_depto: depto,
      id_tipo_usuario: tipo_usuario,
      email: email,
      cfp: cfp,
      imagem: imagem
    });
    res.status(200).json({message: "Usuário criado com sucesso!"});
  });
});


//PUT

//Rota para alterar um usuario da tabela usuario por ID
router.put('/:nif', async (req, res) => {
  const { nif, senha, nome, telefone, depto, tipo_usuario, email, cfp, imagem } = req.body; 

  await Product.update(
    { nif, senha, nome, telefone, depto, tipo_usuario, email, cfp, imagem },
    {
      where: { nif: req.params.nif },
    }
  );

  res.status(200).json({ message: 'Usuário atualizado com sucesso' });
});


//Delete

//Rota para deletar um usuario da tabela usuario por nif
router.delete('/:nif', async (req, res) => {
  await Product.destroy({
    where: {
      nif: req.params.nif,
    },
  });

  res.status(200).json({ message: 'Usuário excluido com sucesso' });
});

//Rota para atualizar a senha
router.put("/changepassword", validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await usuario.findOne({ where: { email: req.user.email } });

  bcrypt.compare(oldPassword, user.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong Password Entered!" });

    bcrypt.hash(newPassword, 10).then((hash) => {
      usuario.update(
        { password: hash },
        { where: { email: req.user.email } }
      );
      res.json("SUCCESS");
    });
  });
});


module.exports = router;