const mongoose = require('mongoose');

const { Schema } = mongoose;

const PermisosSchema = new Schema(
{
   
    per_id: {type:String, required:true},
    per_cargo: {type:String, required:true}

});


module.exports = mongoose.model('permisos', PermisosSchema);