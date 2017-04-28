//doit retourner un tableau json contenant le resultat de son ecoute

var protocol = require('./protocol');
//var entendu[];//trace de ce qui est entendu

//il faut les datagrammes des sockets
var datagrammes = require('dgram');
var udpCo = datagrammes.createSocket('udp4'); //comme vu en cours

var currentMusicians= [];

/*var instruments = {
  piano: "ti-ta-ti",
  trumper: "pouet",
  flute: "trulu",
  violin: "gzi-gzi",
  drum: "boom-boom"
}*/

/*var musicianToSend  = {
	'uuid' : null,
	'instrument' : null,
	'activeSince' : new Date()
};*/

var musiDico = new Map();
/*
musiDico.set(clef, 'obj');
musiDico.get(clef);*/

	
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
	//remplir tableau
	/*for(var i = 0; i < currentMusicians.length; i++){
		if(currentMusicians[i].uuid == currentInstruments.uuid){
			currentMusicians[i].activeSince = new Date();				
		}
		
	}*/	
	/*musicianToSend.uuid = currentInstruments.uuid;
	musicianToSend.instrument = currentInstruments.instrument;
	if(musicianToSend.uuid == currentInstruments.uuid){				
			musicianToSend.activeSince = new Date();				
	}*/
	
	
	/*currentMusicians.push(
			{
			'uuid' : currentInstruments.uuid,
			'instrument' : currentInstruments.instrument,
			'activeSince' : new Date()
		}
	);*/
	//currentInstruments.activeSince = new Date();
	//currentMusicians.push(musicianToSend);
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
	//console.log('Coucou');
	//console.log(currentMusicians);
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
	
	
	/*var today = new Date();
	
	for(var i = 0; i < currentMusicians.length; i++){
		if(today - currentMusicians[i].activeSince > protocol.INACTIVITY_TIME){
			console.log("musicien enlevé: " + currentMusicians[i].uuid);
			currentMusicians.splice(i,1);//on enleve l element à la position i
		}
	}*/
	
	setTimeout(musiciensPlusActifs, protocol.TIMEOUT);
}


