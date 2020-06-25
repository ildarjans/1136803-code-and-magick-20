'use strict';

(function () {

  function getNextValue(arr, currentValue) {
    return arr[(arr.indexOf(currentValue) + 1) % arr.length];
  }

  function getRandomInteger(max) {
    return Math.floor(Math.random() * (max + 1));
  }

  function getShuffledArray(array, quantity) {
    if (array.length < quantity) {
      return undefined;
    }
    quantity = !quantity ? array.length : quantity;
    var randomNames = [];
    while (randomNames.length < quantity) {
      var guess = array[getRandomInteger(array.length - 1)];

      if (randomNames.indexOf(guess) < 0) {
        randomNames.push(guess);
      }
    }
    return randomNames;
  }

  window.utilities = {
    getNextValue: getNextValue,
    getRandomInteger: getRandomInteger,
    getShuffledArray: getShuffledArray
  };

})();
