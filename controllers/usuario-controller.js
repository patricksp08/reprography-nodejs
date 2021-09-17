const UsuarioService = require("../services/usuario-service")
const { usuario } = require("../models");

const bcrypt = require("bcryptjs");
const saltRounds = 10;
const { sign } = require("jsonwebtoken");


class UsuarioController {

    constructor() {
        this.usuarioService = new UsuarioService();
    }

    async adicionar (req, res) {
        const { nif, senha, nome, telefone, depto, tipo_usuario, email, cfp, imagem } = req.body;
        imagem = 'uploads/user-img/default/usuario.png';

        if (tipo_usuario === "true") {
            tipo_usuario = 1;
        } else {
            tipo_usuario = 0;
        }

        if (depto === "true") {
            depto = 1;
        } else {
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
            res.status(200).json({ message: "Usuário criado com sucesso!" });
        });
    }


    async alterarPorNif(req, res) {
        const { nif, senha, nome, telefone, depto, tipo_usuario, email, cfp, imagem } = req.body;

        await Product.update(
            { nif, senha, nome, telefone, depto, tipo_usuario, email, cfp, imagem },
            {
                where: { nif: req.params.nif },
            }
        );

        res.status(200).json({ message: 'Usuário atualizado com sucesso' });
    }


    async excluirPorNif(req, res) {
        await Product.destroy({
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

    async buscarPorUser(req, res) {
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
        let usuarios = await usuario.findOne({
            where: {
                nif: `${nif}`
            }
        }
        )
        console.log(usuarios);
        res.status(200).json(usuarios);
    }

    async logar(req, res) {
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