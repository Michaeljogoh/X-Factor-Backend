const mongoose = require('mongoose');


const adminSchema = new mongoose.Schema({
   admin:{
    type: String,
    required: true
   },
   password:{
    type: String,
    required: true
   },

   role:{
    type: Boolean,
   }
})

const Admin = mongoose.model('Admin', adminSchema)
module.exports = { Admin }