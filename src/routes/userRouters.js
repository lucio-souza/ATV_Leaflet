const express=require('express');
const router=express.Router();
const {createUser,findUser}=require('../controller/userController')

router.post('/',createUser);
router.get('/',(req,res)=>{console.log("deu certo");});

module.exports={router};