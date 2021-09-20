const UsuarioRepoArray = require("../repositories/usuario-repo-array");
const UsuarioRepoMaria = require("../repositories/usuario-repo-mariadb");
// const UsuarioRepoMongo = require("../repositories/usuario-repo-mongo");

class UsuarioService {
    constructor(){
        this.usuarioRepository = new UsuarioRepoMaria();
    }

    adicionar(usuario){
        this.usuarioRepository.adicionar(usuario);
    }

    excluir(nif){
        this.usuarioRepository.excluir(nif);
    }

    alterar(usuario){
        this.usuarioRepository.alterar(usuario)
    }

    buscarTodos(){
        return this.usuarios;
    }
}

module.exports = UsuarioService;