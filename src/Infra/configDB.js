require('dotenv/config');

const proConfig = {
    connectionString: process.env.CONNECTION_URI,
    ssl: {
      rejectUnauthorized: false
    }
}

module.exports = proConfig;