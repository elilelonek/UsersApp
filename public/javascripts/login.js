$(document).ready(function(){
    CheckIfLogin()
});

function CheckIfLogin(){
    $.ajax({
        url:'http://localhost:3000/api/users',
        type:"GET",
        data:{},
        success:function( result ){
            if(result.success){
                $("#successLogin").show();
                $('body').fadeOut(50, function(){
                    $('body')
                        .empty()
                        window.location.replace(result.redirect)
                        $('#successLogin').remove();
                    })
            }
            else{

            }
        },
        error:function( xhr ){
            console.log("Ajax Func");
            console.log("Error:",xhr);
        }
    });
}

function login(){

    var password = $("#password").val();
    var user = $("#user").val().toLowerCase();

    if(user.length == 0 || password.length == 0){
        msg = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>The username or password is empty!</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>`
        showHideMessage(msg, true)
    }
    else{
    $.ajax({
        url:'http://localhost:3000/api/users/login',
        type:"POST",
        data:{"name": user, "password": password},
        success:function( result ){
            if(result.success){
                $("#failureLogin").remove();
                $("#successLogin").show();
                showHideMessage(result.message, true);
                $('body').fadeOut(4500, function(){
                    $('body')
                        .empty()
                        window.location.replace(result.redirect)
                        .fadeIn(5000);
                        $('#successLogin').remove();
                    })
            }
            else{
                showHideMessage(result.message, true);
            }
        },
        error:function( xhr ){
            showHideMessage(result.message, true)
            console.log("Ajax Func");
            console.log("Error:",xhr);
        }
    });
}
}

function RegisterUser(){
    var password = $("#passwordforregister").val();
    var user = $("#userforregister").val().toLowerCase();
    var age = $("#ageregister").val();
    var phone = $("#phoneforregister").val();

    if(user.length == 0 || password.length == 0 || age.length == 0 || phone.length == 0){
        msg = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>One of the fields is empty!</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>`
        showHideMessage_RegUser(msg, true)
    }
    else{
        $.ajax({
            url:'http://localhost:3000/api/users/registeruser',
            type:"PUT",
            data:{"password": password, "name": user, "age": age, "phone": phone},
            success:function( result ){
                $(function () {
                    $('#regmodal').modal('toggle');
                 });
                showHideMessage(result.message, true);
                $(".add-user-form,.cover").fadeOut(2000)
            },
            error:function( xhr ){
                showHideMessage_RegUser(result.message, true);
                console.log("Ajax Func");
                console.log("Error:",xhr);
            }
        });
    }
}

function showHideMessage(msg, show) {
    if (show == true) {
        $("#user_message").html(msg)
        $("#user_message").show(500);
    } else {
        $("#user_message").text("");
        $("#user_message").hide(500);
    }
}

function showHideMessage_RegUser(msg, show) {
    if (show == true) {
        $("#Reg_user_message").html(msg)
        $("#Reg_user_message").show(500);
    } else {
        $("#Reg_user_message").text("");
        $("#Reg_user_message").hide(500);
    }
}