import {User} from "../models/user.model.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) =>{
    try {
    const {username, password, email} = req.body;

    //basic validation
    if (!username || !password || !email){
        return res.status(400).json({ message: "All Fields are Required!"});
    } 
    //check if user exists
    const existing = await User.findOne({email: email.toLowerCase()});
    if (existing){
        return res.status(400).json({ message: "User already exists"});
    }
    //Create user
    const user = await User.create ({
        username,
        email: email.toLowerCase(),
        password,
        loggedIn: false
    });

    res.status(201).json({
        message: "user Created",
        user: { user: user._id, email: user.email, username: user.username}
    })
    } catch(error){
        res.status(500).json({ message: "Internal server error", error: error.message});
    }
};

const loginUser = async(req, res) => {
    try {
        //checking if the user already exists
        const { email, password } = req.body;

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) return res.status(400).json({
            message: "user not found"
        });

        //compare passwords
        const isMatch = await user.comparePassword(password);
        if (!isMatch){
            return res.status(400).json({
                message: "Invalid Creadenials!"
            })
        }
            res.status(200).json({
                message: "user Logged in",
                user: {
                    id: user._id,
                    email: user.email,
                    username: user.username
                }
            })
        
    }catch(error){
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const logoutUser = async (req, res) =>{
    try{
        const {email} = req.body;

        const user = User.findOne({
            email
        })
        if (!user) return res.status(400).json({
            message: "user not found!"
        });

        res.status(200).json({
            message: "Loged out successfully"
        });

    }catch(error){
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}


export {
    registerUser,
    loginUser,
    logoutUser
}