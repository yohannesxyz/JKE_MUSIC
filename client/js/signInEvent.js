window.onload = function () {
   
    document.getElementById('submitBtn').onclick = Login;
  
};


function loginForm(){
    let html =``;
    html+=``;
    document.getElementById('login').innerHTML= html;
}


async function Login(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/user/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.status === 200) {
            const data = await response.json();
            localStorage.setItem('user', JSON.stringify(data));
            document.cookie = `token=${data.token}; path=/; max-age=${24*60*60}`;

            location.replace('http://localhost:3000/dashboard');
        } else {
            alert("Username and password are not correct");
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
}
