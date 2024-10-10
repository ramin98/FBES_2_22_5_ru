// Функция получения всех пользователей
function getUsers() {
    fetch('http://localhost:3000/api/users')
      .then(response => response.json())
      .then(users => {
        console.log(users)
        const userList = document.getElementById('userList');
        userList.innerHTML = '';
        users.forEach(user => {
          const li = document.createElement('li');
          li.innerHTML = `<p>${user.id}: ${user.name} (${user.email})</p>
          <button>X</button>
          `;
          li.querySelector('button').addEventListener('click', async (event) => {
            let res = await fetch(`http://localhost:3000/api/users/${user.id}`, {
              method:'DELETE'
            })
            let data = await res.json()
            console.log(data)
            if(data.message === 'Пользователь удален'){
              console.log('ok')
                event.target.parentElement.remove()
            }

          })
          userList.appendChild(li);
        });
      });
  }

  // Функция создания нового пользователя
  document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })
    .then(response => response.json())
    .then(user => {
      if (user.error) {
        alert(`Ошибка: ${user.error}`);
      } else {
        alert(`Пользователь ${user.name} создан!`);
        getUsers();  // Обновляем список пользователей
      }
    });
  });

  document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('product-name').value;
    const price = document.getElementById('price').value;

    fetch('http://localhost:3000/api/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, price, id:'6' })
    })
    .then(response => response.json())
    .then(product => {
      if (product.error) {
        alert(`Ошибка: ${product.error}`);
      } else {
        console.log(product)
      }
    });
  });

  document.getElementById('productGet').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('id-product-user').value;

    fetch(`http://localhost:3000/api/products/${name}`)
      .then(response => response.json())
      .then(products => {
        console.log(products)
      });
  });


  // Функция обновления данных пользователя
  document.getElementById('updateForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const id = document.getElementById('updateId').value;
    const name = document.getElementById('updateName').value;
    const email = document.getElementById('updateEmail').value;
    const password = document.getElementById('updatePassword').value;

    fetch(`http://localhost:3000/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })  // Передаем обновленные данные
    })
    .then(response => response.json())
    .then(user => {
      if (user.error) {
        alert(`Ошибка: ${user.error}`);
      } else {
        alert(`Пользователь ${user.name} обновлен!`);
        getUsers();  // Обновляем список пользователей
      }
    });
  });

  // Загрузка списка пользователей при загрузке страницы
  window.onload = getUsers;