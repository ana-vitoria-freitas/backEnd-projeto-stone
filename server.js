const fastify = require('fastify')({ logger: true })

/*Importando as rotas de outros arquivos*/
const rotaInicial = require('./src/Routes/teste');
const rotaUsuarios = require('./src/Routes/usuarios');


/*Registrando as rotas importadas de outras pastas e arquivos*/
fastify.register(rotaInicial);
fastify.register(rotaUsuarios);

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