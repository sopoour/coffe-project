//storing existing users

var user1 = new User("Sophia", "sopoour", "sophia.auer@gmail.com", "1234", false);
var user2 = new User("Diana", "dianalemon", "diana@gmail.com", "5678", false);
var user3 = new User("Jan", "janhää", "jan@gmail.com", "4567", false);
//push all user in one array
var users = [];
users.push(user1, user2, user3);

/*
adduser("Sophia", "sopoour", "sophia.auer@gmail.com", "1234", false);
adduser("Diana", "dianalemon", "diana@gmail.com", "5678", false);
adduser("Jan", "janhää", "jan@gmail.com", "4567", false);
var users = getUsers();
*/
var submit = document.getElementById("loginSubmit");
//the function shall be activated when user clicks on login button
submit.onclick = function () {
    var userName = document.getElementById("userName");
    var userPassword = document.getElementById("userPassword");
    var loginResult = document.getElementById("loginResult");
    //temporary index to check if my user exists or not
    var tempIndex = -1;

    //first check if either one of the inputs is empty
    if (userName.value === "" || userPassword.value === "") {
        loginResult.innerHTML = "<br> <br>" + "Please type in both username and password!";
        //return false to get out of the function and wait for a new action
        return false;
    }
    for (var i = 0; i < users.length; i++) {
        // users[i].username/.password to check that the same user is compared
        if (userName.value === users[i].username && userPassword.value === users[i].password) {
            //if username and password match set tempIndex to it's actual index
            tempIndex = i;
            users[i].loggedIn = true;
            //store users in localStorage with the changed status of loggedIn
            //since it is an object you need first stringify so that it actually saves everything what is inside of the object
            var userString = JSON.stringify(users[i]);
            //saves the user in local storage with key "user" and value = userString
            localStorage.setItem("user-" + i, userString);
            //open main filter page on same tab
            window.location = "index.html";
        }
    }
    //this will only happen when the program checked all the users and tempIndex was never set to i but still set to initial -1
    if (tempIndex === -1) {
        loginResult.innerHTML = "<br> <br>" + "Your password or username is incorrect. Please try again!";
    }
};

function changeButtons() {
    for (var i = 0; i < users.length; i++) {
        var loggedInUser = localStorage.getItem("user-" + i);
        JSON.parse(loggedInUser);
        if (loggedInUser.loggedIn === true) {
            document.getElementById("btnLogin").style.visibility = "hidden";
            document.getElementById("btnLogout").style.visibility = "visible";
        }

    }

}

window.onload = changeButtons;
