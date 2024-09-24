let http = require('http')
let url = require('url')

let goods = [
  {
    product_name: "Kişi köynəyi",
    product_description: "Mavi rəngdə, 100% pamuk",
    product_price: 50,
    store_name: "Moda Dünyası",
    store_address: "Bakı şəhəri, Nizami kuçəsi 5",
  },
  {
    product_name: "Qadın bluzası",
    product_description: "Dəri detallı, qara rəngdə",
    product_price: 60,
    store_name: "Moda Dünyası",
    store_address: "Bakı şəhəri, Nizami kuçəsi 5",
  },
  {
    product_name: "Kişi pantolonu",
    product_description: "Qəhvəyi rəng, kənar cebi",
    product_price: 75,
    store_name: "Moda Dünyası",
    store_address: "Bakı şəhəri, Nizami kuçəsi 5",
  },
  {
    product_name: "Qadın eteyi",
    product_description: "Qırmızı rəng, mini",
    product_price: 40,
    store_name: "Moda Dünyası",
    store_address: "Bakı şəhəri, Nizami kuçəsi 5",
  },
  {
    product_name: "Kişi dəsmalı",
    product_description: "Nəqşdar dizayn",
    product_price: 20,
    store_name: "Moda Dünyası",
    store_address: "Bakı şəhəri, Nizami kuçəsi 5",
  },
  {
    product_name: "Qadın çantası",
    product_description: "Əlgötürən, dəri",
    product_price: 90,
    store_name: "Moda Dünyası",
    store_address: "Bakı şəhəri, Nizami kuçəsi 5",
  },
  {
    product_name: "Kişi botları",
    product_description: "Qış üçün, suya davamlı",
    product_price: 120,
    store_name: "Moda Dünyası",
    store_address: "Bakı şəhəri, Nizami kuçəsi 5",
  },
  {
    product_name: "Qadın ayaqqabıları",
    product_description: "Yüksək tapan, lacivərt",
    product_price: 85,
    store_name: "Moda Dünyası",
    store_address: "Bakı şəhəri, Nizami kuçəsi 5",
  },
  {
    product_name: "Kişi papağı",
    product_description: "Qara rəngdə, dəri",
    product_price: 45,
    store_name: "Moda Dünyası",
    store_address: "Bakı şəhəri, Nizami kuçəsi 5",
  },
  {
    product_name: "Qadın şalvarı",
    product_description: "Göy rəngdə, kaşmir",
    product_price: 70,
    store_name: "Zərif Moda",
    store_address: "Bakı şəhəri, 28 May kuçəsi 12",
  },
  {
    product_name: "Kişi palto",
    product_description: "Süət dəri, qara rəngdə",
    product_price: 250,
    store_name: "Zərif Moda",
    store_address: "Bakı şəhəri, 28 May kuçəsi 12",
  },
  {
    product_name: "Qadın jaketi",
    product_description: "Uzun, qaşqır",
    product_price: 200,
    store_name: "Zərif Moda",
    store_address: "Bakı şəhəri, 28 May kuçəsi 12",
  },
  {
    product_name: "Kişi kəməri",
    product_description: "Dəri, metal tokalı",
    product_price: 40,
    store_name: "Zərif Moda",
    store_address: "Bakı şəhəri, 28 May kuçəsi 12",
  },
  {
    product_name: "Qadın badlonu",
    product_description: "Retro stil, qızıl rəngdə",
    product_price: 180,
    store_name: "Zərif Moda",
    store_address: "Bakı şəhəri, 28 May kuçəsi 12",
  },
  {
    product_name: "Kişi şortu",
    product_description: "Spor stil, elastik",
    product_price: 60,
    store_name: "Zərif Moda",
    store_address: "Bakı şəhəri, 28 May kuçəsi 12",
  },
  {
    product_name: "Qadın maykası",
    product_description: "Boyalı nəqş, pamuklu",
    product_price: 45,
    store_name: "Zərif Moda",
    store_address: "Bakı şəhəri, 28 May kuçəsi 12",
  },
  {
    product_name: "Kişi saatı",
    product_description: "Qara rəngdə, analog",
    product_price: 150,
    store_name: "Zərif Moda",
    store_address: "Bakı şəhəri, 28 May kuçəsi 12",
  },
  {
    product_name: "Qadın bəzək",
    product_description: "Qızıl, komplekt",
    product_price: 220,
    store_name: "Əliyev Moda Mərkəzi",
    store_address: "Bakı şəhəri, Azadlıq prospekti 89",
  },
  {
    product_name: "Kişi atkısı",
    product_description: "Xəzəl rəng, uzun",
    product_price: 35,
    store_name: "Əliyev Moda Mərkəzi",
    store_address: "Bakı şəhəri, Azadlıq prospekti 89",
  },
  {
    product_name: "Qadın bantı",
    product_description: "Metal detallı, elastik",
    product_price: 50,
    store_name: "Əliyev Moda Mərkəzi",
    store_address: "Bakı şəhəri, Azadlıq prospekti 89",
  },
  {
    product_name: "Kişi kostyumu",
    product_description: "İki parçalı, qara rəngdə",
    product_price: 320,
    store_name: "Əliyev Moda Mərkəzi",
    store_address: "Bakı şəhəri, Azadlıq prospekti 89",
  },
  {
    product_name: "Qadın kombinezonu",
    product_description: "Yaz üçün, açıq rəng",
    product_price: 150,
    store_name: "Əliyev Moda Mərkəzi",
    store_address: "Bakı şəhəri, Azadlıq prospekti 89",
  },
  {
    product_name: "Kişi sviteri",
    product_description: "Düz rəng, yüngül",
    product_price: 70,
    store_name: "Əliyev Moda Mərkəzi",
    store_address: "Bakı şəhəri, Azadlıq prospekti 89",
  },
  {
    product_name: "Qadın ziyafət geyimi",
    product_description: "Düzənşən, yaz üçün",
    product_price: 95,
    store_name: "Əliyev Moda Mərkəzi",
    store_address: "Bakı şəhəri, Azadlıq prospekti 89",
  },
  {
    product_name: "Kişi sport formaları",
    product_description: "Spandex, idman üçün",
    product_price: 55,
    store_name: "Əliyev Moda Mərkəzi",
    store_address: "Bakı şəhəri, Azadlıq prospekti 89",
  },
  {
    product_name: "Qadın bikini",
    product_description: "Tropik nəqş, elastik",
    product_price: 45,
    store_name: "Əliyev Moda Mərkəzi",
    store_address: "Bakı şəhəri, Azadlıq prospekti 89",
  },
  {
    product_name: "Kişi çantası",
    product_description: "Dizayner, əsas bölməsi",
    product_price: 100,
    store_name: "Əliyev Moda Mərkəzi",
    store_address: "Bakı şəhəri, Azadlıq prospekti 89",
  },
  {
    product_name: "Qadın ətri",
    product_description: "Gül ətri, uzunömürlü",
    product_price: 80,
    store_name: "Əliyev Moda Mərkəzi",
    store_address: "Bakı şəhəri, Azadlıq prospekti 89",
  },
  {
    product_name: "Kişi şalı",
    product_description: "Səliqəli, çoxrəngli",
    product_price: 25,
    store_name: "Əliyev Moda Mərkəzi",
    store_address: "Bakı şəhəri, Azadlıq prospekti 89",
  },
  {
    product_name: "Qadın sutyeni",
    product_description: "Destəklənmiş, rahat",
    product_price: 65,
    store_name: "Əliyev Moda Mərkəzi",
    store_address: "Bakı şəhəri, Azadlıq prospekti 89",
  },
];

let arr = []

let server = http.createServer((req, res) => {
  // console.log(req.url.split('?'))
  // let queries = {}
  // req.url.split('?')[1].split('&').forEach((item) => {
  //     let query = item.split('=')
  //     queries[query[0]] = query[1]
  // })
  // console.log(queries)

  let myUrl = url.parse(req.url, true)

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*', // или указать конкретные источники
      'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
  } else {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
  }




  // if(myUrl.pathname === '/search' && req.method === 'GET'){
  //     console.log(myUrl.query)
  //     let filteredData = goods.filter((item) => item.product_name.startsWith(myUrl.query.input) && item.store_name.startsWith(myUrl.query.select))
  //     console.log(filteredData)
  //     res.end(JSON.stringify(filteredData))
  // }

  // if (req.method === 'GET' && req.url === 'hello') {
  //     console.log('hello')
  // }
  console.log(req.method)
  if (req.method === 'POST' && req.url === '/write') {
    let user
    req.on('data', (data) => {
      user = JSON.parse(data)
      arr.push(user)
      // console.log(arr)
      console.log(user)
    })

    // req.on('end', () => {
    res.end(JSON.stringify(user))
    // })
  } else if (req.method === 'DELETE' && req.url === '/delete') {
    console.log(req.method)
  }

})

server.listen(3000, () => {
  console.log(3000)
})