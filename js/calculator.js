/**
 * GroundAgent India - Interactive Travel Cost Calculator
 * "Should you travel yourself?"
 */

(function () {
  'use strict';

  // Currency presets & symbols
  const CURRENCIES = {
    USD: { symbol: '$', rate: 1.0, flight: 1400, hotel: 180, transport: 250, meals: 100 },
    GBP: { symbol: '£', rate: 0.79, flight: 1100, hotel: 145, transport: 200, meals: 80 },
    EUR: { symbol: '€', rate: 0.92, flight: 1300, hotel: 165, transport: 230, meals: 95 }
  };

  let currentCurrency = 'USD';

  // DOM elements
  const peopleInput = document.getElementById('calc-people');
  const flightInput = document.getElementById('calc-flight');
  const hotelInput = document.getElementById('calc-hotel');
  const nightsInput = document.getElementById('calc-nights');
  const transportInput = document.getElementById('calc-transport');
  const mealsInput = document.getElementById('calc-meals');
  const daysAwayInput = document.getElementById('calc-days-away');

  const totalCostEl = document.getElementById('calc-total-cost');
  const hoursAwayEl = document.getElementById('calc-hours-away');
  const breakdownFlightsEl = document.getElementById('calc-breakdown-flights');
  const breakdownHotelsEl = document.getElementById('calc-breakdown-hotels');
  const breakdownLocalEl = document.getElementById('calc-breakdown-local');

  const currencyBtns = document.querySelectorAll('.currency-btn');
  const currencyPrefixes = document.querySelectorAll('.calc-prefix');

  function formatMoney(amount, symbol) {
    return symbol + Math.round(amount).toLocaleString('en-US');
  }

  function calculate() {
    if (!peopleInput || !flightInput) return;

    const people = Math.max(1, parseInt(peopleInput.value, 10) || 1);
    const flight = Math.max(0, parseFloat(flightInput.value) || 0);
    const hotel = Math.max(0, parseFloat(hotelInput.value) || 0);
    const nights = Math.max(0, parseInt(nightsInput.value, 10) || 0);
    const transport = Math.max(0, parseFloat(transportInput.value) || 0);
    const meals = Math.max(0, parseFloat(mealsInput.value) || 0);
    const daysAway = Math.max(1, parseInt(daysAwayInput.value, 10) || 1);

    const totalFlights = people * flight;
    const totalHotels = people * hotel * nights;
    const totalTransport = transport * (people > 2 ? 1.5 : 1);
    const totalMeals = people * meals * (nights + 1);

    const totalTripCost = totalFlights + totalHotels + totalTransport + totalMeals;
    const totalHoursLost = people * daysAway * 8; // standard 8 working hours per day

    const symbol = CURRENCIES[currentCurrency].symbol;

    if (totalCostEl) totalCostEl.textContent = formatMoney(totalTripCost, symbol);
    if (hoursAwayEl) hoursAwayEl.textContent = totalHoursLost + ' hrs away';
    if (breakdownFlightsEl) breakdownFlightsEl.textContent = formatMoney(totalFlights, symbol);
    if (breakdownHotelsEl) breakdownHotelsEl.textContent = formatMoney(totalHotels, symbol);
    if (breakdownLocalEl) breakdownLocalEl.textContent = formatMoney(totalTransport + totalMeals, symbol);
  }

  function setCurrency(code) {
    if (!CURRENCIES[code]) return;
    currentCurrency = code;
    const curr = CURRENCIES[code];

    // Update prefix text
    currencyPrefixes.forEach(prefix => {
      prefix.textContent = curr.symbol;
    });

    // Update button active state
    currencyBtns.forEach(btn => {
      if (btn.dataset.currency === code) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    // Pre-populate sensible defaults for that currency
    flightInput.value = curr.flight;
    hotelInput.value = curr.hotel;
    transportInput.value = curr.transport;
    mealsInput.value = curr.meals;

    calculate();
  }

  // Bind events
  const inputs = [peopleInput, flightInput, hotelInput, nightsInput, transportInput, mealsInput, daysAwayInput];
  inputs.forEach(input => {
    if (input) {
      input.addEventListener('input', calculate);
    }
  });

  currencyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.dataset.currency;
      if (code) setCurrency(code);
    });
  });

  // Initial calculation on load
  document.addEventListener('DOMContentLoaded', () => {
    calculate();
  });
})();
