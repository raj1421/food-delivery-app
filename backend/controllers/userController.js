import userModel from "../models/user.models.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from "validator"

const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET);
}
//login User
const loginUser = async(req,res) => {
     const {email,password}=req.body;
     try {
        const user = await userModel.findOne({email});
        if(!user){
             return res.json({success:false,message:"User Doesn't Exist"});
        }
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({success:false,message:"Invalid Credentials"});
        }
        const token = createToken(user._id);
        res.json({success:true,token});
     } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
     }
}


//register User
const registerUser = async(req,res) => {
  const {name,password,email}=req.body;
  try{
    const userExist = await userModel.findOne({email});
    if(userExist){
        //checking if user already exists
        return res.json({success:false,mesage:"User Already Exist"});
    }
    //validating email fromat and strong password
    if(!validator.isEmail(email)){
        return res.json({success:false,mesage:"Please Enter Valid Email"});
    }
    if(password.length<8){
        return res.json({success:false,mesage:"Please Enter Vaild Password"});
    }

    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword =await bcrypt.hash(password,salt);

    const newUser = new userModel({
        name,
        email,
        password:hashedPassword
    })

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({success:true,token});

  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

export {loginUser,registerUser};