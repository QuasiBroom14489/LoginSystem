document.addEventListener("DOMContentLoaded", () => {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  let currentUser = null;

  // Elements
  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");
  const authContainer = document.getElementById("auth-container");
  const profileContainer = document.getElementById("profile-container");

  const btnSignupView = document.getElementById("btn-signup-view");
  const btnLoginView = document.getElementById("btn-login-view");

  // Toggle views
  btnSignupView.addEventListener("click", () => {
    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
  });

  btnLoginView.addEventListener("click", () => {
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
  });

  // Handle sign up
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = {
      firstname: document.getElementById("signup-firstname").value,
      lastname: document.getElementById("signup-lastname").value,
      email: document.getElementById("signup-email").value,
      phone: document.getElementById("signup-phone").value,
      username: document.getElementById("signup-username").value,
      password: document.getElementById("signup-password").value,
      note: ''
    };

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Account created! Please log in.");
    signupForm.reset();
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
  });

  // Handle login
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const identifier = document.getElementById("login-identifier").value;
    const password = document.getElementById("login-password").value;

    const user = users.find(u =>
      (u.email === identifier || u.phone === identifier || u.username === identifier)
      && u.password === password
    );

    if (user) {
      currentUser = user;
      showProfile();
    } else {
      alert("Login failed.");
    }
  });

  // Show profile page
  function showProfile() {
    authContainer.classList.add("hidden");
    profileContainer.classList.remove("hidden");
    document.getElementById("profile-name").textContent = currentUser.firstname;
    document.getElementById("profile-email").textContent = currentUser.email;
    document.getElementById("profile-phone").textContent = currentUser.phone;
    document.getElementById("profile-username").textContent = currentUser.username;
    document.getElementById("notes").value = currentUser.note || '';
  }

  // Save note
  document.getElementById("save-note").addEventListener("click", () => {
    currentUser.note = document.getElementById("notes").value;
    users = users.map(u => u.username === currentUser.username ? currentUser : u);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Note saved!");
  });
});
