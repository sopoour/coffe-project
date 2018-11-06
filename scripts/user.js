//storing existing users
var user1 = new User("Sophia", "sopoour", "sophia.auer@gmail.com", "1234", false);
var user2 = new User("Diana", "dianalemon", "diana@gmail.com", "5678", false);
var user3 = new User("Jan", "janhää", "jan@gmail.com", "4567", false);
//push all user in one array
var users = [];
users.push(user1, user2, user3);

/*
addUser("Sophia", "sopoour", "sophia.auer@gmail.com", "1234", false);
addUser("Diana", "dianalemon", "diana@gmail.com", "5678", false);
addUser("Jan", "janhää", "jan@gmail.com", "4567", false);
var users = getUsers();
*/
var authUser = document.getElementById("loginSubmit");
//the function shall be activated when user clicks on login button
authUser.onclick = function () {
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
            //change the loggedIn status of respective user from false to true so that I can see which user is loggedIn
            users[i].loggedIn = true;
            //store users in localStorage with the changed status of loggedIn
            //since it is an object you need first stringify so that it actually shows everything in "value" what is inside of the object
            var userString = JSON.stringify(users[i]);
            //saves the user in local storage
            localStorage.setItem("currentUser", userString);
            //open main filter page on same tab
            window.location = "index.html";
        }
    }
    //this will only happen when the program checked all the users and tempIndex was never set to i but still set to initial -1
    if (tempIndex === -1) {
        loginResult.innerHTML = "<br> <br>" + "Your password or username is incorrect. Please try again!";
    }
};

function changePage() {
    //get stored user
    var currentUser = getCurrentUser();
    //check if true --> CHECK IF THIS IS NEEDEED
    if (currentUser.loggedIn === true) {
        document.getElementById("btnLogin").style.visibility = "hidden";
        document.getElementById("btnLogout").style.visibility = "visible";
        //add name of user after Welcome when logged in
        document.getElementById("userNameInput").innerHTML = currentUser.name;
    }
}

//so that you can't go back to login and login again, redirect immediatley back to index.html
function preventLogin() {
    var currentUser = getCurrentUser();
    if (currentUser.loggedIn === true) {
        window.location = "index.html";
    }
}

function logout() {
    //get currentUser from localStorage
    var currentUser = getCurrentUser();
    //in case currentUser is loggedIn
    if (currentUser.loggedIn === true) {
        localStorage.clear();
        document.getElementById("btnLogin").style.visibility = "visible";
        document.getElementById("btnLogout").style.visibility = "hidden";
        document.getElementById("userNameInput").innerHTML = "";
        document.getElementById("overlay").style.display = "block";
        var logoutMessage = document.getElementById("logoutMessage");
        logoutMessage.innerHTML = "You are successfully logged-out! See you soon :)";

    }
}

//when click on background of logout message, message disappears
function off() {
    document.getElementById("overlay").style.display = "none";
}

