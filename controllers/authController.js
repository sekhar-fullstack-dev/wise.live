const User = require("../database/models/User");
const { createToken } = require("../services/authServices");
const bcrypt = require('bcrypt');

const registerUser = async(req) => {
    try {
        const {email, password } = req.body;
        const username = email.split("@")[0];
        const user = new User({username:username, email: email, password: password});
        const result = await user.save();
        if(result){
            return {
                status : 200,
                errro:"",
                msg: "User registered successfully",
                data:{
                    user: {
                        username,
                        email,
                        // In a real application, never send back the password!
                    }
                }
            }
        }
        else{
            return {
                status:400,
                errro:"",
                msg: "",
                data:{
                    user: {
                        username,
                        email,
                        // In a real application, never send back the password!
                    }
                }
            }
            
        }
    } catch (e) {
        throw e;
    }
};

const loginUser = async(req)=>{
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email:email });
        if (!user) {
            return {status:404, error:"User not found", data:{}}
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch) {
            const token = createToken({email:req.body.email, role:100});
            return {status:200, data:{token:token}};
        }
        else{
            return {status:404, error:"Invalid creadentials", data:{}};
        }
    } catch (e) {
        throw e;
    }
}

module.exports = {
    registerUser,
    loginUser
};
