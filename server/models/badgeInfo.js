const mongoose = require("mongoose");
const { Schema } = mongoose;
const badgeSchema = new Schema(
{
    orderID:Number,
    role:String,
    firstName:String,
    lastName:String,
    email:String,
    jobTitle:String,
    company:String,
}
    );
    module.exports = mongoose.model("Badge", badgeSchema);