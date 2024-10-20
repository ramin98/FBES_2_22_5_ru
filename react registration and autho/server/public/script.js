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
            body: JSON.stringify({ username, email, password })
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
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log(data)
        if (response.ok) {
            localStorage.setItem('token', data.token);
            messageElement.textContent = 'Login successful!';
        } else {
            messageElement.textContent = data.message || 'Login failed';
        }
    } catch (err) {
        messageElement.textContent = 'Error: ' + err.message;
    }
});

document.getElementById('dashboard-button').addEventListener('click', async () => {
    const token = localStorage.getItem('token');
    const dashboardElement = document.getElementById('dashboard');

    if (!token) {
        dashboardElement.textContent = 'Please login first.';
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/dashboard', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            dashboardElement.textContent = `Welcome, ${data.username}. Your email is ${data.email}.`;
        } else {
            dashboardElement.textContent = 'Access denied. Please login.';
        }
    } catch (err) {
        dashboardElement.textContent = 'Error: ' + err.message;
    }
});

document.getElementById('logout-button').addEventListener('click', async () => {
    // Удаляем токен из localStorage
    localStorage.removeItem('token');

    // Дополнительно можем отправить запрос на сервер для подтверждения выхода
    try {
        const response = await fetch('http://localhost:5000/logout', {
            method: 'POST'
        });

        const data = await response.json();
        alert(data.message);
        document.getElementById('dashboard').textContent = 'You are logged out.';
    } catch (err) {
        alert('Error: ' + err.message);
    }
});
