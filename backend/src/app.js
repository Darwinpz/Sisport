const express = require("express");
const session = require('express-session');
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const RedisStore = require('connect-redis')(session);
const redis = require('redis');

let redisClient = redis.createClient({
        retry_strategy: (options) => {

            if (options.error && options.error.code === "ECONNREFUSED") {
                console.log('Redis: RECONECTANDO - '+options.error.code); 
            }

            return Math.min(options.attempt * 100, 3000);
        },
    }
);

redisClient.on('connect', ()=>{
    console.log("Redis: CONECTADO");
});


const app = express();

//configuracion
app.set('port',process.env.PORT || 4000);

//middlewares
app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: process.env.SECRET_KEY,
      resave: false,
      saveUninitialized: false
    })
);

app.use(cors({origin:['http://172.31.44.79:4000','http://172.31.44.79:3000'],methods:['GET','POST','PUT','DELETE'],credentials:true}))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(morgan('dev'));


require('./database/mongodb');

//rutas
require("./routes/rutas")(app);

//static files
app.use(express.static(path.join(__dirname,'public')));


module.exports = app;