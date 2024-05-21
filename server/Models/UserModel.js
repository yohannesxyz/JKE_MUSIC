let userData = [
    {"id":1,"username":"eric","password":"1234","playlist":[],"token":""},
    {"id":2,"username":"kirubel","password":"1234","playlist":[],"token":""},
    {"id":3,"username":"yohannes","password":"1234","playlist":[],"token":""}
];
let lastUser=userData[userData.length-1].id;
let ID=lastUser;



module.exports = class{
    constructor(id,username,password,playlist,token) {
        this.id=id;
        this.username=username;
        this.password=password;
        this.playlist=playlist;
        this.token=token;
    }


    save(){
        this.id=++ID;
        this.token=Date.now()+"_"+this.username;
        userData.push(this);
        return this;
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