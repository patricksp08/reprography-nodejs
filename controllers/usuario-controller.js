// const UsuarioService = require("../services/usuario-service")
const sequelize = require("sequelize");
const { usuario } = require("../models");
const { sign } = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;


class UsuarioController {

    constructor() {
        
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