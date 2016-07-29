$(function(){
    var socket = io();
    var username = $("#username").attr("value");
    socket.emit('online',username);
    Notification.requestPermission(function (status) {
        // This allows to use Notification.permission with Chrome/Safari
        if (Notification.permission !== status) {
          Notification.permission = status;
        }
    });

    //Create cookie
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+1)
    document.cookie="uname = "+$("#username").attr("value")+";expires="+exdate.toGMTString()
    document.cookie="pswd = "+$("#pswd").val()+";expires="+exdate.toGMTString()


    //Offline
    $(window).unload(function(){
        socket.emit('offline',username);
    });

    //Logout
    $("#logout").click(function (e) { 
        socket.emit('offline',username);
        window.location.href="http://localhost:3000/login/init";
    });


    $("#send").click(function(){
        var message = $("#msg").val();
	    message = { 'message': message , 'username': username};
        socket.emit('nmsg', message);
        $("#msg").val('');
    });

    socket.on('rmsg',function(params){
        var now = new Date();
        var nowTime = now.toDateString() + now.toTimeString()
        var str = "<div class='col-sm-12'><b>"+params.username + "</b> at " + nowTime + ": </div>"
        var content = "<div class='col-sm-12'>"+params.message+"</div>"
        $(".content").append(str);
        $(".content").append(content);
    });

    socket.on('online',function(back){
        refreshList(back.list);
        if (window.Notification && Notification.permission === "granted") {
            var n = new Notification("Welcome",{"tag":"Welcome","body":back.name+" is online"});
              	      	setTimeout(function(){n.close();},3000);
        }
    });

    socket.on('offline',function(back){
        refreshList(back.list);
        if (window.Notification && Notification.permission === "granted") {
            var n = new Notification("Goodbye",{"tag":"Goodbye","body":back.name+" is offline"});
              	      	setTimeout(function(){n.close();},3000);
        }
    });

    function refreshList(list){
        $("#onlinelist").html('');
        list.forEach(function(e) {
            $("#onlinelist").append("<li class='list-group-item' id='"+e+"'>"+e+"</li>");
        }, this);
    }
});

