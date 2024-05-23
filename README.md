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




# play

function playMusic(id, title) {
    const audioElement = document.querySelector('#music-play audio');
    const songTitle = document.getElementById('song-title-play');
    songTitle.innerHTML = title;
    audioElement.src = http://localhost:3000/songs/${id}.mp3;
    audioElement.play();
}

let playMode = ['shuffle', 'repeatPlaylist', 'repeatSong', 'shuffleOff'];
let currentModeIndex = 0;

function togglePlayMode() {
    currentModeIndex = (currentModeIndex + 1) % playMode.length;
    const mode = playMode[currentModeIndex];
    const switchModeBtn = document.getElementById('switch-mode');

    switch (mode) {
        case 'shuffle':
            switchModeBtn.innerHTML = '<img src="/images/shuffle.png" alt="Shuffle">';
            break;
        case 'repeatPlaylist':
            switchModeBtn.innerHTML = '<img src="/images/repeat-all.png" alt="Repeat Playlist">';
            break;
        case 'repeatSong':
            switchModeBtn.innerHTML = '<img src="/images/repeat-once.png" alt="Repeat Song">';
            break;
        case 'shuffleOff':
            switchModeBtn.innerHTML = '<img src="/images/normal-queue.png" alt="Shuffle Off">';
            break;
    }
}



# shuffle 

<section class="player-controls">
                <div class="controls">
                    <button class="control-btn" id="prev"><img src="/images/previous.png" alt="Previous"></button>
                    <button class="control-btn" id="pause"><img src="/images/play.png" alt="Pause"></button>
                    <button class="control-btn" id="next"><img src="/images/next.png" alt="Next"></button>
                </div>
                <div id="music-play">
                    <audio controls style="width: 21rem;"> 
                        <source id="audio-source" src="" type="audio/mpeg">
                    </audio>
                </div>
                <span class="song-title" id="song-title-play">Baby Baby</span>
                <button class="control-btn" id="switch-mode"><img src="/images/shuffle.png" alt="Switch Mode"></button>
            </section>