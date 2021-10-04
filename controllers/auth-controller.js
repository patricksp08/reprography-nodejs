'use strict'
//Arquivo de config
const config = require("../config/auth.config.json");
//Biblioteca do sequelize 
const Sequelize = require("sequelize");
//Operadores do sequelize
const Op = Sequelize.Op;

////Inicializando as models e recebendo nas configurando
const { initModels } = require("../models/init-models")
var { usuario, tipo_usuario } = initModels(sequelize)

//Usado para criptografar as senhas no banco
const bcrypt = require("bcrypt");

//Usado para enviar o token e informações do usuário pro front quando ele Logar
const { sign } = require("jsonwebtoken");

module.exports = {
    //Registrar usuário
    signup: (req, res) => {
        let { nif, senha, nome, telefone, depto, email, cfp, imagem, roles } = req.body;

        //Imagem padrão caso não seja inserida nenhuma imagem.
        imagem = 'uploads/user-img/default/usuario.png';

        // if (req.file == undefined) {
        //     return res.send("Você precisa selecionar um arquivo.");
        // }

        if (req.file) {
            imagem = req.file.path;
        }

        //Regra de negócio para Controle de Usuário -> Se Input de Roles for 1 (usuário for ADM)
        //Ele faz a busca de admin na tabela roles, e registra o id de Admin no usuário a ser criado 
        //na tabela user_roles
        if (roles == 1) {
            roles = ["admin"]
        }
        else {
            roles = ["user"]
        }

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

        // if (select === "Escolha um departamento") {
        // 	select = "Nenhum"
        // }
        bcrypt.hash(senha, config.saltRounds, function (err, hash) {
            if (err) throw (err);
            usuario.create({
                nif: nif,
                senha: hash,
                nome: nome,
                telefone: telefone,
                id_depto: depto,
                email: email,
                cfp: cfp,
                imagem: imagem
            })
                .then(user => {
                    if (roles) {
                        tipo_usuario.findAll({
                            where: {
                                descricao: {
                                    [Op.or]: roles
                                }
                            }
                        })
                            .then(roles => {
                                user.setRoles(roles)
                                // .then(roles => {
                                // res.status(200).send("User was registered successfully!");
                                // });

                            });
                    }
                    else {
                        // user role = 1
                        user.setRoles([1])
                        // .then(roles => {
                        // res.status(200).send({ message: "User was registered successfully!" });
                        // });
                    }
                    res.status(200).json({ message: "Usuário criado com sucesso!" });
                })
                .catch(err => {
                    res.status(500).json({ message: err.message });
                });
        })
    },

    //Logar
    signin: (req, res) => {

        const { email, senha } = req.body;

        usuario.findOne({
            where: {
                email: email
            },
        })
            .then(user => {
                if (!user) {
                    return res.json({ status: 'error', error: "E-mail não encontrado." })
                };
                console.log(user)

                bcrypt.compare(senha, user.senha).then((match) => {
                    if (!match) {
                        return res.json({
                            accessToken: null,
                            error: "Senha Invalida!"
                        });
                    };

                    var token = sign({ nif: user.nif, email: user.email, nome: user.nome }, config.secret, {
                        expiresIn: 86400 // 24 hours
                    });

                    var authorities = [];
                    user.getRoles().then(roles => {
                        for (let i = 0; i < roles.length; i++) {
                            authorities.push(roles[i].id + "_ROLE_" + roles[i].descricao.toUpperCase());
                        }
                        res.status(200).json({
                            nif: user.nif,
                            nome: user.nome,
                            email: user.email,
                            roles: authorities,
                            accessToken: token
                        });
                    });
                });
            })
            .catch(err => {
                res.status(500).json({ message: err.message });
            });
    },
};