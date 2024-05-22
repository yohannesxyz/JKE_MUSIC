window.onload = function () {
   
    document.getElementById('submitBtn').onclick = Login;
 
};


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
           
            location.replace('/dashboard');
        } else {
            alert("Username and password are not correct");
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
}
