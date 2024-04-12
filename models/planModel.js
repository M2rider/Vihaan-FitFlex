import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    daysInAMonth: {
        type: Number,
        required: true,
        min: 1,
        max: 31
    },
    activities: [{
        type: String
    }]
}, {timestamps: true})

export default mongoose.model('plans', planSchema);