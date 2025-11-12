import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    roles: {
        type: String,
        enum: ['admin', 'sub-admin', 'customer'],
        default: 'customer'
    },
    status: {
        type: Boolean,
        default: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema);
