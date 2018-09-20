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

app.post('/api/data', (request, response) => {
	console.log('fetching');
	let reqBody = "";
	let data;

	request.on('data', function(chunk) {
		reqBody += chunk;
	});

	request.on('end', function() {
		data = JSON.parse(reqBody);
		console.log(data);
		let {address, offset} = data;

		fetch(`https://blockchain.info/rawaddr/${address}?limit=20&offset=${offset}`, {
				method: 'GET',
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'text/plain'
				}
			})
			.then(res => res.json())
			.then(data => response.send(data))
			.catch(err => {
				response.send(err);
				console.log(err);
			});
	});
});