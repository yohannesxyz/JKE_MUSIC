let userData = [
    {"id":1,"userName":"eric","password":"1234","playlist":[],"token":""},
    {"id":2,"userName":"kirubel","password":"1234","playlist":[],"token":""},
    {"id":3,"userName":"yohannes","password":"1234","playlist":[],"token":""}
];
let ID=userData[userData.length].id++;


module.exports = class{
    constructor(id,username,password,playlist,token) {
        this.id=id;
        this.username=username;
        this.password=password;
        this.playlist=playlist;
        this.token=token;
    }


    save(){
        this.id=ID++;
        userData.push(this);
        return this;
    }

    static login(username,password){
        let userIndex = userData.findIndex(user => user.username == username && user.password === password);
        if(userIndex>=0){
            userData[userIndex].token=Date.now()+"_"+userData[userIndex].userName;
        }
        else{
            throw new Error("There is no user with that user name and password!");
        }
    }

    static logout(id){
        let userIndex = userData.findIndex(user => user.id==id);
        if(userIndex>=0){
            userData[userIndex].token="";
        }
        else{
throw new error("There is no user with id: "+id);
        }
    }

}