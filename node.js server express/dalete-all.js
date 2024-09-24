const showList = async () => {
    try{
        let res = await fetch(`http://localhost:5000/goods`)
        let data = await res.json()
    
        document.getElementById('list').innerHTML = ''
        data.forEach(element => {
            let goodsName = document.createElement('li')
            goodsName.innerHTML = `<span>${element.product_name}</span>
            <input type="checkbox" id="${element.id}">
            `
            goodsName.querySelector('input').addEventListener('change', async (ev) => {
                 console.log(ev.target.checked)
                try{
                    let res = await fetch(`http://localhost:5000/change-cheked/${element.id}`, {
                        method:'PATCH',
                        headers:{
                            'Content-type': 'application/json'
                        },
                        body:JSON.stringify({checked: ev.target.checked})
                    })

                 }catch(err){
                    console.log(err)
                 }
            })
            document.getElementById('list').appendChild(goodsName)
        });
    }catch(err){
        console.log(err)
    }
    
}

showList()

document.getElementById('deleteAll').addEventListener('click', async () => {
    try{
        let res = await fetch(`http://localhost:5000/change-cheked/${element.id}`, {
            method:'DELETE',
        })
        await showList()

     }catch(err){
        console.log(err)
     }
})

