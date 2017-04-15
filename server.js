var gameport = 4004;

var		io = require('socket.io'),
		express = require('express'),
        UUID = require('uuid'),
        verbose  = false,
        app = express();

server = app.listen( gameport );
var socket = io(server);

socket.sockets.on('connection', connectFunction)

function connectFunction(socket){
	console.log('we got hit');


}
        //Log something so we know that it succeeded.
console.log('\t :: Express :: Listening on port ' + gameport );

        //By default, we forward the / path to index.html automatically.
//app.get( '/', function( req, res ){ 
  //  res.sendfile( 'index.html' );
	//});
	app.use(express.static('public'))