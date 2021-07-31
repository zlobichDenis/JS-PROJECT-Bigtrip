/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/form.js":
/*!********************************!*\
  !*** ./src/components/form.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createForm": () => (/* binding */ createForm)
/* harmony export */ });
const createForm = () => {
  
    return `
    <form class="trip-events__item  event  event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>

            <div class="event__type-item">
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
              <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
            </div>
          </fieldset>

          <fieldset class="event__type-group">
            <legend class="visually-hidden">Activity</legend>

            <div class="event__type-item">
              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          Flight to
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
          <option value="Saint Petersburg"></option>
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">
          From
        </label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 00:00">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 00:00">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
            <label class="event__offer-label" for="event-offer-luggage-1">
              <span class="event__offer-title">Add luggage</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">30</span>
            </label>
          </div>

          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked>
            <label class="event__offer-label" for="event-offer-comfort-1">
              <span class="event__offer-title">Switch to comfort class</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">100</span>
            </label>
          </div>

          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">
            <label class="event__offer-label" for="event-offer-meal-1">
              <span class="event__offer-title">Add meal</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">15</span>
            </label>
          </div>

          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">
            <label class="event__offer-label" for="event-offer-seats-1">
              <span class="event__offer-title">Choose seats</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">5</span>
            </label>
          </div>

          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">
            <label class="event__offer-label" for="event-offer-train-1">
              <span class="event__offer-title">Travel by train</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">40</span>
            </label>
          </div>
        </div>
      </section>
    </section>
  </form>
    `
};



/***/ }),

/***/ "./src/components/menu.js":
/*!********************************!*\
  !*** ./src/components/menu.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createMenu": () => (/* binding */ createMenu)
/* harmony export */ });
const createMenu = () => { 
    return `
        <nav class="trip-controls__trip-tabs  trip-tabs">
            <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
            <a class="trip-tabs__btn" href="#">Stats</a>
        </nav>
    `
};



/***/ }),

/***/ "./src/components/sort.js":
/*!********************************!*\
  !*** ./src/components/sort.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createSort": () => (/* binding */ createSort)
/* harmony export */ });
const createSort = () => {
    return `
        <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            <span class="trip-sort__item  trip-sort__item--day">Day</span>

            <div class="trip-sort__item  trip-sort__item--event">
                <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" checked>
                <label class="trip-sort__btn" for="sort-event">Event</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--time">
                <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
                <label class="trip-sort__btn" for="sort-time">
                    Time
                    <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
                    <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
                    </svg>
                </label>
            </div>

            <div class="trip-sort__item  trip-sort__item--price">
                <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
                <label class="trip-sort__btn" for="sort-price">
                    Price
                    <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
                    <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
                    </svg>
                </label>
            </div>

            <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
        </form>
    `
};



/***/ }),

/***/ "./src/components/tripDay.js":
/*!***********************************!*\
  !*** ./src/components/tripDay.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createTripDay": () => (/* binding */ createTripDay),
/* harmony export */   "createTripEventMarkup": () => (/* binding */ createTripEventMarkup)
/* harmony export */ });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const.js */ "./src/const.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util.js */ "./src/util.js");



const createNewDayMarkup = () => {
  return `
  <li class="trip-days__item  day">
  <div class="day__info">
    <span class="day__counter">1</span>
    <time class="day__date" datetime="${dateFrom}">${monthOfTravel} ${dayOfTravel}</time> 
  </div>
  `
};

const createOffersMarkup = (offers) => {
  return offers.offers.map((offer) => {
    return `
    <li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
  </li>
  `
  }).join('\n');

};

const createTripEventMarkup = (item) => {
  const {base_price: basePrice, offers, date_to: dateTo, date_from: dateFrom, destination, is_favorite: isFavorite} = item;

  const timeFrom = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.formatTime)(dateFrom);
  const timeTo = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.formatTime)(dateTo);
  const offersList = createOffersMarkup(offers);
  return `
      <li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${offers.type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">Taxi to ${destination.name}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom}">${timeFrom}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateTo}">${timeTo}</time>
          </p>
          <p class="event__duration">30M</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersList}
        </ul>

    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>
  `
};

const createTripDay = (item, array) => {
  const {base_price: basePrice, offers, date_to: dateTo, date_from: dateFrom, destination, is_favorite: isFavorite} = item;
  const monthOfTravel = _const_js__WEBPACK_IMPORTED_MODULE_0__.MONTH_NAMES[dateFrom.getMonth()];
  const dayOfTravel = dateFrom.getDay();

  const events = array.join('\n')

 const newDayDiv = `             
        <span class="day__counter">1</span>
        <time class="day__date" datetime="2019-03-18">${monthOfTravel} ${dayOfTravel}</time>
    `;
  /*   const isANewDay = i % 3 === 0 ? newDayDiv : ''; */
/*     const tripEventMarkup = createTripEventMarkup(item); */
    
    return  `
      <li class="trip-days__item  day">
        <div class="day__info">${newDayDiv}</div>
        <ul class="trip-events__list">
          ${events}
        </ul>
      </li>
    `
};




/***/ }),

/***/ "./src/components/tripFilters.js":
/*!***************************************!*\
  !*** ./src/components/tripFilters.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createTripFilters": () => (/* binding */ createTripFilters)
/* harmony export */ });
const createTripFilters = () => {
    return `
        <form class="trip-filters" action="#" method="get">
            <div class="trip-filters__filter">
                <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
                <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
            </div>

            <div class="trip-filters__filter">
                <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
                <label class="trip-filters__filter-label" for="filter-future">Future</label>
            </div>

            <div class="trip-filters__filter">
                <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
                <label class="trip-filters__filter-label" for="filter-past">Past</label>
            </div>

            <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
    `
};



/***/ }),

/***/ "./src/components/tripInfo.js":
/*!************************************!*\
  !*** ./src/components/tripInfo.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createTripInfo": () => (/* binding */ createTripInfo)
/* harmony export */ });
const createTripInfo = () => {
    return `
        <div class="trip-info__main">
            <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

            <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
        </div>

        <p class="trip-info__cost">
            Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
        </p>
    `
};



/***/ }),

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MONTH_NAMES": () => (/* binding */ MONTH_NAMES)
/* harmony export */ });
const MONTH_NAMES = [
    'January',
    'Febrary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'Semtember',
    'October',
    'November',
    'December',
];



/***/ }),

/***/ "./src/data.js":
/*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pointsOfDestination": () => (/* binding */ pointsOfDestination),
/* harmony export */   "offers": () => (/* binding */ offers)
/* harmony export */ });
const pointsOfDestination = [
    {
        'description': 'some desc',
        'name': 'Amsterdam',
        'picture': [{
                'picture': `http://picsum.photos/248/152?r=${Math.random()}`, 
                'description': 'Some desc',
            }],
    },
    {
        'description': 'some desc',
        'name': 'London',
        'picture': [{
                'picture': `http://picsum.photos/248/152?r=${Math.random()}`, 
                'description': 'Some desc',
            }],
    },
    {
        'description': 'some desc',
        'name': 'Paris',
        'picture': [{
                'picture': `http://picsum.photos/248/152?r=${Math.random()}`, 
                'description': 'Some desc',
            }],
    },
    {
        'description': 'some desc',
        'name': 'Moscow',
        'picture': [{
                'picture': `http://picsum.photos/248/152?r=${Math.random()}`, 
                'description': 'Some desc',
            }],
    },
];

const offers = [
    {
        'type': 'taxi',
        'offers': [
            {
                "title": "Upgrade to a business class",
                "price": 120,
            }, 
            {
                "title": "Choose the radio station",
                "price": 60,
            },
            {
                'title': 'Order Uber',
                'price': 20,
            }
        ],
    },{
        'type': 'flight',
        'offers': [
            {
                "title": "Upgrade to a business class",
                "price": 120,
            }, 
            {
                "title": "Chose seats",
                "price": 5,
            },
            {
                'title': 'add meal',
                'price': 15,
            },
            {
                'title': 'add luggage',
                'price': 30,
            }
        ],
    },{
        'type': 'train',
        'offers': [
            {
                "title": "Upgrade to a business class",
                "price": 120,
            }, 
            {
                "title": "Chose seats",
                "price": 5,
            },
        ],
    }, {
        'type': 'ship',
        'offers': [
            {
                "title": "Upgrade to a business class",
                "price": 120,
            }, 
            {
                "title": "Chose seats",
                "price": 5,
            },
        ],
    },{
        'type': 'bus',
        'offers': [
            {
                "title": "Upgrade to a business class",
                "price": 120,
            }, 
            {
                "title": "Chose seats",
                "price": 5,
            },
            {
                "title": "Choose the radio station",
                "price": 60,
            },
        ],
    }, {
        'type': 'transport',
        'offers': [
            {
                "title": "Upgrade to a business class",
                "price": 120,
            }, 
            {
                "title": "Chose seats",
                "price": 5,
            },
            {
                "title": "Choose the radio station",
                "price": 60,
            },
        ],
    }, {
        'type': 'drive',
        'offers': [
            {
                "title": "Rent a car",
                "price": 200,
            }, 
        ],
    },  {
        'type': 'check-in',
        'offers': [
            {
                "title": "Add breakfest",
                "price": 50,
            }
        ],
    },  {
        'type': 'sightseeing',
        'offers': [
            {
                "title": "Book tickets",
                "price": 40,
            }, 
            {
                "title": "Lunch in city",
                "price": 30,
            }
        ],
    },  {
        'type': 'restaurant',
        'offers': [
            {
                "title": "Breakfest",
                "price": 120,
            }, 
            {
                "title": "Lunch",
                "price": 60,
            }
        ],
    }, 
];



/***/ }),

/***/ "./src/mock/events.js":
/*!****************************!*\
  !*** ./src/mock/events.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateEvents": () => (/* binding */ generateEvents)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util.js */ "./src/util.js");
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data.js */ "./src/data.js");




const generateEvent = (item) => {
    const destination = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArrayElem)(_data_js__WEBPACK_IMPORTED_MODULE_1__.pointsOfDestination);
    const offer = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArrayElem)(_data_js__WEBPACK_IMPORTED_MODULE_1__.offers); 
    return {
        "base_price": (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.getRandomIntNumber)(100, 500), // Сумма цент всех офферов путешествия
        "date_from": (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.getRandomDate)(), // функция для определения
        "date_to": (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.getRandomDate)(),
        "destination": destination, // Массив состоящий из все точек путешествий
        "id": "0", // Счетчик i
        "is_favorite": Math.random() > 0.5,
        "offers": offer, // Массив состоящий из всех офферов каждого ивента
    }
};

const generateEvents = (count) => {
    return new Array(count).fill('').map((item) => generateEvent(item));
};



/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRandomIntNumber": () => (/* binding */ getRandomIntNumber),
/* harmony export */   "getRandomArrayElem": () => (/* binding */ getRandomArrayElem),
/* harmony export */   "getRandomDate": () => (/* binding */ getRandomDate),
/* harmony export */   "castTimeFormat": () => (/* binding */ castTimeFormat),
/* harmony export */   "formatTime": () => (/* binding */ formatTime)
/* harmony export */ });
const getRandomIntNumber = (min, max) => {
    return parseInt(Math.random() * (max - min) + min);
};

const getRandomArrayElem = (array) => {
    return array[getRandomIntNumber(0, array.length - 1)];
};

const getRandomDate = () => {
    const targetDate = new Date;
    const sign = Math.random() > 0.5 ? 1 : -1;
    const diffValue = sign * getRandomIntNumber(0, 10);

    targetDate.setDate(targetDate.getDate() + diffValue);

    return targetDate
};

const castTimeFormat = (value) => {
    return value < 10 ? `0${value}` : String(value);
};

const formatTime = (date) => {
    const hours = castTimeFormat(date.getHours() % 12);
    const minutes = castTimeFormat(date.getMinutes())

    return `${hours}:${minutes}`
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_menu_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/menu.js */ "./src/components/menu.js");
/* harmony import */ var _components_tripInfo_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/tripInfo.js */ "./src/components/tripInfo.js");
/* harmony import */ var _components_tripFilters_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/tripFilters.js */ "./src/components/tripFilters.js");
/* harmony import */ var _components_sort_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/sort.js */ "./src/components/sort.js");
/* harmony import */ var _components_form_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/form.js */ "./src/components/form.js");
/* harmony import */ var _components_tripDay_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/tripDay.js */ "./src/components/tripDay.js");
/* harmony import */ var _mock_events_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mock/events.js */ "./src/mock/events.js");








// Variables
const tripInfo = document.querySelector('.trip-main__trip-info');
const tripNav = document.querySelector('.trip-controls__trip-tabs');
const tripControls = document.querySelector('.trip-main__trip-controls');
const tripEvents = document.querySelector('.trip-events');
const tripDays = document.querySelector('.trip-days');

const COUNT_EVENTS = 20;
const COUNT_OF_DAYS = 3;
const events = (0,_mock_events_js__WEBPACK_IMPORTED_MODULE_6__.generateEvents)(COUNT_EVENTS);
const counter = 1;
// Functions
const render = (parent, element, position) => {
   parent.insertAdjacentHTML(position, element);
};


const eventsMarkup = events.map((item) => (0,_components_tripDay_js__WEBPACK_IMPORTED_MODULE_5__.createTripEventMarkup)(item));


render(tripInfo, (0,_components_menu_js__WEBPACK_IMPORTED_MODULE_0__.createMenu)(), 'afterbegin');
render(tripNav, (0,_components_menu_js__WEBPACK_IMPORTED_MODULE_0__.createMenu)(), 'afterbegin');
render(tripControls, (0,_components_tripFilters_js__WEBPACK_IMPORTED_MODULE_2__.createTripFilters)(), 'afterbegin');
render(tripEvents, (0,_components_form_js__WEBPACK_IMPORTED_MODULE_4__.createForm)(events[0]), 'afterbegin');
render(tripEvents, (0,_components_sort_js__WEBPACK_IMPORTED_MODULE_3__.createSort)(), 'afterbegin');
for(let i = 1; i <= COUNT_OF_DAYS ; i++) {
    render(tripDays, (0,_components_tripDay_js__WEBPACK_IMPORTED_MODULE_5__.createTripDay)(events[i], eventsMarkup.slice(i, i+3)), 'beforeend');
}







//Events


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map