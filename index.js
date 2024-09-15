const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { router } = require('./src/routes/userRouters');

const app = express();
const port = process.env.port;


let corsOptions = {
  origin: ['http://127.0.0.1:5500']
};

app.use(cors(corsOptions));
app.use(express.json()); 

app.use('/users',router);

app.listen(port, () => {
  console.log(`Servidor online na porta ${port}`);
});

module.exports=app;