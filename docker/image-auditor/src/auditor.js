//doit retourner un tableau json contenant le resultat de son ecoute
//console.log("Put a message here.")

/*var net = require('net');

var server = net.createServer(function(socket) {
	socket.write('Echo server\r\n');
	socket.pipe(socket);
});

server.listen(1337, '127.0.0.1');*/


var protocol = require('./protocol');
//var entendu[];//trace de ce qui est entendu

//il faut les datagrammes des sockets
var datagrammes = require('dgram');
var socket = datagrammes.createSocket('udp4'); //comme vu en cours

var currentInstruments = new Map();

/*var instruments = {
  piano: "ti-ta-ti",
  trumper: "pouet",
  flute: "trulu",
  violin: "gzi-gzi",
  drum: "boom-boom"
}*/

//ecoute musiciens
socket.on('listening', function(){
		var address = socket.address();
		console.log("Ecoute sur: " = address.address + ":" + address.port);
	});
	
//recup du payload
socket.on('message', function(message, source){
		console.log("Message: " + message + " Source port:" + source.port);
		var currentInstruments = JSON.parse(message);
		//REMPLIR MAP
		
	});

//serveur TCP
/*
var net = require('net');
var serveur = net.createServer();
serveur.on('connection', musiciensActifs);
serveur.listen(protocol.PORT_ECOUTE);
*/
/*
function musiciensActifs(client){
	
	
}*/


