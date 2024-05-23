let playMode = ['shuffle', 'repeatPlaylist', 'repeatSong', 'shuffleOff'];
let currentModeIndex = 0;
let currentPlaylist = [];
let allSongs = [];
let songlist = true
let currentMusic = 0;
let typeOfsequence = 0;
let icons = ['normal-queue','repeat-all','repeat-once','shuffle'];

function togglePlayMode() {
    currentModeIndex = (currentModeIndex + 1) % playMode.length;
    const mode = playMode[currentModeIndex];
    const switchModeBtn = document.getElementById('switch-mode');

    switch (mode) {
        case 'shuffle':
            typeOfsequence = 3;
            switchModeBtn.innerHTML = '<img src="/images/shuffle.png" alt="Shuffle">';
            break;
        case 'repeatPlaylist':
            typeOfsequence = 1;
            switchModeBtn.innerHTML = '<img src="/images/repeat-all.png" alt="Repeat Playlist">';
            break;
        case 'repeatSong':
            typeOfsequence = 2;
            switchModeBtn.innerHTML = '<img src="/images/repeat-once.png" alt="Repeat Song">';
            break;
        case 'shuffleOff':
            typeOfsequence = 0;
            switchModeBtn.innerHTML = '<img src="/images/normal-queue.png" alt="Shuffle Off">';
            break;
    }
}

window.onload = function () {
    loadPlaylist();
    loadMusic();
    document.getElementById('logoutbtn').onclick = Logout;
};

function playNext(id,mlist) {
    let xing = mlist ? currentPlaylist: allSongs;
    let index = xing.findIndex(p => p.id == id);
    switch (typeOfsequence) {
        case 0: 
            if( ++index != xing.length ){
                playMusic(xing[index].title, xing[index].id,mlist,false, typeOfsequence);
            }
            
            break;
        case 1: // repeat playlist
            index = (index + 1) % xing.length;
            playMusic(xing[index].title, xing[index].id ,mlist,false, typeOfsequence);
            break;
        case 2: // repeat song
            playMusic(xing[index].title, xing[index].id ,mlist,false, typeOfsequence);
            break;
        case 3: // shuffle
            if (xing.length == 1) {
                playMusic(xing[index].title, xing[index].id,mlist,false,typeOfsequence);
            }else {
                let randomIndex;
                do {
                    randomIndex = Math.floor(Math.random() * xing.length);
                } while (randomIndex === index);
                playMusic(xing[randomIndex].title, xing[randomIndex].id,mlist, false, typeOfsequence);
            }
            break;
    }
}



function playPrev(id, mlist) {
    let xing = mlist ? currentPlaylist: allSongs;
    let index = xing.findIndex(p => p.id == id);
    switch (typeOfsequence) {
        case 0: // normal sequence
            if (--index >= 0) {
                playMusic(xing[index].title, xing[index].id,mlist, false, typeOfsequence);
            }
            break;
        case 1: // repeat playlist
            index = (index - 1 + xing.length) % xing.length;
            playMusic(xing[index].title, xing[index].id,mlist, false, typeOfsequence);
            break;
        case 2: // repeat song
            playMusic(xing[index].title, xing[index].id,mlist, false, typeOfsequence);
            break;
        case 3: // shuffle
            if (xing.length == 1) {
                playMusic(xing[index].title, xing[index].id,mlist, false, typeOfsequence);
            } else {
                let randomIndex;
                do {
                    randomIndex = Math.floor(Math.random() * xing.length);
                } while (randomIndex === index);
                playMusic(xing[randomIndex].title, xing[randomIndex].id,mlist, false, typeOfsequence);
            }
            break;
    }
}




function playMusic(title, id, musicList = false, first = false, icon = 0) {

    
    currentMusic = id;
    const musicSection = document.getElementById('play-section');
    const autoPlay = first ? "" : "autoplay";
    
    

    let html = `<section class="player-controls" >
        <div class="controls">
            <button class="control-btn" id="prev" onclick="playPrev(${id},${musicList})"><img src="/images/previous.png" alt="Previous"></button>
            
            <button class="control-btn" id="next" onclick="playNext(${id},${musicList})"><img src="/images/next.png" alt="Next"></button>
        </div>
        <div id="music-play">
            <audio controls style="width: 40vw;" ${autoPlay} id="audio-player" onended="playNext(${id},${musicList})"> 
                <source id="audio-source" src="http://localhost:3000/songs/${title}.mp3" type="audio/mpeg">
            </audio>
        </div>
        <span class="song-title" id="song-title-play">${title}</span>
        <button class="control-btn" id="switch-mode" onclick="togglePlayMode()"><img src="/images/${icons[icon]}.png" alt="Switch Mode"></button>
    </section>`;
    musicSection.innerHTML = html;
}


async function Logout() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.id) {
        alert("No user is currently logged in.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/user/logout", {
            method: 'POST',
            body: JSON.stringify({ id: user.id }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            localStorage.removeItem('user');
            location.replace('/user/login');
        } else {
            alert("Failed to logout");
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
}

function loadMusic() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.token) {
        return;
    }
    let html = '';
    try {
        fetch('http://localhost:3000/music', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': user.token
            }
        })
            .then(response => response.json())
            .then(songs => {
                allSongs = songs;
                songs.forEach(song => {
                    html += ` 
                <tr>
                    <th scope="row">${song.id}</th>
                    <td>${song.title}</td>
                    <td>${song.genre}</td>
                    <td>${song.artist}</td>
                    <td>
                        <button class="add-btn playMusicBtn" id=${song.id} onclick="playMusic('${song.title}','${song.id}')"><img src="/images/play.png" alt="Pause" width="10"></button>
                        <button class="add-btn addToPlaylistBtn" id=${song.id} onclick="addToPlaylists(this)">+</button>
                    </td>
                </tr>
            `;
                });
                
                document.getElementById('music-tbody').innerHTML = html;
                playMusic(songs[0].title, songs[0].id,false, true);
            });
    } catch (error) {
        console.log(err)
        location.replace('/user/login');
    }

}

function loadPlaylist() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token) {
        window.location.href = '/user/login';
        return;
    }

    let html = '';
    fetch('http://localhost:3000/music/playlist', {
        method: "GET",
        headers: {
            'Authorization': user.token
        }
    })
        .then(response => {
            if (response.status !== 200) {
                window.location.href = '/user/login';
                throw new Error('Unauthorized');
            }
            return response.json();
        })
        .then(songs => {
            currentPlaylist = songs;
            songs.forEach(song => {
                html += `
                <tr>
                    <th scope="row">${song.id}</th>
                    <td>${song.title}</td>
                    <td>${song.genre}</td>
                    <td>${song.artist}</td>
                    <td>
                        <button class="add-btn playMusicBtn" id=${song.id} onclick="playMusic('${song.title}','${song.id}',${true})">
                            <img src="/images/play.png" alt="Play" width="10">
                        </button>
                        <button class="add-btn removeFromPlaylistBtn" id=${song.id} onclick="removeFromPlaylist(this)">-</button>
                    </td>
                </tr>
            `;
            });
            document.getElementById('playlist-tbody').innerHTML = html;
        })
        .catch(error => {
        });
}



function removeFromPlaylist(id) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token) {
        return;
    }
    fetch(`http://localhost:3000/music/playlist/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': user.token
        }
    })
        .then(response => response.json())
        .then(() => {
            loadPlaylist();
        });
}

// function playMusic(id) {

//     const audioElement = document.querySelector('#music-play audio');
//     const songTitle = document.getElementById('song-title-play');

//     songTitle.innerHTML = song.title;

//     audioElement.src = `http://localhost:3000/songs/${id}.mp3`;
//     audioElement.play();
// }







async function addToPlaylists(button) {

    const id = button.id;
    let currentMus = currentPlaylist.find(cm => cm.id == id);

    if (currentMus) {
        button.disabled = true;
    }
    else {

        const user = JSON.parse(localStorage.getItem('user'));
        const response = await fetch('http://localhost:3000/music/playlist', {
            method: 'POST',
            body: JSON.stringify({
                id
            }),
            headers: {
                'Content-type': 'application/json',
                'Authorization': user.token
            }
        });

        const newMusic = await response.json();


        document.getElementById('playlist-tbody').innerHTML += `
        <tr>
            <th scope="row">${newMusic.id}</th>
            <td>${newMusic.title}</td>
            <td>${newMusic.genre}</td>
            <td>${newMusic.artist}</td>
            <td>
              <button class="add-btn playMusicBtn" onclick="playMusic('${newMusic.title}','${newMusic.id}')">
              <img src="/images/play.png" alt="Play" width="10">
               </button>
               <button class="add-btn removeFromPlaylistBtn" id=${newMusic.id} onclick="removeFromPlaylist(this)">-</button>
           </td>
        </tr>
    `;

        currentPlaylist.push(newMusic);

        button.disabled = true;



    }
}



async function removeFromPlaylist(button) {



    const id = button.id;

    const user = JSON.parse(localStorage.getItem('user'));

    const response = await fetch(`http://localhost:3000/music/playlist/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': user.token
        }

    });
    if (response.status == 200) {

        loadMusic();
        loadPlaylist();
    }

}



// let playMode = ['shuffle', 'repeatPlaylist', 'repeatSong', 'shuffleOff'];
// let currentModeIndex = 0;

// function togglePlayMode() {
//     currentModeIndex = (currentModeIndex + 1) % playMode.length;
//     const mode = playMode[currentModeIndex];
//     const switchModeBtn = document.getElementById('switch-mode');

//     switch (mode) {
//         case 'shuffle':
//             typeOfsequence = 3;
//             switchModeBtn.innerHTML = '<img src="/images/shuffle.png" alt="Shuffle">';
//             break;
//         case 'repeatPlaylist':
//             typeOfsequence = 1
//             switchModeBtn.innerHTML = '<img src="/images/repeat-all.png" alt="Repeat Playlist">';
//             break;
//         case 'repeatSong':
//             typeOfsequence = 2
//             switchModeBtn.innerHTML = '<img src="/images/repeat-once.png" alt="Repeat Song">';
//             break;
//         case 'shuffleOff':
//             typeOfsequence = 0;
//             switchModeBtn.innerHTML = '<img src="/images/normal-queue.png" alt="Shuffle Off">';
//             break;
//     }
// }





