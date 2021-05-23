class UsuariosModel {
    constructor(nome, cpf, email, senha, telefone, status) {
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
        this.status = status;
    }


}

module.exports = UsuariosModel;