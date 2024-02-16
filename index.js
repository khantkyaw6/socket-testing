const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);

// Fix the typo in the import and initialization
const io = require('socket.io')(server);

const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
	let options = {
		root: path.join(__dirname, '/views'),
	};
	let fileName = 'index.html';
	res.sendFile(fileName, options);
});

// let users = 0;
// let cnsp =
let roomno = 1;

io.on('connection', function (socket) {
	console.log('A user connected');

	socket.join('room-' + roomno);
	io.sockets
		.in('room-' + roomno)
		.emit('connectedRoom', 'You are connected to room no.' + roomno);
});

server.listen(PORT, () => {
	console.log('Server ready on PORT', PORT);
});

// Broadcast Start
// users++;
// socket.emit('newuserconnect', {
// 	message: 'Hi, Welcome Dear ',
// });
// socket.emit('newuserconnect', {
// 	message: users + `Users connected`,
// });

// socket.on('disconnect', () => {
// 	console.log('A user disconnected');
// 	users--;

// 	socket.broadcast.emit('newuserconnect', {
// 		message: users + `Users connected`,
// 	});
// });
// Broadcast End

// io.of('/custom-namespace');

// cnsp.on('connection', (socket) => {
// 	console.log('A user connected');

// 	cnsp.emit('customEvent', 'Tester event call');

// 	socket.on('disconnect', function () {
// 		console.log('A user disconnected');
// 	});
// });
