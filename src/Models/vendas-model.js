class VendasModel {

    setIdProduto(idProduto){
        this.id_produto = idProduto;
    }

    setDataCriacao(dataCriacao){
        this.data_criacao = dataCriacao;
    }

    setPreco(preco){
        this.preco = preco;
    }

    setQuantidade(quantidade){
        this.quantidade = quantidade;
    }


    setFrete(frete){
        this.frete = frete;
    }

    setIdCliente(idCliente){
        this.id_cliente = idCliente;
    }

    setIdUsuario(idUsuario){
        this.id_usuario = idUsuario;
    }

    getIdProduto(){
        return this.id_produto;
    }

    getDataCriacao(){
        return this.data_criacao;
    }

    getPreco(){
        return this.preco;
    }

    getQuantidade(){
        return this.quantidade;
    }

    getFrete(){
        return this.frete;
    }

    getIdCliente(){
        return this.id_cliente;
    }

    getIdUsuario(){
        return this.id_usuario;
    }





}

module.exports = VendasModel;