const mongoose = require("mongoose");
const { Schema } = mongoose;
const attendeeSchema = new Schema(
{
    name: String,
    company: String,
    email: String,
    role: String,
    vendorEmail: String,
}
    );
    module.exports = mongoose.model("Attendee", attendeeSchema);