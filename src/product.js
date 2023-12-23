let products = [];

processFetchedData();

async function fetchDataFromAPI() {
  const res = await fetch('https://fakestoreapi.com/products');
  const data = await res.json();
  return data;
}

async function processFetchedData() {
  try {
    const data = await fetchDataFromAPI();
    console.log(data);
    products = data;

    dispatchActions();
  } catch (error) {
    // alert(error.message);
    console.log(error);
  }
}

let dataBase = JSON.parse(localStorage.getItem('dataBase')) || [
  { filter: '' },
  { basket: [] },
  { sortBy: '' },
];
