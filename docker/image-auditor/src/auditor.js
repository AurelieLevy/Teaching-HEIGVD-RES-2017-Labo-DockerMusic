//doit retourner un tableau json contenant le resultat de son ecoute

var protocol = require('./protocol');
//var entendu[];//trace de ce qui est entendu

//il faut les datagrammes des sockets
var datagrammes = require('dgram');
var udpCo = datagrammes.createSocket('udp4'); //comme vu en cours

var currentMusicians= [];


var musiDico = new Map();
	
//recup du payload
udpCo.on('message', function(message, source){
	console.log("Message: " + message + " Source port:" + source.port);
	var currentInstruments = JSON.parse(message);
	if(!musiDico.has(currentInstruments.uuid)){
		musiDico.set(currentInstruments.uuid, {
			'uuid' : currentInstruments.uuid,
			'instrument' : currentInstruments.instrument,
			'activeSince' : new Date()
		});
	}
	else{
		musiDico.get(currentInstruments.uuid).activeSince = new Date();
	}
});
	
udpCo.bind(protocol.PORT_ECOUTE, function(){
		udpCo.addMembership(protocol.MULTICAST_ADDRESS);	
	});
	

	
//a l'appel du tcpCo eliminer ce qui n'existe plus puis envoyer
//serveur tcpCo
var net = require('net');
var tcpCo = net.createServer(function(envoi){
	musiciensPlusActifs();
	var result = JSON.stringify(currentMusicians);
	envoi.write(result);
	envoi.write('\r\n');
	envoi.end();
});
tcpCo.listen(protocol.PORT_ECOUTE);


function musiciensPlusActifs(){
	var today = new Date();
	currentMusicians = [];
	musiDico.forEach(function (valeur, clef){
		if(today - valeur.activeSince <= protocol.INACTIVITY_TIME){
			currentMusicians.push(valeur);
		}
	});
	setTimeout(musiciensPlusActifs, protocol.TIMEOUT);
}


