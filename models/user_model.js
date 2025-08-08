import mongoose from 'mongoose';
const {Schema}=mongoose;
const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        // unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    img:{
        type:String,
        required:false,
    },
    country:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:false,
    },
    password:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:false,

    },
    isSeller:{
        type:Boolean,
        default:false,
    },

},{
    timestamps:true,
});

export default mongoose.model("User",userSchema);
// This code defines a Mongoose schema for a User model, which includes fields for username,email,password,img,country,phone,desc,and isSeller. The schema also includes timestamps for created and updated times. The model is exported for use in other parts of the application.
// The schema ensures that certain fields are required and unique, and it allows for optional fields like img, phone, and desc. The isSeller field is a boolean that defaults to false, indicating whether the user is a seller or not. The timestamps option automatically adds createdAt and updatedAt fields to the documents.
// The model is named "User" and can be used to interact with the corresponding MongoDB collection.
// This schema can be used to create, read, update, and delete user documents in a MongoDB database. It provides a structured way to manage user data in a web application, such as a marketplace or social platform.       