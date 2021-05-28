const proConfig = require('../Infra/configDB');
const Pool = require("pg").Pool;
const pool = new Pool(proConfig);
const ClienteModel = require('../Models/clientes-model');
const bcrypt = require('bcrypt');
const fetch = require('node-fetch');

async function rotaClientes(fastify, options) {
    fastify.get('/clientes', {preValidation: [fastify.autenticacao]}, async(request, reply) => {
        try {
            const response = await pool.query('SELECT * FROM clientes');
            reply.status(200).send(response.rows);
        } catch (err) {
            throw new Error(err);
        }
    });

    fastify.post('/clientes/porUsuario/:idUsuario', {preValidation: [fastify.autenticacao]},async(request, reply) => {
        const cliente = new ClienteModel(request.body.nome, request.body.cpf, request.body.email, request.body.senha, request.body.telefone, request.body.cep, request.body.numero_rua, request.body.complemento, request.params.idUsuario);
        try {
            await fetch(`https://viacep.com.br/ws/${cliente.cep}/json/`)
                .then((response) => response.json())
                .then((data) => {
                    cliente.setLogradouro(data.logradouro);
                    console.log(cliente.logradouro);
                    cliente.setBairro(data.bairro);
                    cliente.setCidade(data.localidade);
                    cliente.setSiglaEstado(data.uf);
                })
                .catch((error) => {
                    reply.status(400).send(`{"mensagem": "Bad request"}`);
                    console.log(error);
                })

            const response = await pool.query(`INSERT INTO clientes (nome, cpf, email, senha, telefone, logradouro, numero_rua,complemento, bairro, cidade, sigla_estado, cep, status, foto_perfil, id_usuario) ` +
            `values ('${cliente.nome}', '${cliente.cpf}', '${cliente.email}', '${bcrypt.hashSync(cliente.senha, 10)}', '${cliente.telefone}', '${cliente.logradouro}', '${cliente.numero_rua}', '${cliente.complemento}', '${cliente.bairro}', '${cliente.cidade}', '${cliente.siglaEstado}', '${cliente.cep}', 'ATIVO', '${cliente.foto_perfil}', ${cliente.id_usuario})`);
            reply.status(200).send(`{"mensagem": "Cliente inserido com sucesso"}`);
        } catch (err) {
            throw new Error(err);
        }
    });

    fastify.post('/clientes/:email', {preValidation: [fastify.autenticacao]},async (request, reply) =>{
        try {
            const response = await pool.query(`SELECT * FROM clientes where email='${request.params.email}'`);
            if(response.rows.length){
                if (bcrypt.compareSync(request.body.senha, response.rows[0].senha)){
                    const token = fastify.jwt.sign({email, password}, {expiresIn: 3600});
                    reply.header('Authorization', `Bearer ${token}`);
                    reply.status(200).send(`{"mensagem": "Usuário com credenciais válidas"}`);
                }else{
                    reply.status(404).send(`{"mensagem": "Senha inválida"}`)
                }
            }else{
                reply.status(404).send(`{"mensagem": "Usuário não encontrado"}`);
            }
        }catch (err) {
            throw new Error(err);
        }
    })

    fastify.patch('/clientes/:id',{preValidation: [fastify.autenticacao]},async (request, reply) =>{
        try {
            const response = await pool.query(`SELECT * FROM clientes where id=${request.params.id}`);
            if(response.rows.length){
                if (request.body.senha == request.body.digiteNovamente){
                    await pool.query(`UPDATE clientes SET senha='${bcrypt.hashSync(request.body.senha, 10)}' WHERE id=${request.params.id}`);
                    reply.status(200).send(`{"mensagem": "Senha atualizada com sucesso"}`);
                }else{
                    reply.status(404).send(`{"mensagem": "As senhas não são iguais"}`)
                }
            }else{
                reply.status(404).send(`{"mensagem": "Usuário não encontrado"}`);
            }
        }catch (err) {
            throw new Error(err);
        }
    });

    fastify.patch('/clientes/cep/:id/:cep', {preValidation: [fastify.autenticacao]},async(request, reply) => {
        const cliente = new ClienteModel(undefined, undefined, undefined, undefined, request.params.cep, request.body.numero_rua, request.body.complemento);
        try{
            const response = await pool.query(`SELECT * FROM clientes where id=${request.params.id}`);
            if(response.rows.length){
                await fetch(`https://viacep.com.br/ws/${cliente.cep}/json/`)
                .then((response) => response.json())
                .then((data) => {
                    cliente.setLogradouro(data.logradouro);
                    cliente.setBairro(data.bairro);
                    cliente.setCidade(data.localidade);
                    cliente.setSiglaEstado(data.uf);
                })
                .catch((error) => {
                    reply.status(400).send(`{"mensagem": "Bad request!"}`);
                    console.log(error);
                })
                const response = await pool.query(`UPDATE clientes SET logradouro='${cliente.logradouro}', numero_rua='${cliente.numero_rua}',complemento='${cliente.complemento}', bairro='${cliente.bairro}', cidade='${cliente.cidade}', sigla_estado='${cliente.siglaEstado}', cep='${cliente.cep}' ` +
                `WHERE id=${request.params.id}`);
                reply.status(200).send(`{"mensagem": "Endereço atualizado com sucesso"}`);

            }
        }catch (err) {
            throw new Error(err);
        }
    });

    fastify.patch('/clientes/status/:id/:status', {preValidation: [fastify.autenticacao]},async (request, reply) =>{
        try{
            console.log(request.params);
            const response = await pool.query(`SELECT * FROM clientes where id=${request.params.id}`);
            if(response.rows.length){
                await pool.query(`UPDATE usuarios SET status='${request.params.status}' where id=${response.rows[0].id}`);
                reply.status(200).send(`{"mensagem": "Cliente encontrado e com status inativo"}`);
            }else{
                reply.status(404).send(`{"mensagem": "Cliente inexistente"}`);
            }
        }catch (err) {
            throw new Error(err);
        }
    });
}

module.exports = rotaClientes;