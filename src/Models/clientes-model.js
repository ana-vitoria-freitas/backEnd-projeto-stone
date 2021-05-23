class ClientesModel {

    constructor(nome, cpf, email, senha, telefone, cep, numero_rua,complemento) {
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.senha = senha;
        this.telefone = telefone;
        this.cep = cep;
        this.numero_rua = numero_rua;
        this.complemento = complemento;
    }
    setLogradouro(logradouro){
        this.logradouro = logradouro;
    }
    setBairro(bairro){
        this.bairro = bairro;
    }
    setCidade(cidade){
        this.cidade = cidade;
    }
    setSiglaEstado(siglaEstado){
        this.siglaEstado = siglaEstado;
    }
}


module.exports = ClientesModel;