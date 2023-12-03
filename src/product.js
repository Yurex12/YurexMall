/* fetch('https://fakestoreapi.com/products')
   .then((res) => res.json())
   .then((data) => {
     products = data;
     dataReady();
   });*/
let products = [];

processFetchedData()

async function fetchDataFromAPI() {
  const res = await fetch('https://fakestoreapi.com/products');
  const data = await res.json()
  return data;
}

async function processFetchedData() {
  const data = await fetchDataFromAPI();
  products = data
  dispatchActions()
}




let dataBase = JSON.parse(localStorage.getItem('dataBase')) || [
  { filter: '' },
  { basket: [] },
];
