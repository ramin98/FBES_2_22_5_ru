const setCookies = async () => {
    let res = await fetch('http://localhost:5000/setcookie', {
        method: 'GET',
        credentials: 'include' // Ensure cookies are included in the request
    })
    console.log(res)
    let data = await res.text()
    console.log(data)
}

document.getElementById('set').addEventListener('click', setCookies)

const getCookies = async () => {
    let res = await fetch('http://localhost:5000/getcookie', {
        method: 'GET',
        credentials: 'include' // Ensure cookies are included in the request
    })
    console.log(res)
    let data = await res.json()
    console.log(data)
}

document.getElementById('get').addEventListener('click', getCookies)
