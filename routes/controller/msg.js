var skt = function(socket,io){
    socket.on('disconnect', function(data){
        console.log('user disconnected');
      });

      //online
      socket.on('online',function(username){
        global.onlineList.push(username);
        var back = {"name":username,"list":global.onlineList};
        io.emit('online',back);
      });

      //on message
      socket.on('nmsg',function(params) {
        io.emit('rmsg',params);
      });

      //offline
      socket.on('offline',function(username) {
        if(_.contains(global.onlineList , username)){
          onlineList = _.without(global.onlineList, username);
          var back = {"name":username,"list":global.onlineList};
          io.emit('offline',back);
        }
      })
}

module.exports = skt