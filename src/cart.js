/*function dataReady() {
  filterOutProducts();
  actuvateDeleteBtn();
  console.log('re called')
}
const cartItemTemplate = document.querySelector('[data-cart-item-template]');
const cartItemsContainer = document.querySelector(
  '[data-cart-items-container]'
);
const cartItemTotalQuantity = document.querySelector('[data-total-cart-items]');

function filterOutProducts() {
  const items = dataBase[1].basket;
  const productData = products;

  if(items.length === 0) return;

  const cartItemProducts = [];

  items.forEach((item) => {
    const itemInCartData = productData.find(
      (product) => product.id === +item.id
    );
    cartItemProducts.push({ ...itemInCartData, quantity: item.quantity });
  });

  console.log(cartItemProducts)

  appendToCartContainer(cartItemProducts);
}

function appendToCartContainer(cartItemProducts) {
  cartItemProducts.forEach(
    ({ id, price, quantity, image, category, title }) => {
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

      cartItemImage.src = image;
      cartItemCategory.innerText = category;
      cartItemTitle.innerText = title;
      cartItemQuantity.value = quantity;
      cartItemPrice.innerText = `$${price}`;
      cartItemContainer.setAttribute('id', id);

      cartItemsContainer.append(cartItemContainer);
    }
  );

  totalQuantity(cartItemProducts);

}

function totalQuantity(cartItemProducts) {
  const itemQuantity = cartItemProducts.map((item) => +item.quantity);

  const totalQuantity = itemQuantity.reduce(
    (total, quantity) => total + quantity,
    0
  );

  cartItemTotalQuantity.innerText = totalQuantity;
}

function actuvateDeleteBtn() {
  const deleteBtn = cartItemsContainer.querySelectorAll(
    '[data-cart-item-delete-btn]'
  );
  deleteBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      const itemToBeDeletedId =
        btn.parentElement.parentElement.getAttribute('id');

     //   btn.parentElement.parentElement.remove()

      //  const newBasketItem = dataBase[1].basket.filter((item) => item.id != itemToBeDeletedId);
      //  dataBase[1].basket = newBasketItem;
        
       // localStorage.setItem('dataBase', JSON.stringify(dataBase));
       // filterOutProducts()

      // console.log(itemToBeDeletedId, dataBase[1].basket)
       
      const newBasketItem = dataBase[1].basket.filter((item) => +item.id !== +itemToBeDeletedId);
    //  console.log(newBasketItem)


    //  const itemToBeDeleted = dataBase[1].basket.find((item) => +item.id === +itemToBeDeletedId);
    //  console.log(itemToBeDeleted)
    //  itemToBeDeleted.remove()
      dataBase[1].basket = newBasketItem
      localStorage.setItem('dataBase', JSON.stringify(dataBase));


      filterOutProducts()
      



    });
  });
} */
