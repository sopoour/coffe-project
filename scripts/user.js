//storing existing users
addUser("Sophia", "sopoour", "sophia.auer@gmail.com", "1234", []);
addUser("Diana", "dianalemon", "diana@gmail.com", "5678", []);
addUser("Jan", "jaha", "jan@gmail.com", "123", []);
var users = getUsers();

var authUser = document.getElementById("loginSubmit");
//the function shall be activated when user clicks on login button
//try..catch function to ignore null error
try {
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
                //store users in localStorage with the changed status of loggedIn
                //since it is an object you need first stringify so that it actually shows everything in "value" what is inside of the object

                //saves the user in local storage

                saveUser(users[i]);
                //open main filter page on same tab
                window.location = "index.html";
            }
        }
        //this will only happen when the program checked all the users and tempIndex was never set to i but still set to initial -1
        if (tempIndex === -1) {
            loginResult.innerHTML = "<br> <br>" + "Your password or username is incorrect. Please try again!";
        }
    };
} catch (err) {
    console.log("Null caught");
}

/*
try {
    authUser.onclick;
} catch (err){
    console.log("NUll Error is caught");
}
*/
function changePage() {
    //if currentUser exists in localStorage change my index file (adding logout button etc.)
    if (currentUser) {
        document.getElementById("btnLogin").style.visibility = "hidden";
        document.getElementById("btnFavoriteList").style.visibility = "visible";
        document.getElementById("btnLogout").style.visibility = "visible";
        //add name of user after Welcome when logged in
        document.getElementById("userNameInput").innerHTML = currentUser.name;
    }
}

//so that you can't go back to login and login again, redirect immediatley back to index.html
function preventLogin() {
    if (currentUser) {
        window.location = "index.html";
    }
}

function logout() {
    //in case currentUser is loggedIn
    if (currentUser) {
        localStorage.clear();
        document.getElementById("btnLogin").style.visibility = "visible";
        document.getElementById("btnLogout").style.visibility = "hidden";
        document.getElementById("btnFavoriteList").style.visibility = "hidden";
        document.getElementById("userNameInput").innerHTML = "";
        document.getElementById("overlay").style.display = "block";
        var logoutMessage = document.getElementById("logoutMessage");
        logoutMessage.innerHTML = "You are successfully logged-out! See you soon :)";

    }
}

//when click on background of logout message, message disappears
function off() {
    document.getElementById("overlay").style.display = "none";
    //so that especially the tables are reloaded and user can start from scratch
    location.reload();
}

