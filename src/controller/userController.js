const {User}=require("../model/User");

const createUser=async(req,res)=>{
    try{
    const user=await User.create(req.body);
    res.status(201).json(user);
    }catch(e){
        if (e.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ error: 'Email já está em uso.' });
          } else {
            res.status(500).json({ error: 'Erro interno do servidor.' });
          }
    }
}
const findUsers=async(req,res)=>{
    try{
        const users=await User.findAll();
        res.status(200).json(users)
    }catch(e){
        console.log(e);
    }
}
const findUserByemail=async(req,res)=>{
    const {email}=req.params
    try {
        const user=await User.findOne({where:{email}});
        
        
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({error:email})
    }
}
const updateUser=async(req,res)=>{
    const {nome,idade,localizacao}=req.body;
    try {
        const user=await User.findByPk(req.params.id);
        user.nome=nome;
        user.idade=idade;
        user.localizacao=localizacao;
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({error:"erro ao atualizar usuario"})
    }
}
const deleteUser=async(req,res)=>{
    try {
        const user=await User.findByPk(req.params.id);
        await user.destroy(user);
        await findUsers(req,res);
    } catch (error) {
        res.status(404).json({erro:"usuario inexistente"});
    }
}

module.exports={createUser,findUsers,updateUser,deleteUser,findUserByemail};