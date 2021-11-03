//Biblioteca do sequelize 
const Sequelize = require("sequelize");
const { ROLES } = require("../models");
//Operadores do sequelize
const Op = Sequelize.Op;

//Inicializando as models e as recebendo
const { initModels } = require("../models/init-models")
var { usuario, tipo_usuario } = initModels(sequelize)

//Funções do usuário 
module.exports = {

    //Registrar usuário
    addUser: async ({ nif, hash, nome, telefone, depto, email, cfp, image }) => {
        const user = await usuario.create({
            nif, senha: hash, nome, telefone,
            id_depto: depto, email, cfp, imagem: image,
        });

        return user;
    },

    findAllUsers: async (param) => {
        const usuarios = await usuario.findAll({
            where: {
                ativado: param
            },
            include: [
                'roles'
            ],
               
        });

        return usuarios;
    },

    findUserbyPk: async (nif, { attributes }) => {
        const user = await usuario.findByPk(nif, {
            include: [
                'roles'
            ],
            attributes: attributes,
        });

        return user;
    },

    findOneByEmail: async (param) => {
        const user = await usuario.findOne({
            where: {
                email: param
            }
        });

        return user;
    },

    findAllByName: async (user) => {
        const usuarios = await usuario.findAll({
            where: {
                nome: {
                    [Op.like]: `${user}%`
                },
            },
            include: [
                'roles'
            ],
            attributes: { exclude: ["senha"] },
        });

        return usuarios;
    },

    updateUser: async ({ user, param }) => {
        const updated = await user.update(param);

        return updated;
    },

    destroyUser: async (user) => {
        await usuario.sequelize.query("SET FOREIGN_KEY_CHECKS=0;");
        const deleted = await user.destroy();

        return deleted;
    },

    getRoles: async (user) => {
        const roles = await user.getRoles();

        return roles;
    },

    getDescRoles: async (admin) => {
        const roles = await tipo_usuario.findAll({
            where: {
                descricao: {
                    [Op.or]: admin
                }
            }
        });

        return roles;
    },


    setRoles: async (user, roles) => {
        var userRoles = await user.setRoles(roles);

        return userRoles;
    },
}