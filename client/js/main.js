window.onload = function () {
    loadPlaylist();
    loadMusic();
    document.getElementById('logoutbtn').onclick = Logout;
};

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
    fetch('http://localhost:3000/music', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': user.token
        }
    })
    .then(response => response.json())
    .then(songs => {
        songs.forEach(song => {
            html += `
                <tr>
                    <th scope="row">${song.id}</th>
                    <td>${song.title}</td>
                    <td>${song.genre}</td>
                    <td>${song.artist}</td>
                    <td>
                        <button class="add-btn playMusicBtn" onclick="playMusic(${song.id})"><img src="/images/play.png" alt="Pause" width="10"></button>
                        <button class="add-btn addToPlaylistBtn" onclick="addToPlaylist(${song.id})">+</button>
                    </td>
                </tr>
            `;
        });
        document.getElementById('music-tbody').innerHTML = html;
    });
}

function loadPlaylist() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token) {
        return;
    }
    let html = '';
    fetch('http://localhost:3000/music/playlist', {
        method: "GET",
        headers: {
            'Authorization': user.token
        }
    })
    .then(response => response.json())
    .then(songs => {
        songs.forEach(song => {
            html += `
                <tr>
                    <th scope="row">${song.id}</th>
                    <td>${song.title}</td>
                    <td>${song.genre}</td>
                    <td>${song.artist}</td>
                    <td>
                        <button class="add-btn playMusicBtn" onclick="playMusic(${song.title})"><img src="/images/play.png" alt="Pause" width="10"></button>
                        <button class="add-btn removeFromPlaylistBtn" onclick="removeFromPlaylist(${song.id})">-</button>
                    </td>
                </tr>
            `;
        });
        document.getElementById('playlist-tbody').innerHTML = html;
    });
}

function addToPlaylist(id) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token) {
        return;
    }
    fetch('http://localhost:3000/music/playlist', {
        method: "POST",
        body: JSON.stringify({ id }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': user.token
        }
    })
    .then(response => response.json())
    .then(() => {
        loadPlaylist(); // Refresh the playlist
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
        loadPlaylist(); // Refresh the playlist
    });
}

function playMusic(id) {
    
    const audioElement = document.querySelector('#music-play audio');
    const songTitle = document.getElementById('song-title-play')
    songTitle.innerHTML = song.title;
    audioElement.src = `http://localhost:3000/songs/${id}.mp3`;
    audioElement.play();
}
