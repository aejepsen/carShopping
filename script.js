const cartItemsClass = '.cart__items';

const sumPrice = () => {
  const listItems = document.querySelectorAll('.cart__item');
  let sum = 0;
  listItems.forEach((item) => {
    const itemText = item.innerText.split(' ');
    const price = itemText[itemText.length - 1];
    sum += parseFloat(price.split('').splice(1).join(''));
  });
  const totalPrice = document.querySelector('.total-price');
  totalPrice.innerText = sum;
};

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
}
// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }
function cartItemClickListener(event) {
  event.target.remove();
  const cartItems = document.querySelector(cartItemsClass);
  saveCartItems('cartItems', cartItems.innerHTML);
  sumPrice();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const eachItemOnItems = async () => {
  const items = document.querySelector('.items');
  const data = await fetchProducts('computador');
  const products = data.results;
  products.forEach((product) => {
    const obj = {
      sku: product.id,
      name: product.title,
      image: product.thumbnail,
    };
    items.appendChild(createProductItemElement(obj));
  });
};

const adicionaItem = async (e) => {
  const cartItems = document.querySelector(cartItemsClass);
  const itemSku = e.target.parentNode.firstChild.innerText;
  const item = await fetchItem(itemSku);
  const obj = {
    sku: item.id,
    name: item.title,
    salePrice: item.price,
  };
  cartItems.appendChild(createCartItemElement(obj));
  saveCartItems('cartItems', cartItems.innerHTML);
  sumPrice();
};

const emptCart = () => {
  const cartItems = document.querySelector(cartItemsClass);
  cartItems.innerHTML = '';
  sumPrice();
  saveCartItems('cartItems', cartItems.innerHTML);
};

window.onload = async () => { 
  const cartItems = document.querySelector(cartItemsClass);
  const loading = document.querySelector('.loading');
  await eachItemOnItems();
  loading.remove();
  cartItems.innerHTML = getSavedCartItems('cartItems');
  cartItems.addEventListener('click', cartItemClickListener);
  const buttonAddItem = document.querySelectorAll('.item__add');
  buttonAddItem.forEach((button) => {
    button.addEventListener('click', adicionaItem);
  });
  const emptyCart = document.querySelector('.empty-cart');
  emptyCart.addEventListener('click', emptCart);
};
