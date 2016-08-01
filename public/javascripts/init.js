$(function(){
    
    $("#sbmt").click(function (e) { 
        $("#login").submit();
    });

    $("#rgstsbmt").click(function (e) {
        var loading = "<i class='fa fa-spinner fa-pulse fa-3x fa-fw'></i><span class='sr-only'>Loading...</span>";
        $("#reg .modal-body form").hide();
        $("#reg .modal-body").append(loading);
        $("#register").submit();
        
    });

})