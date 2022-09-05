import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    country: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    img: {
        type: String,
    },
    phone: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

export default mongoose.model('User', userSchema)