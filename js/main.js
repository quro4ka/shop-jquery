basket = {};

function start_shop() {
  $.getJSON('clothes.json', products_out);
}

function products_out(data) {
  let out = '';
  for (key in data) {
    out += '<div class="product-out">';
    out += `<img class="pics" src="image/${data[key].img}">`;
    out += `<p>${data[key].name}</p>`;
    out += `<p>${data[key].price} $</p>`;
    out += `<button class="addToBasket" type="button" id="${key}">Buy</button>`;
    out += '</div>';
  }

  $('.products-out').html(out);
  $('.addToBasket').on('click', addToBasket);
}

function addToBasket() {
  // alert(1);
  let id = $(this).attr('id');
  if (basket[id] == undefined) {
    basket[id] = 1;
    saveMiniBasket();
    showMiniBasket();
  } else {
    basket[id]++;
    saveMiniBasket();
    showMiniBasket();
  }
}

function showMiniBasket() {
  $.getJSON('clothes.json', function (data) {
    // console.log(basket);
    let sum = 0;
    let out = `<div class="basket__title">Basket total: Price:  </div>`;
    for (let key in basket) {
      // console.log(111);
      out += '<div class="basket__product">';
      out += `<img class="basket__img" src="image/${data[key].img}">`;
      out += `<div class="basket__name">${data[key].name}</div>`;
      out += `<div class="basket__count-product"> <span> ${basket[key]}</span></div>`;
      out += `<div class="basket__price">${data[key].price * basket[key]} $</div>`;
      out += `<button class="basket__delete" id="${key}">Delete</button>`;
      out += '</div>';
      sum += +(data[key].price * basket[key]);
    }
    // console.log('sum' + sum);
    $('.mini-basket').html(out);
    $('.basket__title').html(`Price: ${sum}`);
    $('.basket__delete').on('click', deleteProduct);
  });
}

function deleteProduct() {
  let id = $(this).attr('id');
  delete basket[id];
  saveMiniBasket();
  showMiniBasket();
}

function saveMiniBasket() {
  localStorage.setItem('basket', JSON.stringify(basket));
}

function loadMiniBasket() {
  if (localStorage.getItem('basket')) {
    basket = JSON.parse(localStorage.getItem('basket'));
    showMiniBasket();
  }
}

$(document).ready(function () {
  start_shop();
  loadMiniBasket();

  // $('.enter-shop').on('click', enterShop);
  // if (document.cookie.match) {

  // }
  // out = 'You login like' + result[1] + '.';
  // out += '<form action="php/exitAdmin.php"></form>';
  // out += '<input type="submit" value="you are log">';

  // $('.admin').html(out);
});
