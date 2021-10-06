const { authJwt } = require("../middlewares");
const controller = require("../controllers/gerente-controller");
const upload = require("../middlewares/upload");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "accessToken, Origin, Content-Type, Accept"
        );
        next();
    });

    //GET
    //Exibe todos os usuários da tabela usuario
    app.get("/users", [authJwt.validateToken, authJwt.isAdmin], controller.buscarTodos);

    //Exibe o usuarío por nome na tabela usuario (exemplo: host:porta/usuariox)
    app.get("/user/:user", [authJwt.validateToken, authJwt.isAdmin], controller.buscarPorNome);

    //Exibe o usuarío por nif na tabela usuario (exemplo: host:porta/33321)
    app.get("/user/nif/:nif", [authJwt.validateToken, authJwt.isAdmin], controller.buscarPorNif);

    //PUT
    //Rota para alterar um usuario da tabela usuario por NIF //Rota para administrador (pode colocar o nif que quiser)
    app.put('/user/:nif', [authJwt.validateToken, authJwt.isAdmin], upload.single('imagem'), controller.alterarPorNif);

    //Delete
    //Rota para deletar um usuario da tabela usuario por NIF //Rota para administrador (pode colocar o nif que quiser)
    app.delete('/user/:nif', [authJwt.validateToken, authJwt.isAdmin], controller.excluirPorNif);
};