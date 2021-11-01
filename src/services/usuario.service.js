//Biblioteca do sequelize 
const Sequelize = require("sequelize");
const { QueryTypes } = require('sequelize');
//Operadores do sequelize
const Op = Sequelize.Op;

//Inicializando as models e as recebendo
const { initModels } = require("../models/init-models")
var { usuario, tipo_usuario } = initModels(sequelize)

//Funções do usuário 
module.exports = {

    //Registrar usuário
    addUser: (nif, nome, telefone, depto, email, cfp, hash) => {
        usuario.create({
            nif: nif, senha: hash, nome: nome, telefone: telefone,
            id_depto: depto, email: email, cfp: cfp, imagem: image,
        })
    },

    findAllUsers: async (param) => {
        var usuarios = await usuario.findAll({
            where: {
                ativado: param
            },
            include: [
                'roles'
            ],
        });

        return usuarios
    },

    findUserbyPk: async (nif, {attributes}) => {
        const user = await usuario.findByPk(nif, {
            include: [
                'roles'
            ],
            attributes: attributes
        });
        return user;
    },

    findOneByEmail: async (param) => {
        usuario.findOne({
            where: {
                email: param
            }
        })
    },

    findAllByName: async (user) => {
        let usuarios = await usuario.findAll({
            where: {
                nome: {
                    [Op.like]: `${user}%`
                },
            },
            include: [
                'roles'
            ],
            attributes: { exclude: ["senha"] },
        })

        return usuarios;
    },

    updateUser: ({ user, param }) => { user.update(param) },

    destroyUser: (user) => {
        usuario.sequelize.query("SET FOREIGN_KEY_CHECKS=0;")
        user.destroy();
    },

    getRoles: async (user, admin) => {
        const roles = await user.getRoles({
            where: {
                descricao: admin
            }
        })
        return roles;
    },

    getDescRoles: async (admin) => {
        const roles = await tipo_usuario.findAll({
            where: {
                descricao: {
                    [Op.or]: admin
                }
            }
        })

        return roles;
    },


    setRoles: async (user, roles) => {
        await user.setRoles(roles);
    },
}