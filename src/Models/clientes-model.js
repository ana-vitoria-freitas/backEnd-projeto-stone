class ClientesModel {
    constructor(nome, email, senha, telefone,logradouro, numero_rua, complemento, bairro, cidade, estado, cep, status) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
        this.logradouro = logradouro;
        this.numero_rua = numero_rua;
        this.complemento = complemento;
        this.bairro =bairro;
        this.cidade = cidade;
        this.estado = estado;
        this.cep = cep;
        this.status = status;
    }
}


module.exports = ClientesModel;