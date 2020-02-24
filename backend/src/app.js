const express = require("express");
const session = require('express-session');
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const routes = require("./routes/rutas");

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
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: process.env.SECRET_KEY,
      resave: false,
    })
);


require('./database/mongodb');

//rutas
app.use('/sisport/api',routes);


//static files
app.use(express.static(path.join(__dirname,'public')));


module.exports = app;