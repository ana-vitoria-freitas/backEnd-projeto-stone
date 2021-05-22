class VendasModel {
    constructor(id_produto, data_criacao, preco, quantidade, frete, id_cliente, id_usuario, status) {
        this.id_produto = id_produto;
        this.data_criacao = data_criacao;
        this.preco = preco;
        this.quantidade = quantidade;
        this.frete = frete;
        this.id_cliente = id_cliente;
        this.id_usuario = id_usuario;
        this.status = status;
    }
}

module.exports = VendasModel;