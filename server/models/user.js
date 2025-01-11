const mongoose = require('mongoose'); // Import mongoose
const Schema = mongoose.Schema; // Define Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},{timestamps: true});

const User = mongoose.model('User', userSchema); // Create model
module.exports = User; // Export model