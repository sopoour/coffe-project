class Coffee {
    constructor(id, store, type, price) {
        this.id=id;
        this.store = store;
        this.type = type;
        this.price = price;
    }
}

class Store {
    constructor(name, homepage, picture) {
        this.name=name;
        this.homepage=homepage;
        this.picture=picture;
    }
}

class Favorite {
    constructor(userID, coffeeID) {
        this.userID=userID;
        this.coffeeID=coffeeID;
    }
}

class User {
    constructor(id, name, username, email, password) {
        this.id=id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

//USER OBJECTS
addUser(1, "Sophia", "sopoour", "sophia.auer@gmail.com", "_Ek~N_=vYfd.d8XJ");
addUser(2, "Diana", "dianalemon", "diana@gmail.com", "94Dg!mqPB+\\W]Wj)");
addUser(3, "Jan", "jaha", "jan@gmail.com", "j-f%4WjRK<JuNEv,");
addUser(4, "Henrik", "henny", "henrik@gmail.com", "5_[d<D%Ku<j~rCLp");
addUser(5, "Marten", "marty", "marten@gmail.com", "W3L[*TR4b9eZk@CY");
addUser(6, "Jan", "Jamey", "jan.a@gmail.com", "XYT.eZ*mMB'J#5s8");

//STORE OBJECTS
addStore("7-Eleven", "https://www.7-eleven.dk/", "img/seveneleven.jpg");
addStore("Upper Crust", "http://www.uppercrust-baguettes.com/", "img/uppercrust.jpg");
addStore("Dunkin Donuts", "http://www.dunkin-donuts.dk/", "img/dunkindonuts.jpg");
addStore("Joe & The Juice", "https://www.joejuice.com/", "img/joeandthejuice.jpg");
addStore("Lagkagehuset", "https://lagkagehuset.dk/", "img/lagkagehuset.jpg");

//COFFEE OBJECTS
addCoffee(1, stores[0], "Filter Coffee", 13);
addCoffee(2, stores[0], "Americano", 28);
addCoffee(3, stores[0], "Caffé Latte", 28);
addCoffee(4, stores[0], "Cappuccino", 28);
addCoffee(5, stores[0], "Espresso", 22);
addCoffee(6, stores[0], "Double Espresso", 28);
addCoffee(7, stores[0], "Iced Coffee", 20);
addCoffee(8, stores[1], "Americano", 25);
addCoffee(9, stores[1], "Espresso", 20);
addCoffee(10, stores[1], "Cappuccino", 32);
addCoffee(11, stores[1], "Caffé Latte", 32);
addCoffee(12, stores[2], "Americano", 27);
addCoffee(13, stores[2], "Espresso", 20);
addCoffee(14, stores[2], "Cappuccino", 35);
addCoffee(15, stores[2], "Caffé Latte", 35);
addCoffee(16, stores[2], "Filter Coffee", 25);
addCoffee(17, stores[3], "Caffé Latte", 30);
addCoffee(18, stores[3], "Cappuccino", 40);
addCoffee(19, stores[3], "Espresso", 25);
addCoffee(20, stores[3], "Iced Coffee", 40);
addCoffee(21, stores[4], "Caffé Latte", 45);
addCoffee(22, stores[4], "Americano", 37);
addCoffee(23, stores[4], "Espresso", 35);
addCoffee(24, stores[4], "Cappuccino", 45);
addCoffee(25, stores[4], "Caffé Latte", 40);
addCoffee(26, stores[4], "Double Espresso", 40);