// var io =  require('../bin/www')

// io.on('connection', function(socket){
//   console.log('a user connected');

//   socket.on('disconnect', function(data){
//     console.log('user disconnected');
//   });

//   //online
//   socket.on('online',function(username){
//     onlineList.push(username);
//     io.emit('online',onlineList)
//   });

//   //on message
//   socket.on('nmsg',function(params) {
//     io.emit('rmsg',params);
//   })  
// });