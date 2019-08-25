$(document).ready(function(){
    $(".cover").on("click",function(){
        $(".add-user-form,.cover").toggle(500);
    });
    //var token = localStorage.
    //getUsersFromServer();
});

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

function showRegForm(){
    $(".add-user-form,.cover").toggle(500);
}

function bigloginbutton(x){
    if(x == 1){
    $("#loginbutton").addClass("btn-lg");
    }else{
        $("#loginbutton").removeClass("btn-lg");
    }
}

function bigregbutton(x){
    if(x == 1){
        $("#regbutton").addClass("btn-lg");
                }
    else
    {
        $("#regbutton").removeClass("btn-lg");
    }
}

function login(){

    var user = $("#user").val();
    var password = $("#password").val();

    $.ajax({
        url:'http://localhost:3000/users/login',
        type:"POST",
        data:{"user": user, "password": password
    },
        success:function( result ){
            if(result.success){
                showHideMessage(result.message, true);
                wait(3000);
                window.location.replace(result.redirect);
            }
            else{
                showHideMessage(result.message, true)
            }

        },
        error:function( xhr ){
            showHideMessage(result.message, true)
            console.log("Ajax Func");
            console.log("Error:",xhr);
        }
    });
}

function RegisterUser(){
    var password = $("#passwordforregister").val();
    var user = $("#userforregister").val();

    $.ajax({
        url:'http://localhost:3000/users/adduser',
        type:"PUT",
        data:{"password": password,
              "user": user
    },
        success:function( result ){

            showHideMessage(data.message, true);
            getUsersList();
        },
        error:function( xhr ){
            showHideMessage()
            console.log("Ajax Func");
            console.log("Error:",xhr);
        }
    });    
}

function showHideMessage(msg, show) {
    if (show == true) {
        $("#user_message").html(msg)
        $("#user_message").show(500);
    } else {
        $("#user_message").text("");
        $("#user_message").hide(700);
    }
}