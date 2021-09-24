const db = require("../models");
const config = require("../config/auth.config");

const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

var { sign } = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const saltRounds = 10;

exports.signup = (req, res) => {
    let { nif, senha, nome, telefone, depto, tipo_usuario, email, cfp, imagem } = req.body;
    
    //Imagem padrão caso não seja inserida nenhuma imagem.
    imagem = 'uploads/user-img/default/usuario.png';
    
    // if (req.file == undefined) {
    //     return res.send("Você precisa selecionar um arquivo.");
    // }
    if(req.file){
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
                res.status(200).json({ message: "Usuário criado com sucesso!"});
            })
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

// exports.signin =  (req, res) => {

//      User.findOne({
//         where: {
//             nif: req.body.nif
//         }
//     })
//      .then(user  => {
//             if (!user) {
//                 return res.status(404).send({ message: "User Not found." });
//             }

//             bcrypt.compare(req.body.senha, user.senha).then((match) => {
//             if (!match) {
//                 return res.status(401).send({
//                     accessToken: null,
//                     message: "Invalid Password!"
//                 });
//             }

//             // var passwordIsValid = bcrypt.compare(
//             //     req.body.senha,
//             //     user.senha
//             //   );
        
//             //   if (!passwordIsValid) {
//             //     return res.status(401).send({
//             //       accessToken: null,
//             //       message: "Invalid Password!"
//             //     });
//             //   }

//             var token = jwt.sign({ nif: user.nif, email: user.email, nome: user.nome }, config.secret, {
//                 expiresIn: 86400 // 24 hours
//             });

//             var authorities = [];
//             user.getRoles().then(roles => {
//                 for (let i = 0; i < roles.length; i++) {
//                     authorities.push("ROLE_" + roles[i].name.toUpperCase());
//                 }
//                 res.status(200).send({
//                     id: user.nif,
//                     nome: user.nome,
//                     email: user.email,
//                     roles: authorities,
//                     accessToken: token
//                 });
//             });
//         })
//     })
//         .catch(err => {
//             res.status(500).send({ message: err.message });
//         });
// };


exports.signin = async (req, res) => {
    let {nif, senha} = req.body;

     var user = await User.findOne({ where: { nif : nif } });
     
     if (!user) return res.json({ error: "User Doesn't Exist" });
     
     bcrypt.compare(senha, user.senha).then(async (match) => {
       if (!match) return res.json({ error: "Wrong Username And Password Combination" });
   
       const accessToken = await sign(
         { nif: user.nif, email: user.email, nome: user.nome },
         config.secret
       );
       
       return res.json({ token: accessToken, nif: nif, email: user.email, nome: user.nome });
     });
 }
