import mongoose from 'mongoose';
const {Schema}=mongoose;

const ReviewSchema=new Schema({
    gigId:{
        type:String,
        required:true,
    },
        userId:{
        type:String,
        required:true,
    },
    star:{
        type:Number,
        required:true,
        enum:[1,2,3,4,5]
    },
    desc:{
        type:String,
        required:true,
    },
},{
    timestamps:true,
});

export default mongoose.model("Review",ReviewSchema);
// This code defines a Mongoose schema for a Review model, which includes fields for gigId, userId, star rating, and description. The schema also includes timestamps for created and updated times. The model is exported for use in other parts of the application.