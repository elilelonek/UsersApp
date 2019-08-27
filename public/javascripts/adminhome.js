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
              printUsersTable(result.data, result.AdminUsers);
          } else {

          }
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

function printUsersTable(users, AdminUsers) {
  let html = "";
  let htmladmin = ";"

  users.map((user) => {
      html += `<tr>
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.age}</td>
          <td>${user.phone}</td>
          <td><i class='fa fa-trash' onclick='deleteUser(${user.id})'></i></td>
              </tr>`;
  });

  AdminUsers.map((user) => {
    htmladmin += `<tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td><i class='fa fa-trash' onclick='deleteAdmin(${JSON.stringify(user)})'></i></td>
            </tr>`;
});

  $("#users_table tbody").html(html);
  $("#admin_table tbody").html(htmladmin);
}

function addUser(){

    let user = $("#name").val().toLowerCase();
    let age = $("#age").val();
    let phone = $("#phone").val();
    let password = $("#password").val();

    if(user.length == 0 || password.length == 0 || age.length == 0 || phone.length == 0){
        msg = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>One of the fields is empty!</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>`
        showHideMessage(msg, true)
        $("#failureLogin").show(500);
    }
    else{
        var isAdmin = document.getElementById('admin').checked

        if(isAdmin){
        
                let name = $("#name").val().toLowerCase();
                let age = $("#age").val();
                let phone = $("#phone").val();
                let password = $("#password").val();
              
                $.ajax({
                    url: `http://localhost:3000/users/addadminuser`,
                    type: "PUT",
                    data: {name:`${name}`, age:`${age}`, phone:`${phone}`, password:`${password}`},
                    success: function (data) {
                        if (data.success) {
                            showHideMessage(data.message, true);
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
        else{
        
                let name = $("#name").val().toLowerCase();
                let age = $("#age").val();
                let phone = $("#phone").val();
                let password = $("#password").val();
              
                $.ajax({
                    url: `http://localhost:3000/users/adduser`,
                    type: "PUT",
                    data: {name:`${name}`, age:`${age}`, phone:`${phone}`, password:`${password}`},
                    success: function (data) {
                        if (data.success) {
                            showHideMessage(data.message, true);
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
    }
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

function deleteAdmin(user) {
    $.ajax({
        url: `http://localhost:3000/users/deleteadmin`,
        type: "DELETE",
        data: {user_id:`${user.id}`, user_name:`${user.name}`},
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