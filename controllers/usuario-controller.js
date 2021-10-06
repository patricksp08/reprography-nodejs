//Inicializando as models e as recebendo
const { initModels } = require("../models/init-models")
var { usuario } = initModels(sequelize)

//Usado para criptografar as senhas no banco -> Nesse caso para comparar a senha 
//quando o usuário solicitar mudança de senha.
const bcrypt = require("bcrypt");

//Funções do usuário 
module.exports = {

    informacoesBasicas: async (req, res) => {
        let usuarios = await usuario.findByPk(req.user.nif, {
            attributes: { exclude: ["senha"] },
        });

        res.json(usuarios);
    },

    //Altera 
    alterarPorNif: async (req, res) => {
        let { nome, telefone, depto, email, cfp, imagem } = req.body;

        imagem = 'uploads/user-img/default/usuario.png';

        if (req.file) {
            imagem = req.file.path;
        }

        await usuario.update(
            { nome, telefone, depto, email, cfp, imagem },
            {
                where: { nif: req.user.nif },
            }
        );

        res.status(200).json({ message: `Sua conta foi atualizada com sucesso!!` });
    },

    //Usuário pode excluir a própria conta (exclui pelo nif do usuário logado)
    excluirPorNif: async (req, res) => {
        await usuario.destroy({
            where: {
                nif: req.user.nif,
            },
        });

        res.status(200).json({ message: `Sua conta foi excluida com sucesso!!` });
    },

    mudarSenha: async (req, res) => {
        const { senhaAntiga, senhaNova } = req.body;

        await usuario.findOne({
            where: {
                nif: req.user.nif
            },
        }).then(user => {
            bcrypt.compare(senhaAntiga, user.senha).then((match) => {
                if (!match) return res.json({ error: "Senha inserida está incorreta" });

                bcrypt.hash(senhaNova, 10, function (err, hash) {
                    if (err) throw (err);
                    usuario.update(
                        { senha: hash },
                        { where: { nif: req.user.nif } }
                    );
                    res.json("Sua senha foi atualizada com sucesso!!");
                });
            });
        });
    }
}