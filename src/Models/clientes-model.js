class ClientesModel {

    constructor(nome, telefone, cep, numero_rua,complemento, foto_perfil,id_usuario) {
        this.nome = nome;
        this.telefone = telefone;
        this.cep = cep;
        this.numero_rua = numero_rua;
        this.complemento = complemento;
        this.foto_perfil= foto_perfil;
        this.id_usuario = id_usuario;
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