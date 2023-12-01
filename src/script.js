
const itemContainer = document.querySelector('[data-item-container]');
const itemTemplate = document.querySelector('[data-item-template]');
const filter = document.getElementById('filter');
const checkoutContainer = document.querySelector('#checkout-container');
//let products = [];

function dataReady() {
  if (
    selectedOption !== null &&
    selectedOption !== '' &&
    selectedOption !== 'all'
  ) {
    filterItem(selectedOption);
  } else {
    appendToContainer(products);
  }
}

//select input

const selectElement = document.getElementById('my-select');
const selectedOption = dataBase[0].filter;

function filterItem(filterValue) {
  const filteredItem = products.filter(
    (product) => product.category === filterValue
  );
  appendToContainer(filteredItem);

  if (checkoutContainer.classList.contains('flex')) {
    checkoutContainer.classList.replace('flex', 'hidden');
  }
}

if (selectedOption !== null && selectedOption !== '') {
  selectElement.value = selectedOption;
}

selectElement.addEventListener('change', (e) => {
  let filterValue = e.target.value;
  dataBase[0].filter = filterValue;

  switch (filterValue) {
    case 'all':
      appendToContainer(products);
      break;
    case "men's clothing":
      filterItem(filterValue);
      break;
    case 'jewelery':
      filterItem(filterValue);
      break;
    case 'electronics':
      filterItem(filterValue);
      break;
    case "women's clothing":
      filterItem(filterValue);
      break;
  }

  localStorage.setItem('dataBase', JSON.stringify(dataBase));
});

function appendToContainer(val) {
  itemContainer.innerHTML = '';
  val.forEach(({ price, category, rating: { rate }, image, id, title }) => {
    let search = dataBase[1].basket.find((item) => item.id == id);
    const itemCard = itemTemplate.content.cloneNode(true).children[0];
    const itemCategory = itemCard.querySelector('[data-category]');
    const itemPrice = itemCard.querySelector('[data-price]');
    const itemRating = itemCard.querySelector('[data-rating]');
    const itemImage = itemCard.querySelector('[data-image]');
    const itemBTn = itemCard.querySelector('[data-cart-btn]');
    const itemTitle = itemCard.querySelector('[data-title]');

    itemCategory.innerText = category;
    itemTitle.innerText = title;
    itemPrice.textContent = `$${price}`;
    itemImage.src = image;
    itemRating.innerText = `Rating: ${rate}`;
    itemCard.setAttribute('id', id);
    if (search !== undefined) {
      itemBTn.children[0].classList.replace(
        'fa-cart-plus',
        'fa-trash-arrow-up'
      );
      itemBTn.classList.replace('bg-blue-500', 'bg-gray-300');
      itemBTn.classList.replace('text-white', 'text-blue-600');
    }

    itemContainer.append(itemCard);
  });
  cart();
}

//add to cart

let itemInCart = document.querySelector('[data-cart-item]');

let activeBtn;

function cart() {
  const cartBtn = itemContainer.querySelectorAll('[data-cart-btn]');
  cartBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeBtn = btn;
      const btnIcon = btn.children[0];
      const itemId = btn.parentElement.getAttribute('id');

      if (btnIcon.classList.contains('fa-cart-plus')) {
        btnIcon.classList.replace('fa-cart-plus', 'fa-trash-arrow-up');
        btn.classList.replace('bg-blue-500', 'bg-gray-300');
        btn.classList.replace('text-white', 'text-blue-600');

        if (checkoutContainer.classList.contains('hidden')) {
          checkoutContainer.classList.replace('hidden', 'flex');
        }

        checkoutContainer.setAttribute('id', itemId);

        const selectedItem = dataBase[1].basket.find(
          (item) => item.id === itemId
        );

        if (selectedItem === undefined) {
          dataBase[1].basket.push({
            id: itemId,
            quantity: 1,
          });
        }

        appendToCheckout(btn);
        localStorage.setItem('dataBase', JSON.stringify(dataBase));

        //  notification();
      } else {
        btnIcon.classList.replace('fa-trash-arrow-up', 'fa-cart-plus');
        btn.classList.replace('bg-gray-300', 'bg-blue-500');
        btn.classList.replace('text-blue-600', 'text-white');
        btn.parentElement.classList.remove('active');
        let checkoutContainerId = checkoutContainer.getAttribute('id');

        if (checkoutContainerId === itemId) {
          checkoutContainer.classList.replace('flex', 'hidden');
        }

        const newBasketItem = dataBase[1].basket.filter((item) => {
          return item.id !== itemId;
        });

        dataBase[1].basket = newBasketItem;

        localStorage.setItem('dataBase', JSON.stringify(dataBase));
        //  notification(removed);
      }

      itemInCart.innerText = dataBase[1].basket.length;
    });
  });
}

itemInCart.innerText = dataBase[1].basket.length;

function appendToCheckout(btn) {
  btn.parentElement.classList.add('active');
  const itemToAppendPrice = btn.parentElement.children[3].children[0].innerText;
  const itemToAppendSrc = btn.parentElement.children[1].src;
  const itemQuantity = document.querySelector('[data-quantity-value]');

  const checkoutPrice = document.getElementById('checkout-price');
  const checkoutImageSrc = document.getElementById('checkout-image');

  checkoutPrice.innerText = itemToAppendPrice;
  checkoutImageSrc.src = itemToAppendSrc;
  itemQuantity.innerText = 1;
}

//increment and decrement
const incrementBtn = document.querySelector('[data-increment-btn]');
const decrementBtn = document.querySelector('[data-decrement-btn]');
let quantityvalue = document.querySelector('[data-quantity-value]');

incrementBtn.addEventListener('click', () => {
  const itemId = checkoutContainer.getAttribute('id');

  const selectedItem = dataBase[1].basket.find((item) => item.id === itemId);

  selectedItem.quantity++;
  quantityvalue.innerText = selectedItem.quantity;
  localStorage.setItem('dataBase', JSON.stringify(dataBase));
});

decrementBtn.addEventListener('click', () => {
  let itemId = checkoutContainer.getAttribute('id');
  let selectedItem = dataBase[1].basket.find((item) => item.id === itemId);

  if (selectedItem === undefined) {
    return;
  } else if (selectedItem.quantity <= 1) {
    let newBasketItem = dataBase[1].basket.filter((item) => {
      return item.id !== itemId;
    });

    dataBase[1].basket = newBasketItem;
    checkoutContainer.classList.replace('flex', 'hidden');
    activeBtn.children[0].classList.replace(
      'fa-trash-arrow-up',
      'fa-cart-plus'
    );
    activeBtn.classList.replace('bg-gray-300', 'bg-blue-500');
    activeBtn.classList.replace('text-blue-600', 'text-white');
    activeBtn.parentElement.classList.remove('active');

    itemInCart.innerText = dataBase[1].basket.length;
    localStorage.setItem('dataBase', JSON.stringify(dataBase));
  } else {
    selectedItem.quantity--;
    quantityvalue.innerText = selectedItem.quantity;
    localStorage.setItem('dataBase', JSON.stringify(dataBase));
  }
});

// let messages = {
//   added: 'Item sucessfully added to cart',
//   removed: 'item removed from cart',
// };

// function notification() {
//   alert(messages.added);
// }
