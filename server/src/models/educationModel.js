import mongoose from "mongoose"

const educationSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        min: 3,
        required:[true,"name is required"]
    },
    description: {
        type: String,
        trim: true,
        min: 3,
        required:[true,"description is required"]
    },
    date: { type:Date,required:true },
    images:[String]
}, { timestamps: true })

export default mongoose.model("EducationModel",educationSchema)
