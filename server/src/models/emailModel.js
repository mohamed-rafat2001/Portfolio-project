import mongoose, { mongo } from "mongoose"
import validator from "validator"

const emailSchema = new mongoose.Schema({

    userName:{
        type: String,
        trim: true,
        min: 3,
        required:[true,"name is required"]
    },
    userEmail: {

        type: String,
        trim: true,
        required: [true, "email is required"],
        validate:[validator.isEmail, "please enter the valid email"],
                
    },
    phoneNumber: {
        type: String,
        required: [true, "phone number is required"],
        trim: true,
        validate: [validator.isMobilePhone, "please enter valid phone number"],
    },
    subject:{
        type: String,
        trim: true,
        min: 3,
        required:[true,"name is required"]
    },
    emailBody:{
        type: String,
        trim: true,
        min: 3,
        required:[true,"email is required"]
    },
}, { timestamps: true })

export default mongoose.model("EmailModel",emailSchema)