import User from '../../models/userAccount.model..js';
import {hashPassword , comparePassword , generateToken} from '../../utils/AuthenticateJWT.js';

export const userRegister = async (req,res)=>{
    try{
        const {name , email , mobile , password } = req.body;
        if(!name || !email || !mobile || !password){
            return res.status(400).json({message : "All fields are required"});
        }
        const userExists = await User.findOne({
            $or:[{email},{mobile}]
        });
        if(userExists){
            return res.status(400).json({message : "User already exists"});
        }
        const hashedPassword = await hashPassword(String(password));
        const newUser = new User({name , email , mobile , password:hashedPassword});
        await newUser.save();   

        const token = generateToken({ userId: newUser._id, email: newUser.email, role: newUser.role });
        return res.status(201).json({message : "User registered successfully",newUser,token});

    }catch(error){
        res.status(500).json({message : "Server error in user register",error:error.message})
    }
}