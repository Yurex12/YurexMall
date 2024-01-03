let products = [];

processFetchedData();

async function fetchDataFromAPI() {
  const res = await fetch('https://fakestoreapi.com/products');
  const data = await res.json();
  return data;
}

const errorPage = document.querySelector('[data-error-page]');
const errorMessage = errorPage.children[1];

async function processFetchedData() {
  try {
    const data = await fetchDataFromAPI();
    products = data;

    dispatchActions();
  } catch (error) {
    console.log(error);

    if (error.message.toLowerCase() !== 'failed to fetch') {
      errorMessage.textContent =
        'We are currently having a problem with our server, will be back online shortly';
    } else {
      errorMessage.textContent = 'Make sure your data is on';
    }

    errorPage.classList.replace('hidden', 'flex');
    errorPage.classList.add('fixed');
  }
}

let dataBase = JSON.parse(localStorage.getItem('dataBase')) || [
  { filter: '' },
  { basket: [] },
  { sortBy: '' },
];
