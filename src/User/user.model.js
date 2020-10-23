const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, lowercase: true },
    firstDevice: { type: String },
    secondDevice: { type: String }
}, {
    timestamps: true,
})

module.exports = mongoose.model("User", UserSchema)