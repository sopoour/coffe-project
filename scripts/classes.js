function Coffee(store, type, price) {
    this.store = store;
    this.type = type;
    this.price = price;
}

function Store(name,homepage,picture) {
    this.name=name;
    this.homepage=homepage;
    this.picture=picture;
}

function Favorite(user,coffee) {
    this.user=user;
    this.coffee=coffee;
}

function User(name,username,email,password) {
    this.name=name;
    this.username=username;
    this.email=email;
    this.password=password;
}