

let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = null;

function showSignup(){
    document.getElementById('signup-form').classList.remove('hidden');
    document.getElementById('login-form').classList.add('hidden');
}

function showLogin(){
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('signup-form').classList.add('hidden')
}

function handleSignup(event){
    event.preventDefault();
    const user = {
        firstname: document.getElementById('signup-firstname').value,
        lastname: document.getElementById('signup-lastname').value,
        email: document.getElementById('signup-email').value,
        phone: document.getElementById('signup-phone').value,
        username: document.getElementById('signup-username').value,
        password: document.getElementById('signup-password').value,
        note: ''
    };
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Account Created! You can now log in. ');
    showLogin();
}

function handleLogin(){
    event.preventDefault()
    const identifier = document.getElementById('login-identifier').value;
    const password = document.getElementById('login-password').value;
    const User = users.find(u => (u.email === identifier || u.phone === identifier || u.username === identifier) && u.password === password);
    if (user) {
        currentUser = user;
        showProfile();
    }
    else{
        alert('Login failed. Check your credentials')
    }
}

function showProfile(){
    document.getElementById('auth-container').classList.add('hidden');
    document.getElementById('profile-container').classList.remove('hidden');
    document.getElementById('profile-name').textContent = currentUser.firstname;
    document.getElementById('profile-email').textContent = currentUser.email;
    document.getElementById('profile-phone').textContent = currentUser.phone;
    document.getElementById('profile-username').textContent = currentUser.username;
    document.getElementById('notes').value = currentUser.note || '';
}

function saveNote(){
    currentUser.note = document.getElementById('notes').value;
    users = user.map(u => u.username === currentUser.username ? currentUser:u);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Note saved!')
}