let express = require('express');
let request = require('http');
let bodyParser = require('body-parser');
let path = require('path');

let parseUrlencoded = bodyParser.urlencoded({
	extended: true
});

let app = express();
let server = require('http').createServer(app);

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(express.static("dist"));
const port = process.env.PORT || 8080;

server.listen(port, () => {
	console.log(`Servers up on Port: ${port}`);
});