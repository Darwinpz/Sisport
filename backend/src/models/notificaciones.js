const mongoose = require('mongoose');

const { Schema } = mongoose;

const NotificacionesSchema = new Schema({

    per_id:{type: String},
    actividad: {type:String},
    emisor: {type: String},
    timestamp: {type: Date, default: Date.now}
    
});


module.exports = mongoose.model('notificaciones',NotificacionesSchema);