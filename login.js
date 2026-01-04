document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = e.target.username.value;
        const password = e.target.password.value;

        // Hardcoded credentials
        if (username === 'admin' && password === 'password') {
            window.location.href = 'index.html';
        } else {
            alert('Invalid username or password');
        }
    });
});
