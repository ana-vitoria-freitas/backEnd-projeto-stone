class UsuariosModel {
    constructor(nome, email, senha, telefone, status) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
        this.status = status;
    }
}

// status Ativo e Inativo;
// nome da tabela usuarios;

module.exports = UsuariosModel;