var gameport = 4004;

var		socket = require('socket.io'),
		express = require('express'),
        UUID = require('uuid'),
        verbose  = false,
        app = express(),
        playercount =0,
        players;

server = app.listen( gameport );
var io = socket(server);


function connectFunction(socket){
	console.log('we got hit');
 	playercount++;
 	//players.push({id: playercount, x:325, y:325});
	
 	function updatePos(data){

 		socket.broadcast.emit('position', data)
 		console.log('we got update');
 	}

	socket.on('position', updatePos);

}

io.sockets.on('connection', connectFunction)

        //Log something so we know that it succeeded.
console.log('\t :: Express :: Listening on port ' + gameport );

        //By default, we forward the / path to index.html automatically.
//app.get( '/', function( req, res ){ 
  //  res.sendfile( 'index.html' );
	//});
	app.use(express.static('public'))