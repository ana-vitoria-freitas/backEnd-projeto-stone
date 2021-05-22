const proConfig = require('../Infra/configDB');
const Pool = require("pg").Pool;
const pool = new Pool(proConfig);
async function rotaUsuarios(fastify, options) {
    fastify.get('/usuarios', async (request, reply) => {
        try {
            const response = await pool.query('SELECT * FROM usuarios');
            reply.status(200).send(response.rows)
        } catch (err) {
            throw new Error(err)
        }
    });

    fastify.post('/usuarios/novoUsuario', async (request, reply) =>{
        try {
            await pool.query(`INSERT INTO users (nome, email, senha, telefone) values ('${request.body.name_usuario}')`);
            reply.status(200).send(`{"mensagem": "Usuário adicionado com sucesso!"}`);
        }catch (err) {
            throw new Error(err);
        }
    })

    fastify.patch('/usuarios/atualizar/:name', async (request, reply) =>{
        try{
            console.log(request.params);
            const response = await pool.query(`SELECT * FROM users where UPPER(name_usuario) like UPPER('%${request.params.name}%')`);
            if(response.rows.length){
                reply.status(200).send(`{"mensagem": "Usuário encontrado e atualizado"}`);
            }else{
                reply.status(404).send(`{"mensagem": "Usuário inexistente"}`);
            }
        }catch (err) {
            throw new Error("Usuário inexistente");
        }
    });

}
module.exports = rotaUsuarios;