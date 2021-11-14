const user = require('./routes/user')
const morgan = require('morgan');
const config = require('config');
const debug = require('debug')('app:init');
const express = require('express');
const app = express();
// const logger = require('./logger')

app.use(express.json());
app.use(express.urlencoded({extended: true}))
// middleware para usar archivos estaticos
app.use(express.static('public'));
app.use('/api/users', user)
// configuracion de entornos
console.log('Aplication: ' + config.get('name-proyect'))
console.log('Config DB: ' + config.get('config-DB.host'))
// middleware de terceros ==> MORGAN
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan habilitado')
}

// Work in the Database
debug('Conceting with MongoDB')
// app.use(logger);

app.get('/', (req, res) => res.send('Hola mundo desde express..'));
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Escuchando el puerto ${port}`));