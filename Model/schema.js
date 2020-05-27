const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const detail = new Schema({
    postname: {
        type: String,
        required: true
    },
    date: {
        type: Date ,
        required: true ,
        default : Date.now
    },
    Content: {
        type: String,
        required: true
    },
    postedby: {
        type: String,
        required: true
    },
    uid: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Post", detail);