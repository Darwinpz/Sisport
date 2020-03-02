const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema(
{
   
    per_id: {type:String, required:true},
    per_cargo: {type:String, required:true}

});


module.exports = mongoose.model('User', UserSchema);