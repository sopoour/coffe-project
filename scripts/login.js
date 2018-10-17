var user1 = new User("Sophia", "sophiaaa", "sophia.auer@gmail.com", "1234");
var user2 = new User("Diana", "dianalemon", "diana@gmail.com", "5678");
var user3 = new User("Jan", "janhää", "jan@gmail.com", "4567");

var users = [];
users.push(user1, user2, user3);

var submit = document.getElementById('login');
submit.onclick = function () {
    var userName = document.getElementById("username");
    var userPassword = document.getElementById("userpassword");
    var loginresult = document.getElementById("loginResult");
    for (i = 0; i < objPeople.length; i++) {
        if (userName.value === objPeople[i].name && userPassword.value === objPeople[i].password) {
            window.open("redirect.html", "_blank");
            return;
        }
        else if (userName.value === "" || userPassword.value === "") {
            loginresult.innerHTML = "<br> <br>" + "Please type in both username and password!";

        }
        else {
            loginresult.innerHTML = "<br> <br>" + "Your password or username is incorrect. Please try again!";

        }

    }


}