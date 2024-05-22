
window.onload = function () {
    // loadProducts();

    document.getElementById('submitBtn').onclick = Login;
    document.getElementById('logoutbtn').onclick = Logout;

  
}

async function Logout () {

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

async function Login(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value; 

    try {
        const response = await fetch('http://localhost:3000/user/login', {
            method: 'POST',
            body: JSON.stringify({
                "username": username,
                "password": password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            const data = await response.json();
            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(data));
            // Redirect to the dashboard
            location.replace('/dashboard');
        } else {
            alert("Username and password are not correct");
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
}




// async function addNewProduct(e) {
//     e.preventDefault();
//     const title = document.getElementById('title').value;
//     const price = document.getElementById('price').value;
//     const description = document.getElementById('description').value;

//     const response = await fetch('http://localhost:3000/music', {
//         method: 'POST',
//         body: JSON.stringify({
//             title,
//             price,
//             description
//         }),
//         headers: {
//             'Content-type': 'application/json'
//         }
//     });
//     // location.reload();
//     const book = await response.json();
//     // console.log(result);
//     document.getElementById('products-tbody').innerHTML += `
//         <tr>
//             <th scope="row">${book.id}</th>
//             <td>${book.title}</td>
//             <td>${book.genre}</td>
//             <td>${book.artist}</td>
//         </tr>
//     `;
// }


// function loadProducts() {
//     let html = '';
//     fetch('http://localhost:3000/music')
//         .then(response => response.json())
//         .then(products => {
//             products.forEach(product => {
//                 html += `
//                 <tr>
//                 <th scope="row">${product.id}</th>
//                 <td>${product.title}</td>
//                 <td>${product.genre}</td>
//                 <td>${product.artist}</td>
//                 <td>
//                 <a href="https://localhost:3000/songs/${product.title}.mp3"></a>
//                 <a id="audio-${product.id}" src="https://localhost:3000/songs/${product.title}.mp3"></a>
//                 <button><a href="https://localhost:3000/songs/${product.title}.mp3">Play</a></button>
//                 <button><a href="https://localhost:3000/songs/${product.title}.mp3">Add To Playlist</a></button>
//                </td>
//               </tr>
//                 `
//             });
//             document.getElementById('products-tbody').innerHTML = html;
//         })
// }