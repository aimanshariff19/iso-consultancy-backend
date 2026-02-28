const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String },
    isoType: { type: String },
    message: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enquiry", enquirySchema);