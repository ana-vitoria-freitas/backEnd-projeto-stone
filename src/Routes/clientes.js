const proConfig = require('../Infra/configDB');
const Pool = require("pg").Pool;
const pool = new Pool(proConfig);
const ClienteModel = require('../Models/clientes-model');
const bcrypt = require('bcrypt');

async function rotaClientes(fastify, options) {
    fastify.get('/clientes', async(request, reply) => {
        try {
            const response = await pool.query('SELECT * FROM clientes');
            reply.status(200).send(response.rows);
        } catch (err) {
            throw new Error(err);
        }
    });

    fastify.post('/clientes/insereCliente', async(request, reply) => {
        const fetch = require('node-fetch');
        const cliente = new ClienteModel(request.body.nome, request.body.email, request.body.senha, request.body.telefone, request.body.cep, request.body.numero_rua, request.body.complemento);
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

            const response = await pool.query(`INSERT INTO clientes (nome, email, senha, telefone, logradouro, numero_rua,complemento, bairro, cidade, sigla_estado, cep, status) ` +
            `values ('${cliente.nome}', '${cliente.email}', '${bcrypt.hashSync(cliente.senha, 10)}', '${cliente.telefone}', '${cliente.logradouro}', '${cliente.numero_rua}', '${cliente.complemento}', '${cliente.bairro}', '${cliente.cidade}', '${cliente.siglaEstado}', '${cliente.cep}', 'ATIVO')`);
            reply.status(200).send(`{"mensagem": "Cliente inserido com sucesso"}`);
        } catch (err) {
            throw new Error(err);
        }
    });
}

module.exports = rotaClientes;