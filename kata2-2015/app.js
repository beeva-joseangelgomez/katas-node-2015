'use strict';

const User = require("./User");
var user = new User();

user.onSaved(function (error, user) {
    if (error) {
        console.log("not saved: " + error);
    } else {
        console.log("saved: " + user.name);
    }
});
user.onErase(function (error, id) {
    if (error) {
        console.log("error on erase: " + error);
    } else {
        console.log("erased: " + id);
    }
});

user.save({name: "Jane Doe" + i, occupation: "manager"});
user.save({name: "John Jacob" + i, occupation: "developer"});

user.all();
user.compress();