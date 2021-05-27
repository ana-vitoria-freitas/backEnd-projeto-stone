const proConfig = require('../Infra/configDB');
const Pool = require("pg").Pool;
const pool = new Pool(proConfig);
const VendaModel = require('../Models/vendas-model');


async function rotaVendas(fastify, options) {
    fastify.get('/vendas',async(request, reply) =>{
        try{
            const response = await pool.query('SELECT * FROM vendas');
            reply.status(200).send(response.rows);
        }catch (err){
            throw new Error(err);
        }
    });


    fastify.post('/vendas/:idProduto/:idUsuario', {preValidation: [fastify.autenticacao]},async(request, reply) =>{
        const venda = new VendaModel();
        try{
            const response = await pool.query(`SELECT * FROM produtos WHERE id=${request.params.idProduto}`);
            if(response.rows[0].quantidade >= request.body.quantidade){
                await pool.query(`UPDATE produtos SET quantidade=${response.rows[0].quantidade - request.body.quantidade} WHERE id=${request.params.idProduto}`);
                const responseCliente = await pool.query(`SELECT * FROM clientes WHERE id=${request.body.id_cliente}`);
                if(responseCliente.rows[0].sigla_estado == "RJ" && responseCliente.rows[0].cidade == "Rio de Janeiro"){
                    venda.setFrete(10.00);
                }else if(responseCliente.rows[0].sigla_estado == "RJ" && responseCliente.rows[0].cidade != "Rio de Janeiro"){
                    venda.setFrete(20.00);
                }else{
                    venda.setFrete(40.00);
                }
                pool.query(`INSERT INTO vendas (id_produto, data_criacao, preco, quantidade, frete, id_cliente,id_usuario, status)`+
                ` values (${response.rows[0].id},'${new Date()}' ,${request.body.quantidade * response.rows[0].preco_un}, ${request.body.quantidade}, ${venda.getFrete()}, ${request.body.id_cliente}, ${request.params.idUsuario}, 'PENDENTE')`);
                reply.status(200).send(`{"mensagem": "Venda inserida com sucesso"}`);
            }else {
                reply.status(400).send(`{"mensagem": "Operação inválida. Produto sem estoque"}`)
            }
            reply.status(200).send(response.rows);
        }catch (err){
            throw new Error(err);
        }
    });

    fastify.get('/vendas/:idUsuario/:pagina/:vendas_pagina',async (request, reply) =>{
        try{
            const response = await pool.query(`SELECT cli.id as id_cliente, cli.nome as nome_cliente, vend.preco as preco_venda, vend.frete as frete, prod.link_img as foto_produto FROM vendas vend INNER JOIN clientes cli ON cli.id=vend.id_cliente INNER JOIN produtos prod ON prod.id=vend.id_produto WHERE vend.id_usuario=${request.params.idUsuario} LIMIT ${request.params.vendas_pagina} OFFSET ${(request.params.pagina - 1) * request.params.vendas_pagina}`);
            reply.status(200).send(response.rows);
        }catch (err){
            throw new Error(err);
        }
    });

}


module.exports = rotaVendas;