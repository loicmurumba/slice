var gameport = 4004;

var		socket = require('socket.io'),
		express = require('express'),
        UUID = require('uuid'),
        Player = require('./Player').Player,
        verbose  = false,
        app = express(),
        playercount =0,
        players;

players = [];
server = app.listen( gameport );
var io = socket(server);

function playerJoin(data){
var newPlayer = {x: data.x, y: data.y};
newPlayer.id = playercount;
this.emit("assignID", playercount);

this.broadcast.emit("new player", {id: newPlayer.id, x: newPlayer.x, y: newPlayer.y});
var i, connectedPlayer;
for (i = 0; i < players.length; i++) {
    connectedPlayer = players[i];
    this.emit("new player", {id: connectedPlayer.id, x: connectedPlayer.x, y: connectedPlayer.y});
};

players.push(newPlayer);
console.log(players);

}
function playerById(id) {
    var i;
    for (i = 0; i < players.length; i++) {
        if (players[i].id == id)
            return players[i];
    };

    return false;
	};

function disconnect(){
}
function playerMove(data){
	var movePlayer = playerById(data.id);

	if (!movePlayer) {
    console.log("Player not found: "+data.id);	
    return;
	};

	movePlayer.x = data.x;	
	movePlayer.y = data.y;
	console.log(data);
	this.broadcast.emit("movePlayer", {id: data.id, x: data.x, y: data.y});
}
function playerRemove(data){
	
	remove = playerById(this.id);

	if (!remove) {
    console.log("Player not found: "+this.id);
    return;
	};

	players.splice(remove.indexOf(removePlayer), 1);
}

function connectFunction(socket){
	console.log('we got hit');
 	playercount++;
 	//players.push({id: playercount, x:325, y:325});
	

	socket.on('playerJoin', playerJoin);
	socket.on('disconnect', disconnect);
	socket.on('playerMove', playerMove);
	socket.on('playerRemove', playerRemove)


}

io.sockets.on('connection', connectFunction)



        //Log something so we know that it succeeded.
console.log('\t :: Express :: Listening on port ' + gameport );

        //By default, we forward the / path to index.html automatically.
//app.get( '/', function( req, res ){ 
  //  res.sendfile( 'index.html' );
	//});
	app.use(express.static('public'))