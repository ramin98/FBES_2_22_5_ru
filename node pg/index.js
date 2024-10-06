const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mydb",
  password: "ramin1998",
  port: 5432,
});

pool
  .connect()
  .then((res) => console.log("OK"))
  .catch((err) => console.log(err));

const app = express();
const HOST = 5000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// async function insertIntoDB(
//   product_name,
//   product_description,
//   product_price,
//   store_name,
//   store_address
// ) {
//   const checkText = "SELECT * FROM goods WHERE product_name = $1";
//   const insertText =
//     "INSERT INTO goods(product_name,  product_description, product_price,store_name, store_address) VALUES($1, $2,$3, $4,$5) RETURNING *";
//   const values = [
//     product_name,
//     product_description,
//     product_price,
//     store_name,
//     store_address,
//   ];

//   try {
//     // Сначала проверяем, есть ли уже такой пользователь
//     let checkRes = await pool.query(checkText, [values[0]]);

//     if (checkRes.rows.length > 0) {
//       console.log("Пользователь с таким именем уже существует.");
//     } else {
//       // Если пользователь не существует, выполняем вставку
//       let res = await pool.query(insertText, values);
//       console.log(res.rows[0]);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }

// for (let index = 0; index < goods.length; index++) {
//   const {
//     product_name,
//     product_description,
//     product_price,
//     store_name,
//     store_address,
//   } = goods[index];

//   insertIntoDB(
//     product_name,
//     product_description,
//     product_price,
//     store_name,
//     store_address
//   );
// }
app.get('/goods-list', async (req,res) => {
    try {
        let { rows } = await pool.query("SELECT * FROM goods");
        res.json(rows)
      } catch (err) {
        console.log(err);
      }
})

app.delete('/goods-delete/:id', async (req,res) => {
    console.log('/goods-delete')
    let id = parseInt(req.params.id)
    console.log(id)
    try {
        let data = await pool.query("DELETE FROM goods WHERE id = $1;",[id]);
        res.json(data)
      } catch (err) {
        console.log(err);
      }
})

// getDataFromDB();

// pool.query('SELECT * FROM users')
// .then((res) => console.log(res.rows))
// .catch((err) => console.log(err))

// pool.query('SELECT * FROM users', (err, data) => {
//     if(err){
//         console.log(err)
//         return
//     }
//     console.log(data.rows)
// })

// process.on('SIGINT', () => {
//     console.log('Получен SIGINT, закрываем приложение...');
//     process.exit();
//   });

//   process.on('SIGTERM', () => {
//     console.log('Получен SIGTERM, завершаем приложение...');
//     process.exit();
//   });

app.listen(HOST, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`http://localhost:${HOST}`);
});
