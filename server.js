const fastify = require('fastify')({ logger: true })
fastify.register(require('fastify-jwt'), {
  secret: "test@#$%$"
})
fastify.register(require('fastify-cors'), {
  origin: "*"
});

fastify.register(require('./src/Middleware/authMiddleware'));


/*Importando as rotas de outros arquivos*/
const rotaInicial = require('./src/Routes/teste');
const rotaUsuarios = require('./src/Routes/usuarios');
const rotaClientes = require('./src//Routes/clientes');
const rotaVendas = require('./src/Routes/vendas');
const rotaProdutos = require('./src/Routes/produtos');

/*Registrando as rotas importadas de outras pastas e arquivos*/
fastify.register(rotaInicial);
fastify.register(rotaUsuarios);
fastify.register(rotaClientes);
fastify.register(rotaVendas);
fastify.register(rotaProdutos);


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