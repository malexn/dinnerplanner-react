const httpOptions = {
  headers: {'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'}
};

const DinnerModel = function () {

  let numberOfGuests = 2;
  if(localStorage.getItem('numberOfGuests')){
    numberOfGuests = parseInt(localStorage.getItem('numberOfGuests'), 10);
  }
  let observers = [];
  let menu = [];
  if(localStorage.getItem('menu')){
    menu = JSON.parse(localStorage.getItem('menu')); 
  }
  


  this.setNumberOfGuests = function (num) {
    numberOfGuests = num;
    if(num < 1) num = 0;
    localStorage.setItem('numberOfGuests', numberOfGuests);
    notifyObservers();
  };

  this.getNumberOfGuests = function () {
    return numberOfGuests;
  };

  this.addDishToMenu = function(dish) { 
    if (!menu.some(d => d.id === dish.id)){
      menu.push(dish)
      localStorage.setItem('menu', JSON.stringify(menu));
    }
    notifyObservers();
  }

  this.removeDishFromMenu = function(dish) {
    menu = menu.filter(d => d.id !== dish.id)
    localStorage.setItem('menu', JSON.stringify(menu));
    notifyObservers();
  }

  this.getFullMenu = function() {
    return menu;
    
  };

  this.getTotalMenuPrice = function() {
    var totalPrice=0;
    
    for (var i in menu) {
      totalPrice += menu[i].pricePerServing*numberOfGuests
    }

    return Math.round(totalPrice);
  }
  // API Calls

  this.getAllDishes = function (type, filter) {
    const url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?type=' + type + '&query=' + filter;
    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError)
  }

  this.getDish = function (id) {
    const url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + id + '/information';
    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError)
  }
  
  // API Helper methods

  const processResponse = function (response) {
    if (response.ok) {
      return response.json()
    }
    throw response;
  }
  
  const handleError = function (error) {
    if (error.json) {
      error.json().then(error => {
        console.error('getAllDishes() API Error:', error.message || error)
      })
    } else {
      console.error('getAllDishes() API Error:', error.message || error)
    }
  }

  // Observer pattern

  this.addObserver = function (observer) {
    observers.push(observer);
  };

  this.removeObserver = function (observer) {
    observers = observers.filter(o => o !== observer);
  };

  const notifyObservers = function () {
    observers.forEach(o => o.update());
  };
};

export const modelInstance = new DinnerModel();
