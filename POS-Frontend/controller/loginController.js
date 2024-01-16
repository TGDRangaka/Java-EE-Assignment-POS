import {User} from "../model/user.js"

$('#createAccLink').on('click', function(){
    $('form input').val('');
    $('#login-box').css('display', 'none');
    $('#signin-box').css('display', 'block');
});
$('#loginAccLink').on('click', function(){
    $('form input').val('');
    $('#login-box').css('display', 'block');
    $('#signin-box').css('display', 'none');
});

// Sign In action
$('#signInBtn').on('click', ()=>{
    let email = $('#sign-email').val();
    let username = $('#sign-username').val();
    let password = $('#sign-password').val();
    let user = new User(email, username, password);
    console.log(user);

    if(!email || !username || !password){
        Swal.fire({
            icon: 'error',
            title: 'Please fill all fields!'
        });
        return;
    }

    let settings = {
        "url": "http://localhost:8080/pos/user",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify(user),
      };

    $.ajax(settings).done(function (response) {
        // console.log(response);
        if(response == 'saved'){
            $('#loginAccLink').click();
            Swal.fire({
                icon: 'success',
                title: 'Account Created Succesfully! Now LogIn',
                showConfirmButton: false,
                timer: 1500
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Something Went Wrong!!!',
                text: message,
            });
        }
    });
})

// Log In action
$('#logInBtn').on('click', ()=>{
    let username = $('#login-username').val();
    let password = $('#login-password').val();

    if(!username || !password){
        Swal.fire({
            icon: 'error',
            title: 'Please enter both username and password!'
        });
        return;
    }

    let settings = {
        "url": `http://localhost:8080/pos/user?username=${username}&password=${password}`,
        "method": "GET",
        "timeout": 0,
      };

    $.ajax(settings).done(function (response) {
        // console.log(response);
        if(response == 'verified'){
            $('form input').val('');
            $("#nav_bar").css("display", "block");
            $("#dashboard-section").css("display", "block");
            $("#login-section").css("display", "none");
            $(".dashboard").click();

            Swal.fire({
                position: "top-end",
                icon: 'success',
                title: 'Log In  Succesfully',
                showConfirmButton: false,
                timer: 1500
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Username or Password are incorrect...!!!'
            });
        }
    });
})
