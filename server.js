var gameport = 4004;

var		socket = require('socket.io'),
		express = require('express'),
        UUID = require('uuid'),
        Player = require('public/player.js').Player,
        verbose  = false,
        app = express(),
        playercount =0,
        players;

players = [];
server = app.listen( gameport );
var io = socket(server);

function playerJoin(data){
var newPlayer = new Player(data.x, data.y);
newPlayer.id = this.id;

this.broadcast.emit("new player", {id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY()});

var i, connectedPlayer;
for (i = 0; i < players.length; i++) {
    connectedPlayer = players[i];
    this.emit("new player", {id: connectedPlayer.id, x: connectedPlayer.getX(), y: connectedPlayer.getY()});
};

players.push(newPlayer);

}
function disconnect(){

}
function playerMove(){

}

function connectFunction(socket){
	console.log('we got hit');
 	playercount++;
 	//players.push({id: playercount, x:325, y:325});
	
 	function updatePos(data){

 		socket.broadcast.emit('position', data);
 		
 	}

	socket.on('playerJoin', playerJoin);
	socket.on('disconnect', disconnect);
	socket.on('playerMove', playerMove);


}

io.sockets.on('connection', connectFunction)



        //Log something so we know that it succeeded.
console.log('\t :: Express :: Listening on port ' + gameport );

        //By default, we forward the / path to index.html automatically.
//app.get( '/', function( req, res ){ 
  //  res.sendfile( 'index.html' );
	//});
	app.use(express.static('public'))