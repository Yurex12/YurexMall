const itemContainer = document.querySelector('[data-products-container]');
const itemTemplate = document.querySelector('[data-product-template]');
const filterCategory = document.querySelector('[data-filter-category]');
const checkoutContainer = document.querySelector('#checkout-container');
let itemInCart = document.querySelector('[data-cart-item]');
let quantityvalue = document.querySelector('[data-product-quantity-value]');

const filterCategoryOption = dataBase[0].filter;

//sets the value of the items in cart
itemInCart.innerText = dataBase[1].basket.length;
//checks local storege to check the filter state if there exists a value and acts accordinly
function dispatchActions() {
  if (
    filterCategoryOption !== null &&
    filterCategoryOption !== '' &&
    filterCategoryOption !== 'all'
  ) {
    filterProducts(filterCategoryOption);
  } else {
    appendToContainer(products);
  }
}

//filters the products based on the user option

function filterProducts(filterValue) {
  const filteredItem = products.filter(
    (product) => product.category === filterValue
  );
  appendToContainer(filteredItem);

  if (checkoutContainer.classList.contains('flex')) {
    checkoutContainer.classList.replace('flex', 'hidden');
  }
}

// when the option is changed the products on the page gets filtered also based on the users option
filterCategory.addEventListener('change', (e) => {
  const filterValue = e.target.value;
  dataBase[0].filter = filterValue;

  switch (filterValue) {
    case 'all':
      appendToContainer(products);
      break;
    case "men's clothing":
      filterProducts(filterValue);
      break;
    case 'jewelery':
      filterProducts(filterValue);
      break;
    case 'electronics':
      filterProducts(filterValue);
      break;
    case "women's clothing":
      filterProducts(filterValue);
      break;
  }

  localStorage.setItem('dataBase', JSON.stringify(dataBase));
});

//sets the filterCategory to the value from local storage, if there exists one when the pages is refreshed
if (filterCategoryOption !== null && filterCategoryOption !== '') {
  filterCategory.value = filterCategoryOption;
}

for (let i = 0; i < 10; i++) {
  let loadingAnimationCard = itemTemplate.content.cloneNode(true).children[1];
  itemContainer.append(loadingAnimationCard);
}

//appends the products to the its container respectively
function appendToContainer(products) {
  itemContainer.innerHTML = '';
  products.forEach(
    ({ price, category, rating: { rate }, image, id, title }) => {
      //checks for each item if the item id is in local storage and adds the remove icon if not undefined
      const search = dataBase[1].basket.find((item) => Number(item.id) === id);

      const itemCard = itemTemplate.content.cloneNode(true).children[0];
      const itemCategory = itemCard.querySelector('[data-category]');
      const itemPrice = itemCard.querySelector('[data-price]');
      const itemRating = itemCard.querySelector('[data-rating]');
      const itemImage = itemCard.querySelector('[data-image]');
      const itemBtn = itemCard.querySelector('[data-cart-btn]');
      const itemTitle = itemCard.querySelector('[data-title]');

      itemCategory.innerText = category;
      itemTitle.innerText = title;
      itemPrice.textContent = `$${price}`;
      itemImage.src = image;
      itemRating.innerText = `Rating: ${rate}`;
      itemCard.setAttribute('id', id);

      //add the styling to the btn and flips the icon if the condition is met
      if (search !== undefined) {
        const itemBtnIcon = itemBtn.children[0];
        addBtnStyles(itemBtn, itemBtnIcon);
      }
      itemContainer.append(itemCard);
    }
  );
}

//Toggle Btn styles based on actions

let clickedBtnProperties = [];

function productBtn(clickedBtn) {
  const productId = clickedBtn.parentElement.getAttribute('id');
  const clickedBtnIcon = clickedBtn.children[0];
  const productPrice = clickedBtn.previousElementSibling.children[0].innerText;
  const productSrc = clickedBtn.parentElement.children[1].src;
  const activeProduct = clickedBtn.parentElement;

  if (clickedBtnIcon.classList.contains('fa-cart-plus')) {
    addBtnStyles(clickedBtn, clickedBtnIcon);
    clickedBtnProperties = [productPrice, productSrc, activeProduct];
    quantityvalue.textContent = 1;
    pushToDataBase(productId);
  } else {
    removeBtnStyles(clickedBtn, clickedBtnIcon);
    popFromDataBase(productId);
  }

  itemInCart.innerText = dataBase[1].basket.length;
}

function pushToDataBase(productId) {
  dataBase[1].basket.push({
    id: productId,
    quantity: 1,
  });

  localStorage.setItem('dataBase', JSON.stringify(dataBase));
  appendToCheckoutContainer(clickedBtnProperties, productId);
}

function popFromDataBase(productId) {
  const newBasketItem = dataBase[1].basket.filter(
    (product) => product.id !== productId
  );
  dataBase[1].basket = newBasketItem;
  localStorage.setItem('dataBase', JSON.stringify(dataBase));
  removeFromCheckoutContainer(productId);
}

const checkoutPrice = document.querySelector('[data-checkout-price]');
const checkoutImageSrc = document.querySelector('[data-checkout-image]');

// the container class thats currently active;
let ActiveProductContainer;

function appendToCheckoutContainer(productProp, productId) {
  ActiveProductContainer?.classList.remove('active-product');
  const [productPrice, productSrc, productContainer] = productProp;
  ActiveProductContainer = productContainer;
  checkoutContainer.setAttribute('id', productId);

  if (checkoutContainer.classList.contains('hidden')) {
    checkoutContainer.classList.replace('hidden', 'flex');
  }

  checkoutPrice.innerText = productPrice;
  checkoutImageSrc.src = productSrc;
  productContainer.classList.add('active-product');
}
function removeFromCheckoutContainer(productId) {
  const checkoutContainercurrentId = checkoutContainer.getAttribute('id');

  if (checkoutContainercurrentId === productId) {
    checkoutContainer.classList.replace('flex', 'hidden');
    clickedBtnProperties = [];
    checkoutContainer.removeAttribute('id');

    ActiveProductContainer?.classList.remove('active-product');
  }
}

//adds styling for each btn
function removeBtnStyles(btn, btnIcon) {
  btnIcon.classList.replace('fa-trash-arrow-up', 'fa-cart-plus');
  btn.classList.replace('bg-gray-300', 'bg-blue-500');
  btn.classList.replace('text-blue-600', 'text-white');
}
function addBtnStyles(btn, btnIcon) {
  btnIcon.classList.replace('fa-cart-plus', 'fa-trash-arrow-up');
  btn.classList.replace('bg-blue-500', 'bg-gray-300');
  btn.classList.replace('text-white', 'text-blue-600');
}

function increment() {
  const productId = checkoutContainer.getAttribute('id');

  const selectedProduct = dataBase[1].basket.find(
    (product) => +product.id === +productId
  );

  if (selectedProduct === undefined) return;

  selectedProduct.quantity++;
  quantityvalue.innerText = selectedProduct.quantity;
  localStorage.setItem('dataBase', JSON.stringify(dataBase));
}
function decrement() {
  const productId = checkoutContainer.getAttribute('id');

  const selectedProduct = dataBase[1].basket.find(
    (product) => +product.id === +productId
  );

  if (selectedProduct === undefined) return;

  +selectedProduct.quantity--;
  quantityvalue.innerText = selectedProduct.quantity;

  if (selectedProduct.quantity < 1) {
    popFromDataBase(productId);

    const selectedProductBtnIcon =
      ActiveProductContainer.children[4].children[0];
    const selectedProductBtn = ActiveProductContainer.children[4];

    removeBtnStyles(selectedProductBtn, selectedProductBtnIcon);
    itemInCart.innerText = dataBase[1].basket.length;
  }
  localStorage.setItem('dataBase', JSON.stringify(dataBase));
}

// let messages = {
//   added: 'Item sucessfully added to cart',
//   removed: 'item removed from cart',
// };

// function notification() {
//   alert(messages.added);
// }
