const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { UserModel } = require("../model/User.model")
require("dotenv").config();

const userRegister = async (req, res) => {
    const { name, email, pass } = req.body;

    try {
        if (!name || !email || !pass) {
            return res.status(400).send({ msg: "Required fields are missing" });
        }

        const alreadyRegisteredEmail = await UserModel.findOne({ email: email });

        if (alreadyRegisteredEmail) {
            return res.status(409).send({ msg: "Email is already in use. Use another email" });
        }

        bcrypt.hash(pass, 5, async (err, hash) => {
            if (err) {
                    return res.status(500).send({ msg: "Server error hashing password" });
            }
            
            const user = new UserModel({ name, email, pass: hash, role: "user" });
            await user.save();
            res.status(201).send({ msg: "New User has been registered" });
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: err.message || "Server error during registration" });
    }
};

const userLogin = async (req , res) => {
    const {email,pass} = req.body;
    try{
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(400).send({ msg: "Login Email is not registered with us. Please SignUp" });
        }
        if(user){
            bcrypt.compare(pass,user.pass,(err,result)=>{
                if(result){
                    const token = jwt.sign({userId:user._id,role:user.role},process.env.secretKey)
                    return res.status(200).send({msg:"Login Successful",token,user});
                }else{
                    return res.status(200).send({msg:"Wrong Password"});
                }
                
            })
        }else{
            res.status(200).send({msg:"Wrong Email"});
        }
        


    
    }catch(err){
        res.status(400).send({err:err.message});
    }
}

const getUserData = async (req, res) => {
    try {
        const users = await UserModel.find({});  
        if (!users || users.length === 0) {    
            return res.status(404).send({ message: "No users found", status: 404 });
        }
        return res.status(200).send({ users, status: 200 });  
    } catch (err) {
        console.error("Failed to retrieve users:", err.message);
        return res.status(500).send({ message: "Failed to retrieve users", status: 500 });  
    }
}


module.exports={
    userRegister,
    userLogin,
    getUserData
}