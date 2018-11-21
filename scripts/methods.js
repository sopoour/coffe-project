/*
Global Arrays
*/
var coffees = [];
var stores = [];
var favorites = [];
var users = [];
/*
ADD FUNCTIONS
*/
function addCoffee(id,store, type, price) {
    var coffee = new Coffee(id,store, type, price);
    coffees.push(coffee);
}

function addUser(name, username, email, password, favorites) {
    var user = new User(name, username, email, password, favorites);
    users.push(user);
}

function addStore(name, homepage, picture) {
    var store = new Store(name, homepage, picture);
    stores.push(store);
}

function addFavorite(coffeeID) {
    //Get Favorites from LS
    var favorites = JSON.parse(localStorage.getItem("favorites"));
    if(!favorites) {
        var favorites = [];
        var favorite = new Favorite(currentUser.id, coffeeID);
        favorites.push(favorite);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    else {
        //Save Favorite
        var favorite = new Favorite(currentUser.id, coffeeID);
        favorites.push(favorite);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    alert('Favorite is added successfully. Yey so happy.');
    location.reload();
}

/*
GET FUNCTIONS
*/
function getCoffees() {
    return coffees;
}

function getUsers() {
    return users;
}

function getFavorites() {
    var output = [];
    //Get Favorites from Local Storage
    var favorites = JSON.parse(localStorage.getItem("favorites"));
    if (!favorites) {
        return output;
    }
    for (var x = 0; x < favorites.length; x++) {
        if (favorites[x].userID === getCurrentUser().id) {
            output.push(favorites[x]);
        }
    }
    return output;
}

function getStores() {
    return stores;
}

/*
* REMOVE FUNCTIONS
*/

//INPUT: coffee object
function removeFavorite(coffeeID) {
    //Get favorites
    var favorites = JSON.parse(localStorage.getItem("favorites"));
    //Find favorite with combination of current user & coffee (based on id)
    for(var x=0;x<favorites.length;x++) {
        if (favorites[x].coffeeID === coffeeID) {
            //Found it, delete it
            favorites.splice(x,1);
        }
    }
    //Push updated favorites to LS
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Removed the coffee from your favorites. Please keep me in mind, i am super delicious.");
    location.reload();
}

/*
CURRENT USER (LocalStorage)
*/
function saveUser(user) {
    //encrypt password in currentUser
    user.password = window.btoa(user.password);
    //save loggedIn user as currentUser in localStorage
    //since it is an object you need first stringify so that it actually shows everything in "value" what is inside of the object
    localStorage.setItem("currentUser", JSON.stringify(user));
}
function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
}

var currentUser = getCurrentUser();


/*
* POPUP
*/

function modalContent(ci) {
    var title = document.getElementById("popUpTitle");
    var body = document.getElementById("popUpBody");
    title.innerHTML = coffees[ci].store.name;
    //body.innerHTML = coffees[ci].store.picture;
    body.innerHTML = coffees[ci].store.homepage;
}

function createModal(container, ci) {
    //Whole modal
    var modal = document.createElement("DIV");
    modal.setAttribute("class", "modal fade");
    modal.setAttribute("role", "dialog");
    var modalDialog = document.createElement("DIV");
    modalDialog.setAttribute("class", "modal-dialog");
    //Content of Modal
    var modalContent = document.createElement("DIV");
    modalContent.setAttribute("class", "modal-content");
    //Header with cross button
    var modalHeader = document.createElement("DIV");
    modalHeader.setAttribute("class", "modal-header");
    var crossBtn = document.createElement("BUTTON");
    crossBtn.setAttribute("type", "button");
    crossBtn.setAttribute("class", "close");
    crossBtn.setAttribute("data-dismiss", "modal");
    crossBtn.innerHTML = "&times;";
    //Title
    var modalTitle = document.createElement("H4");
    modalTitle.setAttribute("class", "modal-title");
    modalTitle.setAttribute("id", "popUpTitle" + ci);
    //Body
    var modalBody = document.createElement("DIV");
    modalBody.setAttribute("class", "modal-body");
    modalBody.setAttribute("id", "popUpBody" + ci);
    var modalText = document.createElement("P");
    //Footer with Close Button
    var modalFooter = document.createElement("DIV");
    modalFooter.setAttribute("class", "modal-footer");
    var closeBtn = document.createElement("BUTTON");
    closeBtn.setAttribute("type", "button");
    closeBtn.setAttribute("class", "btn btn-default");
    closeBtn.setAttribute("data-dismiss", "modal");
    closeBtn.innerHTML = "Close";

    //Append
    container.appendChild(modal);
    modal.appendChild(modalDialog);
    modalDialog.appendChild(modalContent);
    modalContent.appendChild(modalHeader);
    modalHeader.appendChild(crossBtn);
    modalHeader.appendChild(modalTitle);
    modalContent.appendChild(modalBody);
    modalBody.appendChild(modalText);
    modalContent.appendChild(modalFooter);
    modalFooter.appendChild(closeBtn);
}

