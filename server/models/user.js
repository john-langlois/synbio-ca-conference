const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema(
{
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 64,
        },
    resetCode: "",
    },
    { timestamps: true }
    );
    module.exports = mongoose.model("User", userSchema);