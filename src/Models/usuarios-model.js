class UsuariosModel {
    constructor(nome, email, senha, telefone, status) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
        this.status = status;
    }

    hashPassword(){
        const bcrypt = require('bcrypt');
        const hash = bcrypt.hashSync(this.senha, 10);
        this.senha = hash;
    }
}

module.exports = UsuariosModel;