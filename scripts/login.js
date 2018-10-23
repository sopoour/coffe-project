var user1 = new User("Sophia", "sopoour", "sophia.auer@gmail.com", "1234");
var user2 = new User("Diana", "dianalemon", "diana@gmail.com", "5678");
var user3 = new User("Jan", "janhää", "jan@gmail.com", "4567");

var users = [];
users.push(user1, user2, user3);


function hideLogout() {
    document.getElementsByClassName("btnLogout").style.visibility = "hide";
}

var submit = document.getElementById("loginSubmit");
//the function shall be activated when user clicks on login button
submit.onclick = function () {
    var userName = document.getElementById("userName");
    var userPassword = document.getElementById("userPassword");
    var loginResult = document.getElementById("loginResult");
    for (var i = 0; i < users.length; i++) {
        if (userName.value === users[i].username && userPassword.value === users[i].password) {
            //open main filter page on same tab
            window.location = "index.html";

            /*before I tested it with window.open("index.html") which opens the index.html in a new tab.
            * Thereby I realized that on the login page it added still the text "Your password or username is incorrect..."
            * This makes sense since it is under else which means the loop will execute this in any case.
            * To avoid executing the else statement I've added now a break in the following so that the loop doesn't
            * execute further once the first if is true.*/
            //add a break so that the loop doesn't execute further
            return true;
        }
        else if (userName.value === "" || userPassword.value === "") {
            loginResult.innerHTML = "<br> <br>" + "Please type in both username and password!";
            break;
        }
        else {
            loginResult.innerHTML = "<br> <br>" + "Your password or username is incorrect. Please try again!";

        }

    }
};

function logoutStyle() {
    if (submit === true) {
        document.getElementById("btnLogin").style.display = "none";
        document.getElementById("btnLogout").style.display = "inline-block";
    }
}
