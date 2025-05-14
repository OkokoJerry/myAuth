const mongoose = require('mongoose');
const URI = 'mongodb+srv://mernAuthor:astroboy111@mernauth.drwdsl4.mongodb.net/Auth_DB?retryWrites=true&w=majority&appName=mernAuth';
const connectDB = mongoose.connect(URI);
connectDB.then(() => {
    console.log('Connection successful.');
});
connectDB.catch((error) => {
    console.log('Error: ' + error.message);
});

const userModel = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {timestamps: true});

const User = new mongoose.model('User', userModel);

module.exports = { User };