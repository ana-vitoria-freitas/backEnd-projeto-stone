class UsuariosModel {
    constructor(name, email, senha, telefone, status) {
        this.name = name;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
        this.status = status;
    }
}

// status Ativo e Inativo;
// nome da tabela usuarios;

module.exports = UsuariosModel;