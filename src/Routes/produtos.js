const proConfig = require('../Infra/configDB');
const Pool = require("pg").Pool;
const pool = new Pool(proConfig);
const ProdutoModel = require('../Models/produtos-model');


async function rotaProdutos(fastify, options) {
    fastify.get('/produtos', {preValidation: [fastify.autenticacao]},async(request, reply) =>{
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

    fastify.get('/produtos/maiorPreco/:idUsuario', {preValidation: [fastify.autenticacao]}, async(request, reply) =>{
        try{
            const response = await pool.query(`SELECT id as id_produto, titulo as titulo_produto, preco_un as preco_produto FROM produtos ORDER BY preco_un DESC WHERE id_usuario=${request.params.idUsuario}`);
            reply.status(200).send(response.rows);
        }catch(err){
            throw new Error(err);
        }
    });

    fastify.get('/produtos/menorPreco/:idUsuario', {preValidation: [fastify.autenticacao]},async(request, reply) =>{
        try{
            const response = await pool.query(`SELECT id as id_produto, titulo as titulo_produto, preco_un as preco_produto FROM produtos ORDER BY preco_un ASC WHERE id_usuario=${request.params.idUsuario}`);
            reply.status(200).send(response.rows);
        }catch(err){
            throw new Error(err);
        }
    });

    fastify.post('/produtos', {preValidation: [fastify.autenticacao]},async(request, reply) =>{
        const produto = new ProdutoModel(request.body.titulo, request.body.link_img, request.body.descricao, request.body.preco_un, request.body.quantidade, request.body.categoria, request.body.id_usuario);
        try{
            const response = await pool.query(`INSERT INTO produtos (titulo, link_img, descricao, preco_un, quantidade, categoria, id_usuario, status) values ('${produto.titulo}', '${produto.link_img}', '${produto.descricao}', '${produto.preco_un}', '${produto.quantidade}', '${produto.categoria}', '${produto.id_usuario}', 'EM ESTOQUE')`);
            reply.status(200).send(`{"mensagem": "Produto inserido com sucesso!"}`);
        }catch(err){
            throw new Error(err);
        }
    });

    fastify.patch('/produtos/status/:id/:status', {preValidation: [fastify.autenticacao]},async(request, reply) =>{
        try{
            const response = await pool.query(`UPDATE produtos SET status='${request.params.status}' WHERE id=${request.params.id}`);
            reply.status(200).send(`{"mensagem": "Produto desativado"}`);
        }catch (err) {
            throw new Error(err);
        }
    });

    fastify.patch('/produtos/link_img/:id/:link_img', {preValidation: [fastify.autenticacao]},async(request, reply) =>{
        try{
            const response = await pool.query(`UPDATE produtos SET link_img='${request.params.link_img} WHERE id=${request.params.id}'`);
            reply.status(200).send(`{"mensagem": "Foto atualizada com sucesso"}`);
        }catch (err){
            throw new Error(err);
        }
    });

    fastify.patch('/produtos/preco_un/:id/:preco_un', {preValidation: [fastify.autenticacao]},async(request, reply) =>{
        try{
            const response = await pool.query(`UPDATE produtos SET preco_un=${request.params.preco_un} WHERE id=${request.params.id}`);
            reply.status(200).send(`{"mensagem": "Preço atualizado com sucesso"}`);
        }catch (err){
            throw new Error(err);
        }
    });

    fastify.patch('/produtos/quantidade/:id/:quantidade', {preValidation: [fastify.autenticacao]},async(request, reply) =>{
        try{
            const response = await pool.query(`UPDATE produtos SET quantidade=${request.params.quantidade} WHERE id=${request.params.id}`);
            reply.status(200).send(`{"mensagem": "Preço atualizado com sucesso"}`);
        }catch (err){
            throw new Error(err);
        }
    });


}

module.exports = rotaProdutos;