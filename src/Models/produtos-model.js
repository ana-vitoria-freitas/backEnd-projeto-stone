class ProdutoModel{
    constructor(titulo, link_img, descricao, preco_un, quantidade, categoria, id_usuario){
        this.titulo = titulo;
        this.link_img = link_img;
        this.descricao = descricao;
        this.preco_un = preco_un;
        this.quantidade = quantidade;
        this.categoria = categoria;
        this.id_usuario = id_usuario;
    }
}



module.exports = ProdutoModel;