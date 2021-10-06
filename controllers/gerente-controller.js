//Inicializando as models e as recebendo
const { initModels } = require("../models/init-models")
var { usuario } = initModels(sequelize)

//Usado para criptografar as senhas no banco -> Nesse caso para comparar a senha 
//quando o usuário solicitar mudança de senha.
const bcrypt = require("bcrypt");

module.exports = {

    buscarTodos: async (req, res) => {
        let usuarios = await usuario.findAll({
            include: [
                'roles'
            ]
        })
        res.json(usuarios)
    },

    buscarPorNome: async (req, res) => {
        const user = req.params.user;
        // const query = `%${req.query.search}`;
        let usuarios = await usuario.findAll({
            where: {
                nome: {
                    [Op.like]: `${user}%`
                }
            },
            include: [
                'roles'
            ],
            attributes: { exclude: ["senha"] }
        })
        res.json(usuarios)
    },

    buscarPorNif: async (req, res) => {
        let usuarios = await usuario.findAll({
            where: {
                nif: req.params.nif
            },
            include: [
                'roles'
            ],
        })
        res.json(usuarios)
    },

    alterarPorNif: async (req, res) => {
        let { nif, nome, senha, telefone, depto, email, cfp, admin, imagem } = req.body;

        imagem = 'uploads/user-img/default/usuario.png';

        if (req.file) {
            imagem = req.file.path;
        }

        if (admin == 1) {
            admin = ["admin"]
        }
        else {
            admin = ["user"]
        }
        bcrypt.hash(senha, 10, function (err, hash) {
            if (err) throw (err);
            usuario.update(
                { nif, nome, senha: hash, telefone, depto, email, cfp, roles: admin, imagem },
                {
                    where: { nif: req.params.nif },
                }
            )
            res.status(200).json({ message: `Sua conta foi atualizada com sucesso!!` });
        });
    },

    excluirPorNif: async (req, res) => {
        await usuario.destroy({
            where: {
                nif: req.params.nif
            },
        });
        res.status(200).json({ message: `Sua conta foi excluida com sucesso!!` });
    }
}