const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const saltRounds = 10;

const db = require("../models");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

exports.signup = (req, res) => {
    let { nif, senha, nome, telefone, depto, tipo_usuario, email, cfp, imagem } = req.body;
    
    //Imagem padrão caso não seja inserida nenhuma imagem.
    imagem = 'uploads/user-img/default/usuario.png';
    
    if (req.file == undefined) {
        return res.send("Você precisa selecionar um arquivo.");
    }
    else{
        imagem = req.file.path;
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
    
    // Save User to Database
    bcrypt.hash(senha, saltRounds).then((hash) => {
        User.create({
            nif: nif,
            senha: hash,
            nome: nome,
            telefone: telefone,
            id_depto: depto,
            id_tipo_usuario: tipo_usuario,
            email: email,
            cfp: cfp,
            imagem: imagem
        })
        res.status(200).json({ message: "Usuário criado com sucesso!" });
    })
        .then(user => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(() => {
                        res.send({ message: "User was registered successfully!" });
                    });
                });
            } else {
                // user role = 1
                user.setRoles([1]).then(() => {
                    res.send({ message: "User was registered successfully!" });
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            usuario: req.body.username
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.nif }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            var authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }
                res.status(200).send({
                    id: user.nif,
                    username: user.usuario,
                    email: user.email,
                    roles: authorities,
                    accessToken: token
                });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};