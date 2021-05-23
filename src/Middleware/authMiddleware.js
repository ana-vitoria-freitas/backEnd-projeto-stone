const fastifyPlugin = require('fastify-plugin');
module.exports = fastifyPlugin(async(fastify) =>{
    fastify.decorate("autenticacao", async(req, res) =>{
        try{
            await req.jwtVerify();
        }catch(err){
            throw new Error(err);
        }
    })
});