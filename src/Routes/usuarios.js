const proConfig = require('../Infra/configDB');
const Pool = require("pg").Pool;
const pool = new Pool(proConfig);
async function rotaUsuarios(fastify, options) {
    fastify.get('/usuarios', async function(request, reply) {
        try {
            const response = await pool.query('SELECT * FROM users');
            reply.status(200).send(response.rows)
        } catch (err) {
            throw new Error(err)
        }
    });

    
}
module.exports = rotaUsuarios;