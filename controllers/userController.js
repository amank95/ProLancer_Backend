import User from '../models/user_model.js';
import jwt from 'jsonwebtoken';


    // Find the user by ID from the request parameters
    // and check if the user is authenticated by verifying the token
    // If the user is authenticated, delete the user from the database
    // and send a success response
export const deleteUser = async (req,res)=>{

    const user= await User.findById(req.params.id);
//COMITTED THE BELOW CODE AS I MADE MIDDLEWARE FOR VERIFYING TOKEN.
    // const token = req.cookies.accessToken;
    // if(!token) return res.status(401).send("You are not authenticated");
 
    // Verify the token
    //jwt.verify(token,process.env.JWT_KEY, async (err,payload)=>{
        // If token verification fails or if the user is not found
        // or if the user ID in the token does not match the user ID in the database
        // return an error response
        if(req.userId !== user._id.toString()) {
            return res.status(403).send("You can delete only your account");
        }
        // If the user is authenticated and authorized, delete the user
        // and send a success response
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send("User deleted successfully");
  //  });
};

export const getUser = async (req, res) => {
 const user = await User.findById(req.params.id); // Find the user by ID

    //if (!user) return res.status(404).send("User not found!"); // Check if the user exists
   
res.status(200).send(user); // Send the user details as a response
  
}