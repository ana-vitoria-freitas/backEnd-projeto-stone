const proConfig = require('../Infra/configDB');
const Pool = require("pg").Pool;
const pool = new Pool(proConfig);
const ProdutoModel = require('../Models/produtos-model');


async function rotaProdutos(fastify, options) {
    fastify.get('/produtos', async(request, reply) =>{
        try{
            const response = await pool.query('SELECT * FROM produtos WHERE quantidade=0');
            for(let i = 0; i < response.rows.length; i++){
                await pool.query(`UPDATE produtos SET status='SEM ESTOQUE' WHERE id=${response.rows[i].id}`);
            }
            const res = await pool.query(`SELECT * FROM produtos`);
            reply.status(200).send(res.rows);
        }catch (err){
            throw new Error(err);
        }
    });

    fastify.get('/produtos/maiorPreco', async(request, reply) =>{
        try{
            const response = await pool.query(`SELECT id as id_produto, titulo as titulo_produto, preco_un as preco_produto FROM produtos ORDER BY preco_un DESC`);
            reply.status(200).send(response.rows);
        }catch(err){
            throw new Error(err);
        }
    });

    fastify.get('/produtos/menorPreco', async(request, reply) =>{
        try{
            const response = await pool.query(`SELECT id as id_produto, titulo as titulo_produto, preco_un as preco_produto FROM produtos ORDER BY preco_un ASC`);
            reply.status(200).send(response.rows);
        }catch(err){
            throw new Error(err);
        }
    });

    fastify.post('/produtos/insereProduto', async(request, reply) =>{
        const produto = new ProdutoModel(request.body.titulo, request.body.link_img, request.body.descricao, request.body.preco_un, request.body.quantidade, request.body.categoria, request.body.id_usuario);
        try{
            const response = await pool.query(`INSERT INTO produtos (titulo, link_img, descricao, preco_un, quantidade, categoria, id_usuario, status) values ('${produto.titulo}', '${produto.link_img}', '${produto.descricao}', '${produto.preco_un}', '${produto.quantidade}', '${produto.categoria}', '${produto.id_usuario}', 'EM ESTOQUE')`);
            reply.status(200).send(`{"mensagem": "Produto inserido com sucesso!"}`);
        }catch(err){
            throw new Error(err);
        }
    });

    fastify.patch('/produtos/inativaProduto/:idProduto', async(request, reply) =>{
        try{
            const response = await pool.query(`UPDATE produtos SET status='INATIVO' WHERE id=${request.params.idProduto}`);
            reply.status(200).send(`{"mensagem": "Produto desativado"}`);
        }catch (err) {
            throw new Error(err);
        }
    });

    fastify.patch('/produtos/atualizaImagem/:idProduto', async(request, reply) =>{
        try{
            const response = await pool.query(`UPDATE produtos SET link_img='${request.body.novo_link_img} WHERE id=${request.params.idProduto}'`);
            reply.status(200).send(`{"mensagem": "Foto atualizada com sucesso"}`);
        }catch (err){
            throw new Error(err);
        }
    });

    fastify.patch('/produtos/atualizaPreco/:idProduto', async(request, reply) =>{
        try{
            const response = await pool.query(`UPDATE produtos SET preco_un=${request.body.novo_preco_un} WHERE id=${request.params.idProduto}`);
            reply.status(200).send(`{"mensagem": "Preço atualizado com sucesso"}`);
        }catch (err){
            throw new Error(err);
        }
    });

    fastify.patch('/produtos/atualizaQuantidade/:idProduto', async(request, reply) =>{
        try{
            const response = await pool.query(`UPDATE produtos SET quantidade=${request.body.nova_quantidade} WHERE id=${request.params.idProduto}`);
            reply.status(200).send(`{"mensagem": "Preço atualizado com sucesso"}`);
        }catch (err){
            throw new Error(err);
        }
    });


}

module.exports = rotaProdutos;