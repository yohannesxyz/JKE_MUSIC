# JKE_MUSIC

client side{

-login page{
    -sends username, password
    - shows Error message if it doesnt match
    -saved the token in session if it matches
}
-music page{

    -displays playlist and all music
}



}
server side{
--userModel{
    Database for users{
        id
        username
        password
        playlist[]
        token{ current date time+username}
    }

--musiccontroller{
    -if the api doesnt bring the token or if the token doesnt match redirect to login page
}

--musicModel{
    -database for music
}

--apis
post login{
    -error
    -store token
}
get logout{
    -delete token
    -redirect to login
}
get music-list{
    -get all db
}

get playlist(id){
return the users playlist
}





}

}
thins to be done{

add to plylist
remove from playlist
play
icons{
    shuffle
    repeat playlist
    repeat song
    shuffle off

}