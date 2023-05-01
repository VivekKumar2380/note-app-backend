const express=require("express")
const {UserModel}=require("../model/User.model")
const jwt =require("jsonwebtoken")
const bcrypt = require("bcrypt")
const UserRouter=express.Router()
UserRouter.post("/register", async(req,res)=>{
    const {name,email,pass,age}=req.body
try {
    bcrypt.hash(pass, 5, async(err, hash) => {
        const user= new UserModel({email,name,age,pass:hash})
        await user.save()
        res.status(200).send({"msg":"New user has been registered"})
    });
   
} catch (error) {
    res.status(400).send({"err":error.message})
}
})

UserRouter.post("/login" , async(req,res)=>{
const {email,pass}=req.body
try {
  const user=  await UserModel.findOne({email:email})
 
if (user) {
    bcrypt.compare(pass, user.pass, function(err, result) {
   if(result){
    const token=jwt.sign({authorId:user._id,author:user.name}, 'shhhhh');
    res.status(200).send({"msg":"Login Successfull","token":token})
   }else{
    res.status(200).send({"msg":"Wrong Credentials"})
   }
    });
   
} else {
    res.status(200).send({"msg":"Wrong Credentials"})
}
} catch (error) {
    res.status(400).send({"err":error.message})
    
}
})


module.exports={
    UserRouter
}



//644f2c693d21a76ec4f7d429 created by rockey