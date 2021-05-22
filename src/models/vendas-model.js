class VendasModel {
    constructor(id_produto, data, preco, quantidade, frete, id_cliente, id_usuario, status) {
        this.id_produto = id_produto;
        this.data = data;
        this.preco = preco;
        this.quantidade = quantidade;
        this.frete = frete;
        this.id_cliente = id_cliente;
        this.id_usuario = id_usuario;
        this.status = status;
    }
}
// status Pendente, Aprovado, Enviado, Cancelado
// nome tabela vendas

module.exports = VendasModel;