const mongoose = require("mongoose");
const abstract_schema = new mongoose.Schema(  {
    abs_title : {
        type: String,
    },
    abs_text : {
        type : String,
    },
    ai_id : {
        type: String,
    },
    created_at :{
        type : Date,
        default : Date.now,
    },
})

const Abstract = mongoose.model("Abstract", abstract_schema);
module.exports = Abstract;