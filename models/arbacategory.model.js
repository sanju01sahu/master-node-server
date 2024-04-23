const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
 
name : { type: String, required: true, },
slug : { type: String, required: true, },
image: { type: String, required: true, },
owner: { type: String, required: true, }
});

const ArbaCategoryModel = mongoose.model("arbaCategoryData", categorySchema);
module.exports = { ArbaCategoryModel };