fetch('https://fakestoreapi.com/products')
  .then((res) => res.json())
  .then((data) => {
    products = data;
    dataReady();
    console.log('data refetched')
  });

let products = [];

let dataBase = JSON.parse(localStorage.getItem('dataBase')) || [
  { filter: '' },
  { basket: [] },
];
