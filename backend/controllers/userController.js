const User = require("../models/userModel")
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const maxAge = 3 * 24 * 60 *60;
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: maxAge})
}

const loginUser = async(req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.login(email, password);
        const token = createToken(user._id);
        obj = {email: email, token: token};
        res.cookie('jwt', JSON.stringify(obj), { httpOnly: true, maxAge: maxAge*1000})
        res.status(200).json({email, token})
    }
    catch(error){
        res.status(400).json({mssg: error.message})
    }
}

const signupUser = async(req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.signup(email, password);
        const token = createToken(user._id);
        obj = {email: email, token: token};
        res.cookie('jwt', JSON.stringify(obj) , { httpOnly: true, maxAge: maxAge*1000})
        res.status(200).json({email, token})
    }
    catch(error){
        res.status(400).json({mssg: error.message})
    }
}

const checkUser = (req,res) => {
    const token = req.cookies.jwt;
    tok = JSON.parse(token);
    console.log(tok);
    res.status(200).json(tok);
}

const logoutUser = (req, res) => {
    res.cookie('jwt', '' , { maxAge: 1 });
    console.log("logged out");
    res.status(200).json("User logged out");
}

module.exports = { loginUser, signupUser, checkUser, logoutUser };