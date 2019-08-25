$(document).ready(function () {
    getUsersList();
});

function getUsersList() {
    $.ajax({
        url: "http://localhost:3000/users",
        type: "GET",
        data: {},
        success: function (data) {
            if (data.success) {
                printUsersTable(data.data);
            } else {

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

function addUser() {

    let name = $("#name").val();
    let age = $("#age").val();
    let phone = $("#phone").val();

    $.ajax({
        url: `http://localhost:3000/users/adduser`,
        type: "PUT",
        data: {name:`${name}`, age:`${age}`, phone:`${phone}`},
        success: function (data) {
            if (data.success) {
                showHideMessage(data.message, true);
                getUsersList();
            } else {

            }
            console.log(data);
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

            }
            console.log(data);
        },
        error: function (xhr) {
            showHideMessage("Error: " + xhr.getMessage(), true);
            console.error(xhr);
        }
    });
}