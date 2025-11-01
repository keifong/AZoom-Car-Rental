// Helper to toggle views
function toggleView(idToShow) {
    const forms = ['loginForm', 'registerForm', 'resetForm', 'welcome'];
    forms.forEach(id => {
    document.getElementById(id).classList.add('hidden');
    });
    document.getElementById(idToShow).classList.remove('hidden');
}

// Simulate register
document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);
    alert('Registration successful. You can now log in.');
    toggleView('loginForm');
});


// Simulate login
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const savedEmail = localStorage.getItem('userEmail');
    const savedPassword = localStorage.getItem('userPassword');
    if (email === savedEmail && password === savedPassword) {
        document.getElementById('userEmail').textContent = email;
        toggleView('welcome');
        Learning Activity: User Register, Login, Reset Password, Logout
    } else {
        alert('Invalid email or password');
    }
});


// Simulate password reset
document.getElementById('resetForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const resetEmail = document.getElementById('resetEmail').value;
    const savedEmail = localStorage.getItem('userEmail');
    if (resetEmail === savedEmail) {
        alert('Password reset link sent to your email (simulated)');
        toggleView('loginForm');
    } else {
        alert('Email not found in system.');
    }
});


// Simulate logout
function logout() {
    document.getElementById('userEmail').textContent = '';
    toggleView('loginForm');
}