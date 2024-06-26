const uuid = require("uuid");
const userData = require('../Database/Users');
let musicDb = require('../Database/MusicDB');


module.exports = class Music {

    constructor(id, title, genre, artist) {
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.artist = artist;
    }

    static getAll() {
        return musicDb;
    }

    static getPlaylist(userToken) {
        let authUser = userData.find(user => user.token == userToken);
        
          

        if (authUser) {
            return musicDb.filter(mu => authUser.playlist.includes(mu.id));
        } else {
            throw new Error(`No music found with Id:`+userData[0].id);
        }
    }

    static getMusicById(id) {
        const music = musicDb.find(b => b.id === id);
        if (music) {
            return music;
        } else {
            throw new Error(`No music found with Id: ${id}`);
        }
    }

    static addToPlaylist(id, userToken) {

        
        let authUser = userData.find(user => user.token == userToken);
        

       
        const music = musicDb.find(b => b.id == id);

        

        if (music) {

            if (authUser) {

                userData.find(user => user.token == userToken).playlist.push(parseInt(id));
                
               
                return music;

            }else {

            throw new Error(`No user authenticated`);
    
            }

        } else {
            throw new Error(`No music found with Id: ${id}`);
        }  
    }

    static deleteFromPlaylist = (id, userToken) => {

        let authUser = userData.find(user => user.token == userToken);

        const index = authUser.playlist.findIndex(b => b == id);
        
        if (index > -1) {
            
            authUser.playlist.splice(index, 1);
            const mus = musicDb.find(m => m.id == id);
            return mus;
        } else {
            throw new Error(`No music found with Id: ${id}`);
        }
    }



    static deleteById(id) {
        const index = musicDb.findIndex(b => b.id === id);
        if (index > -1) {
          
            const temp = books[index];
            musicDb.splice(index, 1);
            return temp;
        } else {
            throw new Error(`No music found with Id: ${id}`);
        }
    }


}