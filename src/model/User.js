const {sequelize}=require("../database/sequelize")
const {DataTypes}=require("sequelize")

const User=sequelize.define("Usuario",{
    id:{
        type:DataTypes.UUID ,        
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4
    },
    nome:{
        type: DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    idade:{
        type:DataTypes.INTEGER
    },
    localizacao:{
        type:DataTypes.GEOMETRY
    }
});

async function sincronizar() {
    await User.sync();
    console.log("Tabela sincronizada com possíveis alterações");
  }
sincronizar();

module.exports={User};