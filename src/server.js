const express = require('express');
const routes = require('./routes');
const path = require('path');

const server = express();

server.use(express.static('public'));
server.set('view engine', 'ejs');
server.set('views', './src/views')
server.use(express.urlencoded({extended: true}));
server.use(routes);

server.listen(3000, () => console.log("Server started!"));

