// let input = ''
// let select = ''
// const getData = async () => {

//     if(event.target.tagName === 'SELECT'){
//         select = event.target.value
//     }else if (event.target.tagName === 'INPUT'){
//         input = event.target.value
//     }

//     let res = await fetch(`http://localhost:3000/search?input=${input}&select=${select}`)
//     let data = await res.json()

//     document.getElementById('list').innerHTML = ''
//     data.forEach(element => {
//         let goodsName = document.createElement('li')
//         goodsName.innerText = element.product_name
//         document.getElementById('list').appendChild(goodsName)
//     });
    
//     console.log(data)
// }

// document.getElementById('goodsSearch').addEventListener('input', getData)
// document.getElementById('storeName').addEventListener('change', getData)


// const writeData = async () => {
//     let res = await fetch('http://localhost:3000/write?s=salam', {
//         method:'POST',
//         headers:{
//             'Content-type': 'text/plain'
//         },
//         body:JSON.stringify(1)
//     })
//     let data = await res.text()
//     console.log(data)
// }

// writeData()

document.querySelector('form').addEventListener('submit', async (ev) => {
    ev.preventDefault()
    let fromData = new FormData(ev.target)
    let valueArray = [...fromData]
    let obj = {}
    valueArray.forEach((item) => {
           obj[item[0]] = item[1]
    })
    console.log(obj)

    let res = await fetch('http://localhost:3000/write', {
        method:'POST',
        headers:{
            'Content-type': 'text/plain'
        },
        body:JSON.stringify(obj)
    })

    let data = await res.text()
    console.log(data)
})

document.getElementById('delete').addEventListener('click', async () => {
    let res = await fetch('http://localhost:3000/delete', {
        method:'DELETE'
    })
})