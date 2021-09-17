const UsuarioService = require("../services/usuario-service")
const { usuario } = require("../models");
class UsuarioController {

    constructor() {
        this.usuarioService = new UsuarioService();
    }


    adicionar(usuario) {

    }
    alterar(usuario) {

    }
    excluir(usuario) {

    }

    async buscarTodos(req, res) {
        let usuarios = await usuario.findAll()
        console.log(usuarios)
        res.json(usuarios)
    }
}

module.exports = UsuarioController;