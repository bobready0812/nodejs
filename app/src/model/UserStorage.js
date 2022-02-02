"use strict"


const fs = require("fs").promises;

class UserStorage {
    static #getUserInfo(data, id) {
        const users = JSON.parse(data);
        const idx = users.id.indexOf(id);
        const userInfo = Object.keys(users).reduce((newUser, info) => {
        newUser[info] = users[info][idx];
        return newUser;
        }, {});
    
        return userInfo;
        
    }

    static #getUsers(data, fields) {
        const users = JSON.parse(data);
        const newUsers = fields.reduce((newUsers, field) => {
            if(users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        },{});
        
        return newUsers;

    }

    static getUser(isAll, ...fields) {
        return fs.readFile("./src/databases/users.json")
        .then((data) => {
          return this.#getUsers(data, fields);
       
        })
        .catch(console.error);
    
    }

    static getUserInfo(id) {
 return fs.readFile("./src/databases/users.json")
 .then((data) => {
   return this.#getUserInfo(data, id);

 })
 .catch(console.error);


  
}



static async save(userInfo) {
    const users = await this.getUser(true);
    console.log(users);
    fs.writeFile("./src/databases/users.json", JSON.stringify(users));
} 
}


module.exports = UserStorage;