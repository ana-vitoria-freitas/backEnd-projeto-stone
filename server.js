const fastify = require('fastify')({ logger: true })

/*Importando as rotas de outros arquivos*/
const route = require('./src/Routes/teste');

/*Registrando as rotas importadas de outras pastas e arquivos*/
fastify.register(route)

async function start() {
    try {
        await fastify.listen(process.env.PORT || 3000, process.env.HOST || '::');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

/*Subindo o servidor*/
start();