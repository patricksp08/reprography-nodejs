//Biblioteca do sequelize 
const Sequelize = require("sequelize");
const { QueryTypes } = require('sequelize');
//Operadores do sequelize
const Op = Sequelize.Op;
//Arquivo de config
const config = require("../.config/auth.config.json");

//Inicializando as models e as recebendo
const { initModels } = require("../models/init-models")
var { usuario, tipo_usuario } = initModels(sequelize)

//Usado para criptografar as senhas no banco -> Nesse caso para comparar a senha 
//quando o usuário solicitar mudança de senha.
const bcrypt = require("bcrypt");

//Usado para enviar o token e informações do usuário pro front quando ele Logar
const { sign } = require("jsonwebtoken");
const { unlink } = require("fs");

const service = require("../services/usuario.service")

//Funções do usuário 
module.exports = {

    //Usuários 

    logar: async (req, res) => {

        const { emailOrNif, senha } = req.body;

        if (!emailOrNif || !senha) {
            return res.status(400).send(
                'Requisição faltando campos de email ou senha!'
            );
        }

        var user = await usuario.findOne({
            where: {
                email: emailOrNif
            }
        })

        //Login com usuário ou NIF
        if (user == null) {
            user = await usuario.findOne({
                where: {
                    nif: emailOrNif
                }
            })

            if (!user) {
                return res.json({ status: 'error', message: "E-mail ou Senha Inválidos!" })
            }
            else if (user.ativado === 0 && user.primeiro_acesso === 0) {
                return res.json({ status: 'error', message: "Sua conta está desativada, contate um administrador!" })
            }


        }
        else {

            if (user.ativado === 0 && user.primeiro_acesso === 1) {
                return res.json({ status: 'error', message: "Primeiro acesso requer NIF ao invés do e-mail." })
            }

            if (user.ativado === 0) {
                return res.json({ status: 'error', message: "Sua conta está desativada, contate um administrador!" })
            }
        }

        await bcrypt.compare(senha, user.senha).then((match) => {
            if (!match) {
                return res.json({
                    accessToken: null,
                    status: 'error',
                    message: "E-mail ou Senha Inválidos!"
                });
            };

            var authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push(roles[i].id + "_ROLE_" + roles[i].descricao.toUpperCase());
                }

                var token = sign({ nif: user.nif, nome: user.nome, email: user.email, imagem: user.imagem, roles: authorities, }, config.jwt.secret, {
                    expiresIn: 86400 // 24 hours
                });

                return res.status(200).json({
                    nif: user.nif,
                    nome: user.nome,
                    email: user.email,
                    imagem: user.imagem,
                    roles: authorities,
                    accessToken: token,
                    primeiro_acesso: user.primeiro_acesso
                });
            });
        })
            .catch(err => {
                res.status(500).json({ status: 'error', message: err.message });
            });
    },

    informacoesBasicas: async (req, res) => {
        const user = await usuario.findByPk(req.user.nif, {
            include: [
                'roles'
            ],
            attributes: { exclude: ["senha"] }
        });

        return res.status(200).json(user);
    },

    primeiroAcesso: async (req, res) => {
        const { senha, confirmSenha } = req.body;

        if (senha !== confirmSenha) {
            return res.json({ status: "error", message: "Os campos Nova senha e Confirmar senha não coincidem." })
        }

        const user = await usuario.findByPk(req.user.nif);

        if (user.primeiro_acesso == 0) {
            return res.json({ status: "error", message: "Esse não é seu primeiro acesso!" });
        }

        await bcrypt.hash(confirmSenha, config.jwt.saltRounds, async function (err, hash) {
            if (err) throw (err);

            await user.update({ senha: hash, primeiro_acesso: 0, ativado: 1 });

            return res.json({ status: "ok", message: "Senha atualizada com sucesso!" })

        })
    },

    //Altera 
    alterarMeuUsuario: async (req, res) => {
        var user = await usuario.findByPk(req.user.nif)

        let { nome, telefone, email, image } = req.body;

        if (req.file) {
            if (user.imagem !== config.adminAccount.defaultImage) {
                await unlink(user.imagem, (err) => {
                    if (err) throw err;
                    console.log(`successfully deleted ${user.imagem}`);
                });
            }
            image = req.file.path;
        }

        await user.update({ nome, telefone, email, imagem: image });

        return res.json({ status: "ok", message: `Sua conta foi atualizada com sucesso!!` });
    },

    alterarSenha: async (req, res) => {
        const { senhaAntiga, senhaNova, confirmSenhaNova } = req.body;

        if (senhaNova !== confirmSenhaNova) {
            return res.json({ status: "error", message: "Os campos Nova senha e Confirmar senha não coincidem." })
        }

        await usuario.findOne({
            where: {
                nif: req.user.nif
            },
        }).then(user => {
            bcrypt.compare(senhaAntiga, user.senha).then((match) => {
                if (!match) return res.json({ status: "error", message: "A senha inserida no campo Senha antiga está incorreta." });

                bcrypt.hash(senhaNova, config.jwt.saltRounds, function (err, hash) {
                    if (err) throw (err);
                    usuario.update({ senha: hash }, { where: { nif: req.user.nif } });
                    return res.status(200).json({ status: "ok", message: "Sua senha foi atualizada com sucesso!" });
                });
            });
        });
    },

    //Usuário pode excluir a própria conta (exclui pelo nif do usuário logado)
    desativarMeuUsuario: async (req, res) => {
        const user = await usuario.findByPk(req.user.nif, {
            where: {
                ativado: 1
            }
        });

        if (user == null) {
            return res.status(404).json({ status: 'error', message: "Não há nenhum usuário (ativado) com esse NIF" })
        }

        await user.update({ ativado: 0 })

        return res.json({ status: 'ok', message: `Sua conta foi desativada com sucesso!` })
    },


    //Gerentes --- (ADMIN)

    //Registrar usuário
    adicionarUsuario: (req, res) => {
        let { nif, nome, telefone, depto, email, cfp, admin } = req.body;

        // Imagem padrão caso não seja inserida nenhuma imagem.
        var image = config.adminAccount.defaultImage;

        //Senha padrão
        const senha = "senai115";

        if (req.file) {
            image = req.file.path;
        }

        //Regra de negócio para Controle de Usuário -> Se Input de Roles for 1 (usuário for ADM)
        //Ele faz a busca de admin na tabela roles, e registra o id de Admin no usuário a ser criado 
        //na tabela user_roles
        if (admin == 1) {
            admin = ["admin"]
        }
        else {
            admin = ["user"]
        }

        bcrypt.hash(senha, config.jwt.saltRounds, function (err, hash) {
            if (err) throw (err);
            service.addUser({ nif, hash, nome, telefone, depto, email, cfp, image }).then(user => {
                if (admin) {
                    service.getDescRoles(admin)
                        .then(roles => {
                            service.setRoles(user, roles)
                        });
                }
                else {
                    service.setRoles([1])
                }
                return res.status(200).json({ status: "ok", message: `Usuário com nif ${user.nif} criado com sucesso!` });
            })
                .catch(err => {
                    res.status(500).json({ message: err.message });
                });
        })
    },

    buscarTodos: async (req,res) => {
        const { enabled } = req.params;

        let usuarios = await service.findAllUsers(enabled);
        return res.json(usuarios);
    },

    buscarPorNome: async (req, res) => {
        // const query = `%${req.query.search}`;
        let users = await service.findAllByName(req.params.user);
        return res.json(users)
    },

    buscarPorNif: async (req, res) => {
        const user = await service.findUserbyPk(req.params.nif, {attributes: null})

        if (user == null) {
            return res.status(404).json({ status: 'error', message: "Não Há nenhum usuário ativado com esse NIF" })
        }

        return res.json(user)
    },

    alterarPorNif: async (req, res) => {
        const user = await service.findUserbyPk(req.params.nif, {attributes: null})

        if (user == null) {
            return res.status(404).json({ status: 'error', message: "Não Há nenhum usuário com esse NIF" })
        }

        let { nif, nome, senha, telefone, depto, email, cfp, admin } = req.body;

        if (admin) {

            if (admin == 1) {
                admin = ["admin"]
            }
            else {
                admin = ["user"]
            }

            const roles = await service.getDescRoles(admin)
            await service.setRoles(user, roles);
        }   

        if (req.file) {
            if (user.imagem !== config.adminAccount.defaultImage) {
                await unlink(user.imagem, (err) => {
                    if (err) throw err;
                    console.log(`successfully deleted ${user.imagem}`);
                });
            }
            var image = req.file.path;
        }

        bcrypt.hash(senha, config.jwt.saltRounds, async function (err, hash) {
            if (err) throw (err);
            await service.updateUser({user: user, param: { nif, nome, senha: hash, telefone, id_depto: depto, email, cfp, imagem: image }});

            return res.status(200).json({ status: 'ok', message: `Conta com NIF ${req.params.nif} atualizada com sucesso!!` });
        });
    },  

    enableOrDisableAccount: async (req, res) => {
        const { nif, enable } = req.params

        const user = await service.findUserbyPk(nif, {attributes: null})

        if (user == null) {
            return res.status(404).json({ status: 'error', message: "Usuário não encontrado!" })
        }

        await service.updateUser({user: user, param: { ativado: enable }})

        return res.json({ status: 'ok', message: `Status do Usuário ${user.nif} atualizado com sucesso!` })
    },

    excluirPorNif: async (req, res) => {
        const user = await usuario.findByPk(req.params.nif, {
            where: {
                ativado: 0
            }
        })

        if (user == null) {
            return res.status(404).json({ status: 'error', message: "Não há nenhum usuário (desativado) com esse NIF" })
        }

        await usuario.sequelize.query("SET FOREIGN_KEY_CHECKS=0;")
        await user.destroy();

        if (user.imagem !== config.adminAccount.defaultImage) {
            await unlink(user.imagem, (err) => {
                if (err) throw err;
                console.log(`successfully deleted ${user.imagem}`);
            });
        }

        return res.status(200).json({ status: 'ok', message: `Conta com NIF ${req.params.nif} excluida com sucesso!!` });
    }
}