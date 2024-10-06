async function goodsList() {
  let res = await fetch("http://localhost:5000/goods-list");
  let data = await res.json();
  console.log(data);
  document.getElementById("list").innerHTML = "";
  data.forEach((element) => {
    let li = document.createElement("li");
    li.innerHTML = `<p id="product-name">${element.product_name}</p>
     <p id="product_description">${element.product_description}</p>
     <p id="product-price">${element.product_price}</p>
     <p id="store-name">${element.store_name}</p>
     <p id="store-address">${element.store_address}</p>
     <button id="delete-button">X</button>`;

    li.querySelector("#delete-button").addEventListener("click", async (ev) => {
      console.log(ev.target);
      let res = await fetch(
        `http://localhost:5000/goods-delete/${element.id}`,
        {
          method: "DELETE",
        }
      );
      let data = await res.json();
      console.log(data);
      await goodsList()
    });
    document.getElementById("list").appendChild(li);
  });
}

goodsList();
