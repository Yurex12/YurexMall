const cartItemTemplate = document.querySelector('[data-cart-item-template]');
const cartItemsContainer = document.querySelector(
  '[data-cart-items-container]'
);
let itemInCart = document.querySelector('[data-cart-item]');
const cartItemTotalQuantity = document.querySelector('[data-total-cart-items]');

//sets the value of the items in cart
itemInCart.innerText = dataBase[1].basket.length;

const sortBy = document.querySelector('[data-cart-sort]');

//checks local storege to check the filter state if there exists a value and acts accordinly
const sortByOption = dataBase[2].sortBy;

//first action
function dispatchActions() {
  if (emptyOrNot()) return;

  if (sortByOption !== null && sortByOption !== '') {
    findProductsInCart(sortByOption);
  } else {
    findProductsInCart('modified');
  }
}

// when the option is changed the products on the page gets sorted also based on the users option
sortBy.addEventListener('change', (e) => {
  const sortByValue = e.target.value;
  dataBase[2].sortBy = sortByValue;
  findProductsInCart(sortByValue);
  localStorage.setItem('dataBase', JSON.stringify(dataBase));
});

//sets the sortBy to the value from local storage, if there exists one when the pages is refreshed
if (sortByOption !== null && sortByOption !== '') {
  sortBy.value = sortByOption;
}

function findProductsInCart(sortValue) {
  const productsInStorage = dataBase[1].basket;
  const productData = products;

  const cartItemProducts = [];

  //check for item if its in local storage
  productsInStorage.forEach((productInStorage) => {
    const productInCartData = productData.find(
      (product) => +product.id === +productInStorage.id
    );
    cartItemProducts.push({
      ...productInCartData,
      quantity: productInStorage.quantity,
    });
  });

  sortProducts(cartItemProducts, sortValue);
}

let sortedProducts = [];

function sortProducts(cartItemProducts, sortByValue) {
  let sortedItem;

  switch (sortByValue) {
    case 'modified':
      sortedProducts = cartItemProducts;

      break;
    case 'price-a-z':
      sortedItem = cartItemProducts.slice().sort((a, b) => b.price - a.price);
      sortedProducts = sortedItem;

      break;
    case 'price-z-a':
      sortedItem = cartItemProducts.slice().sort((a, b) => a.price - b.price);
      sortedProducts = sortedItem;

      break;

    default:
      throw new Error('not found');
  }

  appendToCartContainer(sortedProducts);
}

function appendToCartContainer(val) {
  cartItemsContainer.innerHTML = '';
  if (val.length === 0) {
    cartItemTotalQuantity.innerText = 0;
    return;
  }

  const quantityArray = [];

  val.forEach(({ id, price, quantity, image, category, title }) => {
    const cartItemContainer =
      cartItemTemplate.content.cloneNode(true).children[0];
    const cartItemImage = cartItemContainer.querySelector(
      '[data-cart-item-image]'
    );
    const cartItemCategory = cartItemContainer.querySelector(
      '[data-cart-item-category]'
    );
    const cartItemQuantity = cartItemContainer.querySelector(
      '[data-cart-item-quantity]'
    );
    const cartItemTitle = cartItemContainer.querySelector(
      '[data-cart-item-title]'
    );
    const cartItemPrice = cartItemContainer.querySelector(
      '[data-cart-item-price]'
    );

    quantityArray.push(quantity);

    cartItemImage.src = image;
    cartItemCategory.innerText = category;
    cartItemTitle.innerText = title;
    cartItemQuantity.value = quantity;
    cartItemPrice.innerText = `$${price}`;
    cartItemContainer.setAttribute('id', id);

    cartItemsContainer.append(cartItemContainer);
  });

  totalValue(quantityArray, cartItemTotalQuantity);
  checkout();
}

const cartSubTotal = document.querySelector('[data-cart-subtotal]');
const orderTotal = document.querySelector('[data-cart-total]');
const shippingEstimate = document.querySelector('[data-shipping-estimate]');

function totalValue(quantityList, consumer) {
  const totalValue = quantityList.reduce(
    (total, quantity) => total + quantity,
    0
  );

  consumer.innerText = Number(totalValue.toFixed(2));

  if (consumer.classList.contains('subtotal')) {
    // cartSubTotal === 0 ? tax.textContent = 50 : tax.textContent = 10
    const shippingEstimateVal = Number(((5 / 100) * totalValue).toFixed(2));
    shippingEstimate.innerText = shippingEstimateVal;

    orderTotal.innerHTML = Number(
      (totalValue + shippingEstimateVal + 5).toFixed(2)
    );
  }
}

function checkout() {
  const productDetails = sortedProducts.map(
    (product) => product.quantity * product.price
  );

  totalValue(productDetails, cartSubTotal);
}

const productPage = document.querySelector('[data-product-page]');

const emptyPage = document.querySelector('[data-empty-page]');

function emptyOrNot() {
 // if (Number(dataBase[1].basket.length) === undefined) return
  if (Number(dataBase[1].basket.length) === 0) {
    productPage.classList.replace('block', 'hidden');
    emptyPage.classList.replace('hidden', 'flex');
    return true;
  } else {
    productPage.classList.replace('hidden', 'block');
    emptyPage.classList.replace('flex', 'hidden');
    return false;
  }
}

//users action

//delete
function removeItem(clickedBtn) {
  const itemToBeDeletedId =
    clickedBtn.parentElement.parentElement.getAttribute('id');
  const newBasketItem = dataBase[1].basket.filter(
    (item) => item.id !== itemToBeDeletedId
  );
  dataBase[1].basket = newBasketItem;
  findProductsInCart(sortBy.value);
  localStorage.setItem('dataBase', JSON.stringify(dataBase));
  itemInCart.innerText = dataBase[1].basket.length;

  checkout();

  emptyOrNot();
}

//increase

function increment(btn) {
  const cartItemQuantity = btn.parentElement.children[1];

  const productId =
    btn.parentElement.parentElement.parentElement.getAttribute('id');

  const selectedProduct = dataBase[1].basket.find(
    (product) => +product.id === +productId
  );

  selectedProduct.quantity++;
  cartItemQuantity.value = selectedProduct.quantity;
  localStorage.setItem('dataBase', JSON.stringify(dataBase));
  findProductsInCart(sortBy.value);
}

//Decrease

function decrement(btn) {
  const cartItemQuantity = btn.parentElement.children[1];

  if (cartItemQuantity.value <= 1) return;

  const productId =
    btn.parentElement.parentElement.parentElement.getAttribute('id');

  const selectedProduct = dataBase[1].basket.find(
    (product) => +product.id === +productId
  );

  selectedProduct.quantity--;
  cartItemQuantity.value = selectedProduct.quantity;
  localStorage.setItem('dataBase', JSON.stringify(dataBase));
  findProductsInCart(sortBy.value);
}

//empty cart

const emptyCartBtn = document.querySelector('[data-empty-btn]');

emptyCartBtn.addEventListener('click', emptyCart);

function emptyCart() {
  let confirm = window.confirm('are you sure you want to empty your cart');

  if (confirm) {
    dataBase[1].basket = [];
    localStorage.setItem('dataBase', JSON.stringify(dataBase));
    itemInCart.innerText = dataBase[1].basket.length;
    emptyOrNot();
  }
}
