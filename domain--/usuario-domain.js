module.exports = class Usuario{
    constructor(nif, senha, nome, telefone, depto, tipo_usuario, email, cfp, imagem){
        
        this.nif = nif;
        this.senha = senha;
        this.nome = nome;
        this.telefone = telefone;
        this.depto = depto;
        this.tipo_usuario = tipo_usuario;
        this.email = email;
        this.cfp = cfp;
        this.imagem = imagem;
        
    }
}