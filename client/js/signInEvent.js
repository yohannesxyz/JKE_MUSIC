window.onload = function () {

    document.getElementById('submitBtn').onclick = Login;
   
    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', function (event) {
        const userName = document.getElementById('newUsername').value;
        const password = document.getElementById('newPassword').value;
        const repeatPassword = document.getElementById('repeatPassword').value;

        if (password !== repeatPassword) {
            event.preventDefault();
            alert("Passwords do not match!");
        }
        else{
            Signup(event);
        }
    });
};


// Create Account
async function Signup(e) {
    e.preventDefault();
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;

    try {
        const response = await fetch('http://localhost:3000/user/create-user', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.status === 201) {
            const data = await response.json();
            localStorage.setItem('user', JSON.stringify(data));
            document.cookie = `token=${data.token}; path=/; max-age=${24*60*60}`;
alert('You have successfully registered!')
            location.replace('http://localhost:3000/dashboard');
        } 
        else {
            const data = await response.json();

            alert(data.message);
        }
    } catch (error) {
        
        alert('An error occurred. Please try again.');
    }
}


// Loging in logic
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
        alert('An error occurred. Please try again.');
    }
}


// Toggling forms
function openForm(evt, formName) {
    const tablinks = document.getElementsByClassName("tablinks");
    const sections = document.querySelectorAll("section");

    for (let i = 0; i < sections.length; i++) {
        sections[i].style.display = "none";
    }

    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(formName).style.display = "block";
    evt.currentTarget.className += " active";
}
