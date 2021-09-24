// const UsuarioService = require("../services/usuario-service")
const sequelize = require("sequelize");
const { usuario } = require("../models");
const { sign } = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;


class UsuarioController {

    constructor() {
        
    }

    async adicionar(req, res) {
<<<<<<< HEAD

=======
        let { nif, senha, nome, telefone, depto, tipo_usuario, email, cfp, imagem } = req.body;
        imagem = 'uploads/user-img/default/usuario.png';


        // ------------------> //Tratar com front-end 
        
        // if (tipo_usuario === "true") {
        //     tipo_usuario = 1;
        // } else {
        //     tipo_usuario = 0;
        // }

        // if (depto === "true") {
        //     depto = 1;
        // } else {
        //     depto = 0;
        // }

        //Tratar com front-end // <-----------------
         

        if (req.file) {
            imagem = req.file.path;
        }

        // if (select === "Escolha um departamento") {
        // 	select = "Nenhum"
        // }
>>>>>>> 7cd3467302024fe587e2226f0b3bdd214d78ccc5

        // usuario.sequelize.query("SET foreign_key_checks = 0;", null);
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
            res.status(200).json({ message: "Usuário criado com sucesso!" });
        });

    }


    async alterarPorNif(req, res) {
        const { nif, senha, nome, telefone, depto, tipo_usuario, email, cfp, imagem } = req.body;

        await usuario.update(
            { nif, senha, nome, telefone, depto, tipo_usuario, email, cfp, imagem },
            {
                where: { nif: req.params.nif },
            }
        );

        res.status(200).json({ message: 'Usuário atualizado com sucesso' });
    }


    async excluirPorNif(req, res) {
        await usuario.destroy({
            where: {
                nif: req.params.nif,
            },
        });

        res.status(200).json({ message: 'Usuário excluido com sucesso' });
    }

    async buscarTodos(req, res) {
        let usuarios = await usuario.findAll()
        console.log(usuarios)
        res.json(usuarios)
    }

    async buscarPorNome(req, res) {
        const user = req.params.user;
        let usuarios = await usuario.findAll({
            where: {
                nome: `${user}`
            }
        })
        console.log(usuarios)
        res.json(usuarios)
    }

    async buscarPorNif(req, res) {
        const { nif } = req.params;
        let usuarios = await usuario.findByPk(nif, {
            attributes: { exclude: ["senha"] },
        });

        res.json(usuarios);
    };

     async logar(req, res) {
        let {nif, senha} = req.body;
        
        var user = await usuario.findOne({ where: { nif : nif } });
        
        if (!user) res.json({ error: "User Doesn't Exist" });
        
        bcrypt.compare(senha, user.senha).then(async (match) => {
          if (!match) res.json({ error: "Wrong Username And Password Combination" });
      
          const accessToken = sign(
            { nif: user.nif, email: user.email, nome: user.nome },
            "importantsecret"
          );
          res.json({ token: accessToken, nif: nif, email: user.email, nome: user.nome });
        });
    }

    async mudarSenha(req, res) {
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
    }
}

module.exports = UsuarioController;