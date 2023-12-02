fetch('https://fakestoreapi.com/products')
  .then((res) => res.json())
  .then((data) => {
    products = data;
    console.log('data refetched')
    dataReady();

  });

let products = [];

let dataBase = JSON.parse(localStorage.getItem('dataBase')) || [
  { filter: '' },
  { basket: [] },
];
