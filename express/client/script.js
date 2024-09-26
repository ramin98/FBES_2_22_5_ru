const getFetch = async () => {
    let res =  await fetch('http://localhost:5000/info')
    let data  = await res.json()
    console.log(data)
}


const authorization = async () => {
    let res =  await fetch('http://localhost:5000/autho', {
        method:"POST",
         headers: {
            'Content-type': 'application/json'
         },
         body:JSON.stringify({password:'1234'})
    })

    let data
    if(res.headers.get('content-type').includes('text')){
        data  = await res.text()
    }else{
        data  = await res.json()
    }

    console.log(data)
}

authorization()