const mongoose = require('mongoose');

const talentSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    summarize:{
        type:String,
        required:true
    },
    file:{
        type:String,
        required:true
    },

});

const Talent = mongoose.model('Talent', talentSchema);
module.exports = { Talent }