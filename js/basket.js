let basket = {};

function loadBasket() {
  if (localStorage.getItem('basket')) {
    basket = JSON.parse(localStorage.getItem('basket'));
    showBasket();
  } else {
    $('.basket').html('Basket is empty!');
  }
}

function showBasket() {
  if (jQuery.isEmptyObject(basket)) {
    $('.basket').html('Basket is empty!');
  } else {
    $.getJSON('gun.json', function (data) {
      let sum = 0;
      let count = 0;
      let out = '<div class="basket__title">Basket</div>';
      for (let key in basket) {
        out += '<div class="basket__product">';
        out += `<img class="basket__img" src="image/${data[key].img}">`;
        out += `<div class="basket__name">${data[key].name}</div>`;

        out += `<button class="basket__minus" id="${key}">-</button>`;
        out += `<div class="basket__count-product"> <span> ${basket[key]}</span></div>`;
        out += `<button class="basket__plus" id="${key}">+</button>`;

        out += `<div class="basket__description">${data[key].deskription}</div>`;
        out += `<div class="basket__price">${data[key].price * basket[key]} $</div>`;
        out += `<button class="basket__delete" id="${key}">Delete</button>`;
        out += '</div>';
        count += +basket[key];
        sum += +(data[key].price * basket[key]);
      }
      $('.basket__main').html(out);
      $('.basket__result-count').html(`Count of products: ${count}`);
      $('.basket__result-price').html(`Price: ${sum}`);
      $('.basket__plus').on('click', basketPlus);
      $('.basket__minus').on('click', basketMinus);
      $('.basket__delete').on('click', deleteProduct);
    });
  }
}

function basketPlus() {
  let id = $(this).attr('id');
  basket[id]++;
  saveBasket();
  showBasket();
}

function basketMinus() {
  let id = $(this).attr('id');
  if (basket[id] > 1) {
    basket[id]--;
  } else {
    delete basket[id];
  }
  saveBasket();
  showBasket();
}

function deleteProduct() {
  let id = $(this).attr('id');
  delete basket[id];
  saveBasket();
  showBasket();
}

function saveBasket() {
  localStorage.setItem('basket', JSON.stringify(basket));
}

$(document).ready(function () {
  loadBasket();
});
