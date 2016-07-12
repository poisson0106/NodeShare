$(function(){
    
    $("#sbmt").click(function (e) { 
        $("#login").submit();
    });

    $("#rgst").click(function(){
        $.blockUI({ 
            message: $('#reg'), 
        });
    });

    $("#rgstsbmt").click(function (e) { 
        $("#register").submit();
        
    });

    $("#close").click(function (e) { 
        $.unblockUI();
    });
})