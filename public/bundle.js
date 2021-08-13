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
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../render.js */ "./src/render.js");


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
            this._element = (0,_render_js__WEBPACK_IMPORTED_MODULE_0__.createElement)(this.getTemplate());
        }

        return this._element;
    }

    removeElement() {
        this._element = null;
    }
}


/***/ }),

/***/ "./src/components/abstract-smart-component.js":
/*!****************************************************!*\
  !*** ./src/components/abstract-smart-component.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AbstractSmartComponent)
/* harmony export */ });
/* harmony import */ var _abstract_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component */ "./src/components/abstract-component.js");


class AbstractSmartComponent extends _abstract_component__WEBPACK_IMPORTED_MODULE_0__.default {
    recoveryListeners() {
        throw new Error('ОШИБКА!')
    }
    
    rerender() {
        const oldElement = this.getElement();
        const parent = oldElement.parentElement;

        this.removeElement();

        const newElement = this.getElement();

        parent.replaceChild(newElement, oldElement);

        this.recoveryListeners();
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
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data.js */ "./src/data.js");
/* harmony import */ var _abstract_smart_component_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./abstract-smart-component.js */ "./src/components/abstract-smart-component.js");





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
          ${offers.type} to ${destination.name}
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

      <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? 'checked' : ''}>
      <label class="event__favorite-btn" for="event-favorite-1">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </label>
    </header>
    ${editOffersTemplate}
  </form>`
};

class EditForm extends _abstract_smart_component_js__WEBPACK_IMPORTED_MODULE_2__.default {
  constructor(tripEvent, onDataChange) {
    super();
    this._tripEvent = tripEvent;
    this._element = null;

    this._isFavorite = null;
    this._onDataChange = onDataChange;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createEditFormTemplate(this._tripEvent);
  }

  recoveryListeners() {
    this.setSaveBtnClickHandler(this._submitHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    this.onChangeEventType(element);
    this.setFavoritesButton(element);
  }

  setSaveBtnClickHandler(handler) {
    this.getElement().querySelector('.event__save-btn').addEventListener('click', handler);
    this._submitHandler = handler;
  }

  setFavoritesButton(element) {
    element.querySelector('.event__favorite-btn').addEventListener('click', () => {
/*       this._onDataChange(this, this._tripEvent, Object.assign({}, this._tripEvent, {is_favorite: !this._tripEvent.is_favorite})) */
      this._tripEvent.is_favorite = !this._tripEvent.is_favorite;
      this.rerender();
    });
  }

  onChangeEventType(element) {
    element.querySelectorAll('.event__type-input').forEach((typeItem) => {
      typeItem.addEventListener('click', (evt) => {
        const eventType = evt.target.value;
        const result = _data_js__WEBPACK_IMPORTED_MODULE_1__.offers.findIndex((it) => it['type'] === eventType);
        console.log(result);
        this._tripEvent.offers = _data_js__WEBPACK_IMPORTED_MODULE_1__.offers[result];
        this.rerender();
      })
    });
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
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


const createTripDaysList = () => {
    return `<ul class="trip-days"></ul>`
};

class TripList extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__.default {
    getTemplate() {
        return createTripDaysList();
    }
}

/***/ }),

/***/ "./src/components/trip-event.js":
/*!**************************************!*\
  !*** ./src/components/trip-event.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TripDayEvents)
/* harmony export */ });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util.js */ "./src/util.js");



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
  
  const createTripEventMarkup = (tripEvent) => {
        const {base_price: basePrice, offers, date_to: dateTo, date_from: dateFrom, destination, is_favorite: isFavorite} = tripEvent;
  
        const timeFrom = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.formatTime)(dateFrom);
        const timeTo = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.formatTime)(dateTo);
        const offersList = createOffersMarkup(offers);
        return `<li class="trip-events__item">
            <div class="event">
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/${offers.type}.png" alt="Event type icon">
              </div>
              <h3 class="event__title">${offers.type} to ${destination.name}</h3>
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
      </li>`
  };


class TripDayEvents extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(tripEvent) {
        super();
        this._event = tripEvent;
    }

    getTemplate() {
       return createTripEventMarkup(this._event);
    }

    setEditButtonClickHandler(handler) {
      this.getElement().querySelector('.event__rollup-btn').addEventListener('click', handler);
    }
}

/***/ }),

/***/ "./src/components/trip-events-list.js":
/*!********************************************!*\
  !*** ./src/components/trip-events-list.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TripEventsList)
/* harmony export */ });
/* harmony import */ var _abstract_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component */ "./src/components/abstract-component.js");


const createTripEventsListTemplate = () => {
    return `<ul class="trip-events__list"></ul>`
};

class TripEventsList extends _abstract_component__WEBPACK_IMPORTED_MODULE_0__.default {
    getTemplate() {
        return createTripEventsListTemplate();
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
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");



let counterOfDay = 0;

const createTripDayTemplate = (eventsByDate) => {

  const firstDay = eventsByDate[0];
  const {base_price: basePrice, offers, date_to: dateTo, date_from: dateFrom, destination, is_favorite: isFavorite} = firstDay;
  const monthOfTravel = _const_js__WEBPACK_IMPORTED_MODULE_0__.MONTH_NAMES[dateFrom.getMonth()];
  const dayOfTravel = dateFrom.getDate();
  counterOfDay++
    
    return `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${counterOfDay}</span>
          <time class="day__date" datetime="2019-03-18">${monthOfTravel} ${dayOfTravel}</time>
        </div>
      </li>`
};

class TripDay extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_1__.default {
  constructor(eventsByDate, counterOfDay) {
    super();
    this._eventsGroupByDays = eventsByDate
    this._counterOfDay = counterOfDay;
    this._element = null
  }

  getTemplate() {
    return createTripDayTemplate(this._eventsGroupByDays, this._counterOfDay);
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

/***/ "./src/controllers/event-controller.js":
/*!*********************************************!*\
  !*** ./src/controllers/event-controller.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EventController)
/* harmony export */ });
/* harmony import */ var _components_tripDay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/tripDay */ "./src/components/tripDay.js");
/* harmony import */ var _components_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/form */ "./src/components/form.js");
/* harmony import */ var _components_trip_event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/trip-event */ "./src/components/trip-event.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../render */ "./src/render.js");





const Mode = {
    DEFAULT: 'default',
    EDIT: 'edit',
}

class EventController {
    constructor(tripEvent, onDataChange) {
        this._tripEvent = tripEvent;

        this._tripEventComponent = null;
        this._tripEditComponent = null;

        this._onDataChange = onDataChange;
    }

    render(tripEvent, container) {
        this._tripEvent = tripEvent;
        const clickOnEditFormBtn = () => {
            (0,_render__WEBPACK_IMPORTED_MODULE_3__.replace)(tripEditForm, tripEventComponent);
        };
        const clickOnSaveFormBtn = () => {
            (0,_render__WEBPACK_IMPORTED_MODULE_3__.replace)(tripEventComponent, tripEditForm);
        };

        this._tripEventComponent = new _components_trip_event__WEBPACK_IMPORTED_MODULE_2__.default(this._tripEvent);
        this._tripEditComponent = new _components_form__WEBPACK_IMPORTED_MODULE_1__.default(this._tripEvent, this._onDataChange);

        this._tripEventComponent.setEditButtonClickHandler(() => {
            this._replaceEventToEdit();
        });
    
        this._tripEditComponent.setSaveBtnClickHandler((evt) => {
            evt.preventDefault();
            this._replaceEditToEvent();
        });
        (0,_render__WEBPACK_IMPORTED_MODULE_3__.render)(container.getElement(), this._tripEventComponent, _render__WEBPACK_IMPORTED_MODULE_3__.RenderPosition.BEFOREEND);
    }

    setDefaultView() {
        if (this._mode !== Mode.DEFAULT) {
            this._replaceEditToEvent()
        }
    }

    _replaceEventToEdit() {
        (0,_render__WEBPACK_IMPORTED_MODULE_3__.replace)(this._tripEditComponent, this._tripEventComponent);
        this._mode = Mode.EDIT;
    }

    _replaceEditToEvent() {
        (0,_render__WEBPACK_IMPORTED_MODULE_3__.replace)(this._tripEventComponent, this._tripEditComponent);
        this._mode = Mode.DEFAULT;
    }
}

/***/ }),

/***/ "./src/controllers/trip-days-list-contoller.js":
/*!*****************************************************!*\
  !*** ./src/controllers/trip-days-list-contoller.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TripListController)
/* harmony export */ });
/* harmony import */ var _components_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/menu */ "./src/components/menu.js");
/* harmony import */ var _components_sort__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/sort */ "./src/components/sort.js");
/* harmony import */ var _components_trip_days_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/trip-days-list */ "./src/components/trip-days-list.js");
/* harmony import */ var _components_tripFilters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/tripFilters */ "./src/components/tripFilters.js");
/* harmony import */ var _components_tripDay_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/tripDay.js */ "./src/components/tripDay.js");
/* harmony import */ var _components_form_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/form.js */ "./src/components/form.js");
/* harmony import */ var _components_trip_event__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/trip-event */ "./src/components/trip-event.js");
/* harmony import */ var _components_trip_events_list__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/trip-events-list */ "./src/components/trip-events-list.js");
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../render.js */ "./src/render.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../util */ "./src/util.js");
/* harmony import */ var _event_controller__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./event-controller */ "./src/controllers/event-controller.js");














const renderEvents = (tripEvents, container, onDataChange) => {
    const eventDayComponent = new _components_tripDay_js__WEBPACK_IMPORTED_MODULE_4__.default(tripEvents);
    (0,_render_js__WEBPACK_IMPORTED_MODULE_8__.render)(container, eventDayComponent, _render_js__WEBPACK_IMPORTED_MODULE_8__.RenderPosition.BEFOREEND);

    const eventsListComponent = new _components_trip_events_list__WEBPACK_IMPORTED_MODULE_7__.default();
    (0,_render_js__WEBPACK_IMPORTED_MODULE_8__.render)(eventDayComponent.getElement(), eventsListComponent, _render_js__WEBPACK_IMPORTED_MODULE_8__.RenderPosition.BEFOREEND);

    return tripEvents.map((tripEvent) => {
        const eventController = new _event_controller__WEBPACK_IMPORTED_MODULE_10__.default(tripEvent, onDataChange);
        eventController.render(tripEvent, eventsListComponent);
        
        return eventController;
    });
};

class TripListController {
    constructor(container) {

        this._container = container;
        this._tripEvents = []
        this._menu = new _components_menu__WEBPACK_IMPORTED_MODULE_0__.default();
        this._tripDaysList = new _components_trip_days_list__WEBPACK_IMPORTED_MODULE_2__.default();
        this._sort = new _components_sort__WEBPACK_IMPORTED_MODULE_1__.default();
        this._filters = new _components_tripFilters__WEBPACK_IMPORTED_MODULE_3__.default();
    }

    render(sortedEvents) {
        (0,_render_js__WEBPACK_IMPORTED_MODULE_8__.render)(this._container, this._sort, _render_js__WEBPACK_IMPORTED_MODULE_8__.RenderPosition.BEFOREEND);
        (0,_render_js__WEBPACK_IMPORTED_MODULE_8__.render)(this._container, this._tripDaysList, _render_js__WEBPACK_IMPORTED_MODULE_8__.RenderPosition.BEFOREEND);

        const eventsGroupedByDate = (0,_util__WEBPACK_IMPORTED_MODULE_9__.groupByDays)(sortedEvents);
        const tripDays = Object.keys(eventsGroupedByDate);

        this._tripEvents = eventsGroupedByDate;

        const eventControllers = tripDays.map((tripDate) => {
           return renderEvents(this._tripEvents[tripDate], this._container, this._onDataChange);
        });
        console.log(eventControllers)
    }

    _onDataChange(eventController, oldData, newData) {
        const index = this._tripEvents.findIndex((it) => it === oldData);

        if (index === -1) {
            return;
        }

        this._tripEvents = [].concat(this._tripEvents.slice(0, index), newData, this._tripEvents.slice(index + 1));
        eventController.render(this._tripEvents);
    }


}

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

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createElement": () => (/* binding */ createElement),
/* harmony export */   "RenderPosition": () => (/* binding */ RenderPosition),
/* harmony export */   "replace": () => (/* binding */ replace),
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
const createElement = (template) => {
    const newElement = document.createElement('div');
    newElement.innerHTML = template;
    return newElement.firstChild;
};


const RenderPosition = {
    AFTERBEGIN: 'afterbegin',
    BEFOREEND: 'beforeend',
};

const replace = (newComponent, oldComponent) => {
    const parentElement = oldComponent.getElement().parentElement;
    const oldElement = oldComponent.getElement();
    const newElement = newComponent.getElement();

    const isExistElement = !!(parentElement && newElement && oldElement);

    if(isExistElement && parentElement.contains(oldElement)) {
        parentElement.replaceChild(newElement, oldElement);
    }
};

const render = (container, component, place) => {
    const element = component.getElement();
    switch (place) {
        case RenderPosition.AFTERBEGIN:
            container.prepend(element);
            break;
        case RenderPosition.BEFOREEND:
            container.append(element)
            break;
    }
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
/* harmony export */   "formatTime": () => (/* binding */ formatTime),
/* harmony export */   "sortDatesAscending": () => (/* binding */ sortDatesAscending),
/* harmony export */   "groupByDays": () => (/* binding */ groupByDays)
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
/* harmony import */ var _controllers_trip_days_list_contoller_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controllers/trip-days-list-contoller.js */ "./src/controllers/trip-days-list-contoller.js");
/* harmony import */ var _components_menu_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/menu.js */ "./src/components/menu.js");
/* harmony import */ var _components_tripFilters_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/tripFilters.js */ "./src/components/tripFilters.js");
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./render.js */ "./src/render.js");
/* harmony import */ var _mock_events_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mock/events.js */ "./src/mock/events.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util.js */ "./src/util.js");











// Variables
const tripControls = document.querySelector('.trip-main__trip-controls');
const tripEvents = document.querySelector('.trip-events');

const COUNT_EVENTS = 10;

const events = (0,_mock_events_js__WEBPACK_IMPORTED_MODULE_4__.generateEvents)(COUNT_EVENTS);
const sortedEvents = (0,_util_js__WEBPACK_IMPORTED_MODULE_5__.sortDatesAscending)(events);

(0,_render_js__WEBPACK_IMPORTED_MODULE_3__.render)(tripControls, new _components_menu_js__WEBPACK_IMPORTED_MODULE_1__.default(), _render_js__WEBPACK_IMPORTED_MODULE_3__.RenderPosition.AFTERBEGIN);
(0,_render_js__WEBPACK_IMPORTED_MODULE_3__.render)(tripControls, new _components_tripFilters_js__WEBPACK_IMPORTED_MODULE_2__.default(), _render_js__WEBPACK_IMPORTED_MODULE_3__.RenderPosition.BEFOREEND);

const tripDaysList = new _controllers_trip_days_list_contoller_js__WEBPACK_IMPORTED_MODULE_0__.default(tripEvents)
tripDaysList.render(sortedEvents);












})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map