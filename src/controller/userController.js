const {User}=require("../model/User");

const createUser=async(req,res)=>{
    try{
    const user=await User.create(req.body);
    res.status(201).json(user);
    }catch(e){
        res.status(404).send("error ao criar usuario")
    }
}
const findUser=async(req,res)=>{
    try{
        const user=await User.findAll();
        res.json(user)
    }catch(e){
        console.log(e);
    }
}

module.exports={createUser,findUser};