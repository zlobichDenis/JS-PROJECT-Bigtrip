/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/abstract-component.js":
/*!**********************************************!*\
  !*** ./src/components/abstract-component.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AbstractComponent)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util.js */ "./src/util.js");


class AbstractComponent {
    constructor() {
        if(new.target === AbstractComponent) {
            throw new Error(`Can't instance AbstractComponent, only concrete one.`);
        }
        this._element = null;
    }

    getTemplate() {
        throw new Error ('Abstract method not implemented: getTemplate');
    }

    getElement() {
        if(!this._element) {
            this._element = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.createElement)(this.getTemplate());
        }

        return this._element;
    }

    removeElement() {
        this._element = null;
    }
}


/***/ }),

/***/ "./src/components/form.js":
/*!********************************!*\
  !*** ./src/components/form.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EditForm)
/* harmony export */ });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const.js */ "./src/const.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util.js */ "./src/util.js");
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");




const createEventTypeEditTemplate = (offerName, offerType) => {
  const isChecked = offerName === offerType ? 'checked' : '';

  return `<div class="event__type-item">
  <input id="event-type-${offerName}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offerName}" ${isChecked}>
  <label class="event__type-label  event__type-label--${offerName}" for="event-type-${offerName}-1">${offerName}</label>
</div>`
};

const createEditTimeTemplate = (dateFrom, dateTo) => {

 return `<div class="event__field-group  event__field-group--time">
 <label class="visually-hidden" for="event-start-time-1">
   From
 </label>
 <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom}">
 &mdash;
 <label class="visually-hidden" for="event-end-time-1">
   To
 </label>
 <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo}">
</div>`
};

const createOneEditOfferTemplate = (offer) => {

  return `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">
  <label class="event__offer-label" for="event-offer-seats-1">
    <span class="event__offer-title">${offer.title}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
  </label>
</div>`
};

const createEditOffersTemplate = (offers) => {
  const availableOffersTemplate = offers.map((offer) => {
    return createOneEditOfferTemplate(offer);
   }).join('\n');
  return `<section class="event__details">
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    ${availableOffersTemplate}
    </div>
  </section>
</section>`
};


const createEditFormTemplate = (tripEvent) => {
  const {base_price: basePrice, offers, date_to: dateTo, date_from: dateFrom, destination, is_favorite: isFavorite} = tripEvent;
  const monthOfTravel = _const_js__WEBPACK_IMPORTED_MODULE_0__.MONTH_NAMES[dateFrom.getMonth()];
  const dayOfTravel = dateFrom.getDay();

  const editOffersTemplate = createEditOffersTemplate(offers.offers);
  const editTimeTemplate= createEditTimeTemplate(dateFrom, dateTo);
  const eventTypeEditTemplate = _const_js__WEBPACK_IMPORTED_MODULE_0__.OFFERS_TYPES.map((offerName) =>{
    return createEventTypeEditTemplate(offerName, offers.type);
  }).join('\n');

    return `<form class="trip-events__item  event  event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${offers.type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>
              ${eventTypeEditTemplate}
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

      ${editTimeTemplate}

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    ${editOffersTemplate}
  </form>
    `
};

class EditForm extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_2__.default {
  constructor(tripEvent) {
    super();
    this._tripEvent = tripEvent[0];
    this._element = null
  }

  getTemplate() {
    return createEditFormTemplate(this._tripEvent);
  }
};


/***/ }),

/***/ "./src/components/menu.js":
/*!********************************!*\
  !*** ./src/components/menu.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TripMenu)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util.js */ "./src/util.js");
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");



const createMenuTemplate = () => { 
    return `<nav class="trip-controls__trip-tabs  trip-tabs">
            <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
            <a class="trip-tabs__btn" href="#">Stats</a>
        </nav>
    `
};

class TripMenu extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_1__.default{
    getTemplate() {
      return createMenuTemplate();
    }
  };


/***/ }),

/***/ "./src/components/sort.js":
/*!********************************!*\
  !*** ./src/components/sort.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TripSort)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util.js */ "./src/util.js");
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");



const createSortTemplate = () => {
    return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
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

class TripSort extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_1__.default {
    getTemplate() {
      return createSortTemplate();
    }
  };


/***/ }),

/***/ "./src/components/trip-days-list.js":
/*!******************************************!*\
  !*** ./src/components/trip-days-list.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TripList)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util.js */ "./src/util.js");
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");



const createTripDaysList = () => {
    return `<ul class="trip-days"></ul>`
};

class TripList extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_1__.default {
    getTemplate() {
        return createTripDaysList();
    }
}

/***/ }),

/***/ "./src/components/tripDay.js":
/*!***********************************!*\
  !*** ./src/components/tripDay.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TripDay)
/* harmony export */ });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const.js */ "./src/const.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util.js */ "./src/util.js");
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");




const createOffersMarkup = (offers) => {
  return offers.offers.map((offer) => {
    return `<li class="event__offer">
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
  return `<li class="trip-events__item">
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

const createTripDayTemplate = (eventsByDate, counterOfDay) => {

  const firstDay = eventsByDate[0];
  const {base_price: basePrice, offers, date_to: dateTo, date_from: dateFrom, destination, is_favorite: isFavorite} = firstDay;
  const monthOfTravel = _const_js__WEBPACK_IMPORTED_MODULE_0__.MONTH_NAMES[dateFrom.getMonth()];
  const dayOfTravel = dateFrom.getDay();

  console.log(eventsByDate)
  const events = eventsByDate.map((tripEvent) => {
    return createTripEventMarkup(tripEvent)
  }).join('\n')
    
    return `<li class="trip-days__item  day">
        <div class="day__info"><span class="day__counter">${counterOfDay}</span>
        <time class="day__date" datetime="2019-03-18">${monthOfTravel} ${dayOfTravel}</time></div>
        <ul class="trip-events__list">
          ${events}
        </ul>
      </li>`
};

class TripDay extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_2__.default {
  constructor(eventsByDate, counterOfDay) {
    super();
    this._eventsDays = eventsByDate;
    this._counterOfDay = counterOfDay;
    this._element = null
  }

  getTemplate() {
    return createTripDayTemplate(this._eventsDays, this._counterOfDay);
  }

};



/***/ }),

/***/ "./src/components/tripFilters.js":
/*!***************************************!*\
  !*** ./src/components/tripFilters.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Filters)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util.js */ "./src/util.js");
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");



const createTripFiltersTemplate = () => {
    return `<form class="trip-filters" action="#" method="get">
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

class Filters extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_1__.default {
    getTemplate() {
      return createTripFiltersTemplate();
    }
};



/***/ }),

/***/ "./src/components/tripInfo.js":
/*!************************************!*\
  !*** ./src/components/tripInfo.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TripInfo)
/* harmony export */ });
const createTripInfoTemplate = () => {
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

class TripInfo {
    getTemplate() {
      return createTripInfoTemplate();
    }
};


/***/ }),

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MONTH_NAMES": () => (/* binding */ MONTH_NAMES),
/* harmony export */   "OFFERS_TYPES": () => (/* binding */ OFFERS_TYPES)
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

const OFFERS_TYPES = ['taxi', 'flight', 'train', 'ship', 'bus', 'transport', 'drive']



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
/* harmony export */   "createElement": () => (/* binding */ createElement),
/* harmony export */   "RenderPosition": () => (/* binding */ RenderPosition),
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "getRandomIntNumber": () => (/* binding */ getRandomIntNumber),
/* harmony export */   "getRandomArrayElem": () => (/* binding */ getRandomArrayElem),
/* harmony export */   "getRandomDate": () => (/* binding */ getRandomDate),
/* harmony export */   "castTimeFormat": () => (/* binding */ castTimeFormat),
/* harmony export */   "formatTime": () => (/* binding */ formatTime),
/* harmony export */   "sortDatesAscending": () => (/* binding */ sortDatesAscending),
/* harmony export */   "groupByDays": () => (/* binding */ groupByDays),
/* harmony export */   "getDatesOfEventDays": () => (/* binding */ getDatesOfEventDays)
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
    const diffValue = sign * getRandomIntNumber(1, 8);

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

const sortDatesAscending = (arr) => {
    return arr.sort(function(a,b){
        return a.date_from.getTime() - b.date_from.getTime()
      }); 
};

const groupByDays = (events) => {
    return events.reduce((acc, elem)=> {
    const date = elem.date_from;
    if (acc[date]) {
        acc[date].push(elem);
      } else {
        acc[date] = [elem];
      }
      return acc;
}, {})
};

const getDatesOfEventDays = (events) => {
    const datesOfEvents = events.map((eventMock) => {
        return eventMock.date_from
    });
    
    const setDate = new Set(datesOfEvents);

    return setDate;
};

const createElement = (template) => {
    const newElement = document.createElement('div');
    newElement.innerHTML = template;
    return newElement.firstChild;
};


const RenderPosition = {
    AFTERBEGIN: 'afterbegin',
    BEFOREEND: 'beforeend',
};

const render = (container, element, place) => {
    switch (place) {
        case RenderPosition.AFTERBEGIN:
            container.prepend(element);
            break;
        case RenderPosition.BEFOREEND:
            container.append(element)
            break;
    }
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
/* harmony import */ var _components_tripDay_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/tripDay.js */ "./src/components/tripDay.js");
/* harmony import */ var _components_tripInfo_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/tripInfo.js */ "./src/components/tripInfo.js");
/* harmony import */ var _components_menu_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/menu.js */ "./src/components/menu.js");
/* harmony import */ var _components_form_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/form.js */ "./src/components/form.js");
/* harmony import */ var _components_sort_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/sort.js */ "./src/components/sort.js");
/* harmony import */ var _components_tripFilters_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/tripFilters.js */ "./src/components/tripFilters.js");
/* harmony import */ var _components_trip_days_list_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/trip-days-list.js */ "./src/components/trip-days-list.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./util.js */ "./src/util.js");
/* harmony import */ var _mock_events_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mock/events.js */ "./src/mock/events.js");













// Variables
const tripInfo = document.querySelector('.trip-main__trip-info');
const tripNav = document.querySelector('.trip-controls__trip-tabs');
const tripControls = document.querySelector('.trip-main__trip-controls');
const tripEvents = document.querySelector('.trip-events');
const tripDays = document.querySelector('.trip-days');

const COUNT_EVENTS = 10;
let counterOfDays = 1;
const events = (0,_mock_events_js__WEBPACK_IMPORTED_MODULE_8__.generateEvents)(COUNT_EVENTS);

const sortedEvents = (0,_util_js__WEBPACK_IMPORTED_MODULE_7__.sortDatesAscending)(events);
const groupOfEventsByDays = (0,_util_js__WEBPACK_IMPORTED_MODULE_7__.groupByDays)(sortedEvents);
const eventDays = (0,_util_js__WEBPACK_IMPORTED_MODULE_7__.getDatesOfEventDays)(sortedEvents);

(0,_util_js__WEBPACK_IMPORTED_MODULE_7__.render)(tripControls, new _components_menu_js__WEBPACK_IMPORTED_MODULE_2__.default().getElement(), _util_js__WEBPACK_IMPORTED_MODULE_7__.RenderPosition.AFTERBEGIN);
(0,_util_js__WEBPACK_IMPORTED_MODULE_7__.render)(tripControls, new _components_tripFilters_js__WEBPACK_IMPORTED_MODULE_5__.default().getElement(), _util_js__WEBPACK_IMPORTED_MODULE_7__.RenderPosition.BEFOREEND);

const renderEventDays = (groupOfEventsByDays, date, tripList) => {
    const clickOnEditFormBtn = () => {
        tripList.replaceChild(editForm.getElement(), tripDayComponent.getElement());
    };

    const clickOnSaveFormBtn = (evt) => {
        evt.preventDefault();
        tripList.replaceChild(tripDayComponent.getElement(), editForm.getElement());
    };

    const tripDayComponent = new _components_tripDay_js__WEBPACK_IMPORTED_MODULE_0__.default(groupOfEventsByDays[date], counterOfDays);
    const editBtn = tripDayComponent.getElement().querySelector('.event__rollup-btn');

    const editForm = new _components_form_js__WEBPACK_IMPORTED_MODULE_3__.default(groupOfEventsByDays[date]);
    const saveFormBtn = editForm.getElement().querySelector('.event__save-btn');

    editBtn.addEventListener('click', clickOnEditFormBtn);
    saveFormBtn.addEventListener('click', clickOnSaveFormBtn);

    (0,_util_js__WEBPACK_IMPORTED_MODULE_7__.render)(tripList, tripDayComponent.getElement(), _util_js__WEBPACK_IMPORTED_MODULE_7__.RenderPosition.BEFOREEND);
    counterOfDays++
};

const renderTripEventsList = (groupOfEventsByDays, eventDays, counterOfDays) => {
    (0,_util_js__WEBPACK_IMPORTED_MODULE_7__.render)(tripEvents, new _components_sort_js__WEBPACK_IMPORTED_MODULE_4__.default().getElement(), _util_js__WEBPACK_IMPORTED_MODULE_7__.RenderPosition.BEFOREEND);
    (0,_util_js__WEBPACK_IMPORTED_MODULE_7__.render)(tripEvents, new _components_trip_days_list_js__WEBPACK_IMPORTED_MODULE_6__.default().getElement(), _util_js__WEBPACK_IMPORTED_MODULE_7__.RenderPosition.BEFOREEND);

    const tripList = document.querySelector('.trip-days');

    eventDays.forEach((date) => {
        renderEventDays(groupOfEventsByDays, date, tripList);
    });


};

renderTripEventsList(groupOfEventsByDays, eventDays);












})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map