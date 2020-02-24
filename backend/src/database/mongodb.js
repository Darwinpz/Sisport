const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

mongoose.connect(URI,
    {   useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify:true,
        useCreateIndex: true
    })
    .then(db=> console.log("BD CONECTADA"))
    .catch(err=>console.error(err));

module.exports = mongoose;