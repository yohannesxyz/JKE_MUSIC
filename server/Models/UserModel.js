let userData = require('../Database/Users');

let lastUser = userData[userData.length-1].id;

let ID=lastUser;



module.exports = class User {
constructor(id,username,password,playlist,token) {
        this.id=id;
        this.username=username;
        this.password=password;
        this.playlist=playlist;
        this.token=token;
    }


    save(){
let newUserName = userData.findIndex(u=>u.username==this.username);
        if(newUserName==-1){
        this.id=++ID;
        this.token=Date.now()+"_"+this.username;
        this.playlist=[];
        userData.push(this);
        return this;
        }
        else{
            throw new Error('There is a user name already present in system')
        }
    }

    static login(username,password){
        let userIndex = userData.findIndex(user => user.username == username && user.password === password);
        if(userIndex>=0){
            userData[userIndex].token=Date.now()+"_"+userData[userIndex].username;
            return userData[userIndex];
        }
        else{
            throw new Error("There is no user with that user name and password!");
        }
    }

    static logout(id){
        let userIndex = userData.findIndex(user => user.id==id);
        if(userIndex>=0){
            userData[userIndex].token="";
            return 'user logged out';
        }
        else{
throw new error("There is no user with id: "+id);
        }
    }

}