require('dotenv').config();

const app = require("./app");

const server = app.listen(app.get('port'),()=>{

    console.log("Servidor iniciado",app.get('port'));

});
