import mongoose from "mongoose";
import { Schema } from "mongoose";

const centerSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    motto: {
        type: String,
        required: true
    }, 
    location : {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['gym', 'calisthenics', 'yoga', 'sports']
    },
    plans:[
        {
            type:Schema.Types.ObjectId,
            ref: 'plans'
        }
    ]
}, {timestamps: true})

export default mongoose.model('centers', centerSchema);