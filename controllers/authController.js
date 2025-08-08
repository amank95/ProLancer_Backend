import User from '../models/user_model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Controller functions for authentication
// These functions will handle user registration, login, and logout logic
// They will interact with the User model to perform database operations        

export const register = async(req,res)=>{
try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const newUser = new User(
        {
             ...req.body, // Spread operator to include other fields like username, email, etc.
            password: hashedPassword,
           
        }
    );
    // const newUser=new User({
    //     username:req.body.username,
    //     email:req.body.email,
    //     password:req.body.password,
    //     country: req.body.country, 
    // });
    await newUser.save();
res.status(201).send("User registered successfully");
} catch (error) {
    res.status(500).send( "Internal Server Error" );
}
}

export const login = async(req,res)=>{
    try {
        const user = await User.findOne({username:req.body.username});

        if(!user) return res.status(404).send("User not found");

        
        //const isCorrect = bcrypt.compareSync(req.body.password, user.password);
        const isCorrect = await bcrypt.compare(req.body.password, user.password);

        if(!isCorrect) return res.status(400).send("Invalid credentials");

        const token = jwt.sign({
            id: user._id,
            isSeller: user.isSeller
        }, process.env.JWT_KEY, {expiresIn: '1h'});

        const {password, ...info} = user._doc; // Exclude password from the response
        res.cookie("accessToken", token,{httpOnly:true}).status(200).send(info); // Send user data without password

    } catch (error) {
        res.status(500).send("Internal Server Error");        
    }
}

export const logout = async(req,res)=>{
    // Clear the cookie aand coookie name->accesstoken
    res.clearCookie('accessToken' ,{
    sameSite:'none' ,
    secure: true 
    }).status(200).send("user has been logged out"); 
}