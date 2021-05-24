const proConfig = require('../Infra/configDB');
const Pool = require("pg").Pool;
const pool = new Pool(proConfig);
const UsuarioModel = require('../Models/usuarios-model');
const bcrypt = require('bcrypt');
async function rotaUsuarios(fastify, options) {
    fastify.get('/usuarios', /*{preValidation: [fastify.autenticacao]} ,*/async (request, reply) => {
        try {
            const response = await pool.query('SELECT * FROM usuarios');
            reply.status(200).send(response.rows)
        } catch (err) {
            throw new Error(err)
        }
    });

    fastify.post('/usuarios/insereUsuario', async (request, reply) =>{
        const usuario = new UsuarioModel(request.body.nome, request.body.cpf, request.body.email, request.body.senha, request.body.telefone);
        try {
            await pool.query(`INSERT INTO usuarios (nome, cpf, email, senha, telefone, status) values ('${usuario.nome}','${usuario.cpf}' ,'${usuario.email}', '${bcrypt.hashSync(usuario.senha, 10)}', '${usuario.telefone}', 'ATIVO')`);
            reply.status(200).send(`{"mensagem": "Usuário adicionado com sucesso!"}`);
        }catch (err) {
            throw new Error(err);
        }
    })

    fastify.post('/usuarios/verificaUsuario', async (request, reply) =>{
        try {
            const response = await pool.query(`SELECT * FROM usuarios where email='${request.body.email}'`);
            if(response.rows.length){
                //const {email, senha} = request.body;
                if (bcrypt.compareSync(request.body.senha, response.rows[0].senha)){
                    //const token = fastify.jwt.sign({email, senha}, {expiresIn: 3600});
                    reply.status(200).send({"mensagem": "Usuário com credenciais válidas"}/*, token: token}*/);
                }else{
                    reply.status(401).send({mensagem: "Credenciais inválidas"})
                }
            }else{
                reply.status(404).send(`{"mensagem": "Usuário não encontrado"}`);
            }
        }catch (err) {
            throw new Error(err);
        }
    })

    fastify.patch('/usuarios/atualizaTelefone/:id',async (request, reply) =>{
        try{
            const response = await pool.query(`SELECT * FROM usuarios where id=${request.params.id}`);
            if(response.rows.length){
                await pool.query(`UPDATE usuarios SET telefone=${request.body.telefone} where id=${response.rows[0].id}`);
                reply.status(200).send(`{"mensagem": "Usuário encontrado e atualizado"}`);
            }else{
                reply.status(404).send(`{"mensagem": "Usuário inexistente"}`);
            }
        }catch (err) {
            throw new Error("Usuário inexistente");
        }
    });

    fastify.patch('/usuarios/atualizaSenha/:id', async (request, reply) =>{
        try {
            const response = await pool.query(`SELECT * FROM usuarios where id=${request.params.id}`);
            if(response.rows.length){
                if (request.body.senha == request.body.digiteNovamente){
                    await pool.query(`UPDATE usuarios SET senha='${bcrypt.hashSync(request.body.senha, 10)}' WHERE id=${request.params.id}`);
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

    fastify.patch('/usuarios/atualizaStatus/:id', async (request, reply) =>{
        try{
            console.log(request.params);
            const response = await pool.query(`SELECT * FROM usuarios where id=${request.params.id}`);
            if(response.rows.length){
                await pool.query(`UPDATE usuarios SET status='INATIVO' where id=${response.rows[0].id}`);
                reply.status(200).send(`{"mensagem": "Usuário encontrado e com status inativo"}`);
            }else{
                reply.status(404).send(`{"mensagem": "Usuário inexistente"}`);
            }
        }catch (err) {
            throw new Error(err);
        }
    });




}
module.exports = rotaUsuarios;