import mongoose from "mongoose";
import { Schema } from "mongoose";

const enrollSchema = new mongoose.Schema({
    users:[
        {
            type:Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    plans:[
        {
            type:Schema.Types.ObjectId,
            ref: 'plans'
        }
    ],
    expiryDate: {
        type: Number,
        default: Date.now() + 31 * 24 * 60 * 60 * 1000
    }
}, {timestamps: true})

export default mongoose.model('enrolls', enrollSchema);