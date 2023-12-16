let products = [];
const dataLoadingAnimation = document.querySelector('[data-loading-animation]');

processFetchedData();

async function fetchDataFromAPI() {
  dataLoadingAnimation.classList.replace('hidden', 'block');
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
   console.log(error)
  } finally {
    dataLoadingAnimation.classList.replace('block', 'hidden');
  }
}

let dataBase = JSON.parse(localStorage.getItem('dataBase')) || [
  { filter: '' },
  { basket: [] },
  { sortBy: '' },
];
