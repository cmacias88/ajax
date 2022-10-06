'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  fetch('/fortune')
    .then((response) => response.text())
    .then((Fortune) => {
      document.querySelector("#fortune-text").innerText = Fortune;
    });
    
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const zipcode = document.querySelector('#zipcode-field').value;
  const queryString = new URLSearchParams({ zipcode }).toString();
  const url = `/weather.json?${queryString}`;

  fetch(url)
    .then((response) => response.json())
    .then((weather) => {
      console.log(weather);
      document.querySelector('#weather-info').innerHTML = weather.forecast;
    });
    
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  function changeInput(input) {
    if (input.code === 'OK') {
      document.querySelector('#order-status').classList.remove('order-error');
      document.querySelector('#order-status').innerHTML = `<p>${input.msg}</p>`;
    } else {
      document.querySelector('#order-status').classList.add('order-error');
      document.querySelector('#order-status').innerHTML = `<p><b>${input.msg}</b></p>`;
    }
  };

  const formInputs = {
    type : document.querySelector('#melon-type-field').value,
    qty : document.querySelector('#"qty-field"').value, 
  };

  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json',
    }
  })

    .then((response) => response.json())
    .then(changeInput);
}

document.querySelector('#order-form').addEventListener('submit', orderMelons);
