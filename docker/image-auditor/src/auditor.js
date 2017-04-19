//doit retourner un tableau json contenant le resultat de son ecoute
//console.log("Put a message here.")

/*var net = require('net');

var server = net.createServer(function(socket) {
	socket.write('Echo server\r\n');
	socket.pipe(socket);
});

server.listen(1337, '127.0.0.1');*/

var instruments = {
  piano: "ti-ta-ti",
  trumper: "pouet",
  flute: "trulu",
  violin: "gzi-gzi",
  drum: "boom-boom"
}

var protocol.require('./protocol');
var entendu[];//trace de ce qui est entendu

//serveur TCP

var net = require('net');
var serveur = net.createServer();

server.on('connection', musiciensActifs);
server.listen(protocol.PORT_ECOUTE);

function musiciensActifs(client){
	
	
}


