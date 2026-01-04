import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
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
    mainImg: String,
    images:[String],
    liveUrl: {
        type: String,
        trim: true,
       required:[true,"liveUrl is required"]
    },
    repoUrl: {
        type: String,
        trim: true,
        required:[true,"repoUrl is required"]
    }
}, { timestamps: true })

export default mongoose.model("ProjectModel",projectSchema)