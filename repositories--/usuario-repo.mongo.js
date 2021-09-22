const { Usuario } = require("../models");

class UsuarioRepositoryMongo {

    constructor() {
        this.model = Usuario
    }

    adicionar(usuario) {
        this.model.create(usuario, (err,suc) => {
            if (err) return handleError(err);
            console.log("Usuário Salvo com Sucesso!")
        })
    }

    excluir(nif){
        
    }

    alterar(usuario){
    }

    buscarTodos(){
        return this.model.findAll()
    }
}

module.exports = UsuarioRepositoryMongo;