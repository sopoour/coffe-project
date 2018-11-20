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

/**
 * returns coffee object based on given id.
 * returns null if no coffee object with given id exists.
 */
function findCoffee(id) {
    for(var x=0;x<coffees.length;x++) {
        if(coffees[x].id == id) {
            return coffees[x];
        }
    }
    return null;
}

/**
 *  Adds a Favorite 
 * Input: coffee ID (not a coffee object)
 * */
function addFavorite(coffeeID) {
    //Get Favorites from Local Storage
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

/**
 * Removes favorite
 * INPUT: coffee object
 */
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

function addStore(name, homepage, picture) {
    var store = new Store(name, homepage, picture);
    stores.push(store);
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
    var favorites =  JSON.parse(localStorage.getItem("favorites"));
    if(!favorites) {
        return output;
    }
    for(var x=0;x<favorites.length;x++) {
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

//var userfavcounter = currentUser.favorites.length;
var x = document.getElementById("favCounter").innerHTML = '(' + getFavorites().length + ')';
//var x = 0;

//POPUP

function modalContent(ci) {
    var title = document.getElementById("popUpTitle");
    var body = document.getElementById("popUpBody");
    title.innerHTML = coffees[ci].store.name;
    //body.innerHTML = coffees[ci].store.picture;
    body.innerHTML = coffees[ci].store.homepage;
}

function createModal(container, ci) {
    var modal = document.createElement("DIV");
    modal.setAttribute("class", "modal fade");
    modal.setAttribute("role", "dialog");
    container.appendChild(modal);
    var modalDialog = document.createElement("DIV");
    modalDialog.setAttribute("class", "modal-dialog");
    modal.appendChild(modalDialog);
    var modalContent = document.createElement("DIV");
    modalContent.setAttribute("class", "modal-content");
    modalDialog.appendChild(modalContent);
    var modalHeader = document.createElement("DIV");
    modalHeader.setAttribute("class", "modal-header");
    modalContent.appendChild(modalHeader);
    var crossBtn = document.createElement("BUTTON");
    crossBtn.setAttribute("type", "button");
    crossBtn.setAttribute("class", "close");
    crossBtn.setAttribute("data-dismiss", "modal");
    crossBtn.innerHTML = "&times;";
    var modalTitle = document.createElement("H4");
    modalTitle.setAttribute("class", "modal-title");
    modalTitle.setAttribute("id", "popUpTitle" + ci);
    modalHeader.appendChild(crossBtn);
    modalHeader.appendChild(modalTitle);
    var modalBody = document.createElement("DIV");
    modalBody.setAttribute("class", "modal-body");
    modalBody.setAttribute("id", "popUpBody" + ci);
    modalContent.appendChild(modalBody);
    var modalText = document.createElement("P");
    modalBody.appendChild(modalText);
    var modalFooter = document.createElement("DIV");
    modalFooter.setAttribute("class", "modal-footer");
    modalContent.appendChild(modalFooter);
    var closeBtn = document.createElement("BUTTON");
    closeBtn.setAttribute("type", "button");
    closeBtn.setAttribute("class", "btn btn-default");
    closeBtn.setAttribute("data-dismiss", "modal");
    closeBtn.innerHTML = "Close";
}