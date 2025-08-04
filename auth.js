document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");

  const showLoginBtn = document.getElementById("show-login");
  const showSignupBtn = document.getElementById("show-signup");

  const loginToSignup = document.getElementById("login-to-signup");
  const signupToLogin = document.getElementById("signup-to-login");

  // Toggle between login/signup views
  function showLogin() {
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
    showLoginBtn.classList.add("active");
    showSignupBtn.classList.remove("active");
  }

  function showSignup() {
    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
    showSignupBtn.classList.add("active");
    showLoginBtn.classList.remove("active");
  }

  showLoginBtn.addEventListener("click", showLogin);
  showSignupBtn.addEventListener("click", showSignup);
  loginToSignup.addEventListener("click", showSignup);
  signupToLogin.addEventListener("click", showLogin);

  // 🚀 Handle signup form submit
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("signup-username").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Signup failed");
      }

      alert("Signup successful! Please log in.");
      showLogin(); // switch to login view
    } catch (err) {
      alert(err.message);
    }
  });

  // 🔑 Handle login form submit
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Login failed");
      }

      localStorage.setItem("token", data.token);
      alert("Login successful! Redirecting...");
      window.location.href = "index.html";
    } catch (err) {
      alert(err.message);
    }
  });
});