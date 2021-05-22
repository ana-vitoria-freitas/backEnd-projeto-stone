
const express = require('express')
const app = express()
const port = 3000

const proConfig = require('./src/Infra/config');

app.get('/', async(req, res) => {
  try {
    const Pool = require("pg").Pool;


    const pool = new Pool(proConfig);

    module.exports = pool;
    const response = await pool.query('SELECT * FROM users')
    await pool.end()

    res.send(response.rows)
  } catch (Exception) {
    res.send("error")
  }
})

app.get('/ana', (req, res) =>{
    try{
        res.send("Rota ana configurada!");
    }catch(Exception){
        res.send(Exception);
    }
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})