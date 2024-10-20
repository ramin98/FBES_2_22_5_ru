document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const messageElement = document.getElementById('register-message');

    try {
        const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            messageElement.textContent = data.message;
        } else {
            messageElement.textContent = data.message || 'Registration failed';
        }
    } catch (err) {
        messageElement.textContent = 'Error: ' + err.message;
    }
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const messageElement = document.getElementById('login-message');

    try {
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include' // Отправка cookies с запросом
        });

        const data = await response.json();
        if (response.ok) {
            messageElement.textContent = 'Login successful!';
        } else {
            messageElement.textContent = data.message || 'Login failed';
        }
    } catch (err) {
        messageElement.textContent = 'Error: ' + err.message;
    }
});

document.getElementById('dashboard-button').addEventListener('click', async () => {
    const dashboardElement = document.getElementById('dashboard');

    try {
        const response = await fetch('http://localhost:5000/dashboard', {
            method: 'GET',
            credentials: 'include' // Отправка cookies с запросом
        });

        const data = await response.json();
        if (response.ok) {
            dashboardElement.textContent = data.message;
        } else {
            dashboardElement.textContent = 'Access denied.';
        }
    } catch (err) {
        dashboardElement.textContent = 'Error: ' + err.message;
    }
});

document.getElementById('logout-button').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:5000/logout', {
            method: 'POST',
            credentials: 'include' // Отправка cookies с запросом
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message);
            document.getElementById('dashboard').textContent = '';
        }
    } catch (err) {
        alert('Error: ' + err.message);
    }
});
