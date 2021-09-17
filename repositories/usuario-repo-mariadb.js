const { Usuario } = require("../models");

class UsuarioRepositoryMariaDb {

    constructor() {
        this.model = Usuario
    }

    adicionar(usuario) {
        Usuario.create(usuario, (err,suc) => {
            if (err) return handleError(err);
            console.log("Usuário Salvo com Sucesso!")
        })
    }
}