var iof = function(server){

    var io = require('socket.io').listen(server);
    
    io.on('connection', function(socket){
      console.log('a user connected');
      var msg = require('./routes/controller/msg')
      var this_msg = new msg(socket,io)
    });
}

module.exports = iof