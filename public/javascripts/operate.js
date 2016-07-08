$(function(){
    var socket = io();
    var username = $("#username").html();
    socket.emit('online',username);


    $("#send").click(function(){
        var message = $("#msg").val();
	    message = { 'message': message , 'username': username};
        socket.emit('nmsg', message);
        $("#msg").val('');
    })

    socket.on('rmsg',function(params){
        var now = new Date();
        var nowTime = now.toDateString() + now.toTimeString()
        var str = "<div class='col-sm-12'><b>"+params.username + "</b> at " + nowTime + ": </div>"
        var content = "<div class='col-sm-12'>"+params.message+"</div>"
        $(".content").append(str);
        $(".content").append(content);
    })

    socket.on('online',function(list){
        $("#onlinelist").html('');
        list.forEach(function(e) {
            $("#onlinelist").append("<li class='list-group-item' id='"+e+"'>"+e+"</li>");
        }, this);
    })
});