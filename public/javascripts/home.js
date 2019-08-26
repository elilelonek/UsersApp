$(document).ready(function () {
    getUsersList();
  });
  
  function getUsersList() {
    $.ajax({
        url: "http://localhost:3000/users",
        type: "GET",
        data: {},
        success: function (result) {
            if (result.success) {
                printUsersTable(result.data);
                console.log(result.data);
            } else {
  
            }
            console.log(result.data);
        },
        error: function (xhr) {
            showHideMessage("Error: " + xhr.getMessage(), true);
            console.error(xhr);
        }
    });
  }
  
  function deleteUser(user_id) {
    $.ajax({
        url: `http://localhost:3000/users/deleteuser`,
        type: "DELETE",
        data: {user_id:`${user_id}`},
        success: function (data) {
            showHideMessage(data.message, true);
            if (data.success) {
                getUsersList();
            } else {
              showHideMessage(data.message, true);
            }
            console.log(data);
        },
        error: function (xhr) {
            showHideMessage("Error: " + xhr.getMessage(), true);
            console.error(xhr);
        }
    });
  }

  function showHideMessage(msg, show) {
    if (show == true) {
        $("#user_message").html(msg)
        $("#user_message").show(700);
    } else {
        $("#user_message").text("");
        $("#user_message").hide(700);
    }
  }
  
  function printUsersTable(users) {
    let html = "";
  
    users.map((user) => {
        html += `<tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.age}</td>
            <td>${user.phone}</td>
            <td><i class='fa fa-trash' onclick='deleteUser(${user.id})'></i></td>
                </tr>`;
    });
  
    $("#users_table tbody").html(html);
  }

  function logout(){

    $.ajax({
        url: `http://localhost:3000/users/deletesession`,
        type: "DELETE",
        data: {},
        success:function( result ){
            if(result.success){
                $('#abovespinner').append(`<h3 class="alert alert-warning alert-dismissible fade show" "style="margin-top:50px;left: calc( 50% - 50px);z-index: 1000;position: fixed;">User has been Logged Out!</h3>`)
                $('#myspinner').append(`<i class="fas fa-spinner fa-spin fa-7x" style="margin-top:50px;left: calc( 50% - 50px);z-index: 1000;position: fixed;"></i>`)
                showHideMessage(result.message, true);
                $('body').fadeOut(4000, function(){
                    $('body')
                        .empty()
                        window.location.replace(result.redirect)
                        .fadeIn(4500);
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