const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

// Register a patient
registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    if (password.length < 6) {
        alert("Password must contain at least 6 characters.");
        return;
    }

    const existingUser = localStorage.getItem("patient_" + email);

    if (existingUser) {
        alert("This email is already registered. Please log in.");
        return;
    }

    const patient = { name: name, email: email };

    localStorage.setItem("patient_" + email, JSON.stringify(patient));
    localStorage.setItem("registered_email", email);

    alert("Registration successful! You can now log in.");
    registerForm.reset();

    document.getElementById("loginEmail").value = email;
    document.getElementById("login").scrollIntoView({ behavior: "smooth" });
});

// Patient login
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;
    const patientData = localStorage.getItem("patient_" + email);

    if (!patientData) {
        message.textContent = "Account not found. Please register first.";
        message.style.color = "red";
        return;
    }

    // Demo only: this frontend does not securely verify passwords.
    message.textContent =
        "Welcome, " + JSON.parse(patientData).name +
        "! Registration found. Secure login requires a backend.";
    message.style.color = "green";
});