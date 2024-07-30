const { Sequelize } = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(process.env.database, process.env.username, process.env.password, {
  host: process.env.host,
  dialect: 'postgres'
});

const conectar=async ()=>{
    try{
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }catch(e){
        console.error('Unable to connect to the database:', e);
    }
}
conectar();

module.exports={sequelize};