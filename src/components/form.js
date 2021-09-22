import { MONTH_NAMES , OFFERS_TYPES, OTHER_OFFERS} from "../const.js";
import { offers, pointsOfDestination } from "../data.js";
import AbstractSmartComponent from "./abstract-smart-component.js";
import flatpickr from "flatpickr";
import { formatTime, formatDate } from "../util.js";
import 'flatpickr/dist/flatpickr.min.css';
import moment from "moment";


const parseForm = (data) => {
  const nameOfDestination = data.get('event-destination');
  const pointOfDestination = pointsOfDestination.find((point) => point.name === nameOfDestination);
  const eventType = data.get('event-type');
  const eventData = offers.find((offer) => offer.type === eventType);
  eventData.offers.forEach((offer) => {
    offer.isChecked = data.get(`event-offer-${offer.title.toLowerCase()}`)
  });

  return {
    "base_price": data.get('event-price'), // Сумма цент всех офферов путешествия
    "date_from": data.get('event-start-time'), // функция для определения
    "date_to": data.get('event-end-time'),
    "destination": pointOfDestination, // Массив состоящий из все точек путешествий
    "id": String(new Date() + Math.random), // Счетчик i
    "is_favorite": data.get('event-favorite'),
    "offers": eventData,
  }
}

const createDestinationOptionTemplate = (name, selectedDestination) => {

  return `<option ${name === selectedDestination ? 'selected="selected"' : ''} value="${name}"></option>`
}

const createEventTypeEditTemplate = (offerName, offerType) => {
  const isChecked = offerName === offerType ? 'checked' : '';

  return `<div class="event__type-item">
  <input id="event-type-${offerName}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offerName}" ${isChecked}>
  <label class="event__type-label  event__type-label--${offerName}" for="event-type-${offerName}-1">${offerName}</label>
</div>`
};

const createEventOtherTypeEditTemplate = (offerName, offerType) => {
  const isChecked = offerName === offerType ? 'checked' : '';

  return `<div class="event__type-item">
  <input id="event-type-${offerName}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offerName}" ${isChecked}>
  <label class="event__type-label  event__type-label--${offerName}" for="event-type-${offerName}-1">${offerName}</label>
</div>`
}

const createEditTimeTemplate = (timeFrom, timeTo) => {

 return `<div class="event__field-group  event__field-group--time">
 <label class="visually-hidden" for="event-start-time-1">
   From
 </label>
 <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${timeFrom}">
 &mdash;
 <label class="visually-hidden" for="event-end-time-1">
   To
 </label>
 <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${timeTo}">
</div>`
};

const createOneEditOfferTemplate = (offer) => {
  const offerTitle = offer.title.toLowerCase();
  return `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerTitle}-1" type="checkbox" name="event-offer-${offerTitle}" ${offer.isChecked ? 'checked = "true"' : ''}">
  <label class="event__offer-label" for="event-offer-${offerTitle}-1">
    <span class="event__offer-title">${offerTitle}</span>
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

  const timeFrom = formatDate(dateFrom);
  const timeTo = formatDate(dateTo);

  const destinationName = destination.name;
  const destinationOption = pointsOfDestination.map((point) => {
    return createDestinationOptionTemplate(point.name, destinationName );
  }).join('\n');
  const editOffersTemplate = createEditOffersTemplate(offers.offers);
  const editTimeTemplate= createEditTimeTemplate(timeFrom, timeTo);
  const eventTypeEditTemplate = OFFERS_TYPES.map((offerName) =>{
    return createEventTypeEditTemplate(offerName, offers.type);
  }).join('\n');
  const otherEventTypeEditTemplate = OTHER_OFFERS.map((offerName) =>{
    return createEventOtherTypeEditTemplate(offerName, offers.type);
  }).join('\n')

    return (`<form class="trip-events__item  event  event--edit" action="#" method="post">
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
              ${otherEventTypeEditTemplate}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${offers.type} to 
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${destinationOption}
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
      <button class="event__reset-btn" type="reset">Delete</button>

      <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? 'checked' : ''}>
      <label class="event__favorite-btn" for="event-favorite-1">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </label>
    </header>
    ${editOffersTemplate}
  </form>`)
};

export default class EditForm extends AbstractSmartComponent {
  constructor(tripEvent, onDataChange) {
    super();
    this._tripEvent = tripEvent;
    this._element = null;

    this._isFavorite = null;
    this._onDataChange = onDataChange;

    this._subscribeOnEvents();
    this._flatpickr = null;
    this._applyFlatpickr();
  }

  getTemplate() {
    return createEditFormTemplate(this._tripEvent);
  }

  reset() {
    this._tripEvent = this._copyEvent;
    this.rerender();
  }


  getData() {
    const form = this.getElement();
    const formData = new FormData(form);

    return parseForm(formData);
  }

  recoveryListeners() {
    this._applyFlatpickr();
    this.setSaveBtnClickHandler(this._submitHandler);
    this._subscribeOnEvents();
    this.setOnStartDateChange();
    this.setOnEndDateChange();
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }

  _applyFlatpickr() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    const dateFromElement = this.getElement().querySelector('#event-start-time-1');
    this._startFlatpickr = flatpickr(dateFromElement, {
      altFormat: 'd/m/Y H:i',
      altInput: true,
      allowInput: true,
      enableTime: true,
      defaultDate: this._tripEvent.date_from,
    });

    const dateToElement = this.getElement().querySelector('#event-end-time-1');
    this._endFlatpickr = flatpickr(dateToElement, {
      altFormat: 'd/m/Y H:i',
      altInput: true,
      allowInput: true,
      enableTime: true,
      defaultDate: this._tripEvent.date_to,
    });
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    this._copyEvent = this._tripEvent;
    this.onChangeEventType(element);
    this.setFavoritesButton(element);
    this.onChangePrice(element);
  }

  setSaveBtnClickHandler(handler) {
    this.getElement().querySelector('.event__save-btn').addEventListener('click', handler);
    this._submitHandler = handler;
  }

  setDeleteBtnHandler(handler) {
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', handler);
  }

  setFavoritesButton(element) {
    element.querySelector('.event__favorite-btn').addEventListener('click', () => {
      this._tripEvent.is_favorite = !this._tripEvent.is_favorite;
      this.rerender();
    });
  }

  onChangePrice(element) {
    element.querySelector('.event__input--price').addEventListener('input', (evt) => {
      this._tripEvent.basePrice = evt.target.value;
    })
  }

  onChangeEventType(element) {
    element.querySelectorAll('.event__type-input').forEach((typeItem) => {
      typeItem.addEventListener('click', (evt) => {
        const eventType = evt.target.value;
        const result = offers.findIndex((it) => it['type'] === eventType);
        this._tripEvent.offers = offers[result];
        this.rerender();
      })
    });
  }

  setOnStartDateChange(handler) {
    this._startFlatpickr.config.onClose.push(() => {
      handler(this._startFlatpickr, this._tripEvent);
    });
    this._flatpickrStartHandler = handler;
  }

  setOnEndDateChange(handler) {
    this._endFlatpickr.config.onClose.push(() => {
      handler(this._endFlatpickr, this._tripEvent);
    });
    this._flatpickrEndHandler = handler;
  }
};
