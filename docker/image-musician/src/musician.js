const INSTRUMENTS = {
	piano: "ti-ta-ti",
	trumpet: "pouet",
	flute: "trulu",
	violin: "gzi-gzi",
	drum: "boum-boum"
};

var protocol = require('./protocol');
//il faut les datagrammes des sockets
var datagrammes = require('dgram');
var uuid = require('uuid');//global unique identifieur. npm

var socket = dgram.createSocket('udp4'); //comme vu en cours



//classe musicien
function Musicien(instrument){	
	//this.instrument = INSTRUMENTS[Math.floor(Math.random() * INSTRUMENTS.length)];//prend un instrument random
	this.instrument = instrument;
	this.uuid = uuid.v4();
	this.activeSince = new Date().toString();
	
	Musicien.prototype.update = function(){
		var toSend = {
			uuid : uuid,
			instrument  : this.instrument
		};
		var payload = JSON.stringify(toSend);//transforme en json
		
		message = new Buffer(payload);
		socket.send(message, 0, message.length, protocol.PORT_CONNEXION_MULTICAST, protocol.MULTICAST_ADDRESS,
		function(err, bytes){
			console.log("envoi du payload: " + payload + " via port " + socket.address().port);
		});
	}
}


var instrument = process.argv[2];//lecture de la commande pour obtenir l'instrument souhaite
if(INSTRUMENTS[instrument] === undefined){//verification de la demande
	process.on('exit', function(){
		console.log("Instrument inconnu");
		process.exit(1);
	});
}

var mus = new Musicien(instrument);
