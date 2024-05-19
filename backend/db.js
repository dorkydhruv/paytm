const mongoose = require("mongoose");
const {Schema} = mongoose;

mongoose.connect("mongodb+srv://dhruv:1154Dhruv@paytmcluster.enh71c5.mongodb.net/");

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 5,
        maxlength: 20,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
})

const User = mongoose.model("User",userSchema);
module.exports = {
    User,
}