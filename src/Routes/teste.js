async function rotaInicial(fastify, options) {
    fastify.get('/', async function(request, reply) {
        try {
            reply.status(200).send("API CRUD projeto Stone no ar!");
        } catch (err) {
            throw new Error(err)
        }
    })
}
module.exports = rotaInicial;