import User from "../models/user.model.js";

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
export {
    registerUser
}