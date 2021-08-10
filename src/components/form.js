import { MONTH_NAMES , OFFERS_TYPES} from "../const.js";
import AbstractComponent from "./abstract-component.js";

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
  const monthOfTravel = MONTH_NAMES[dateFrom.getMonth()];
  const dayOfTravel = dateFrom.getDay();

  const editOffersTemplate = createEditOffersTemplate(offers.offers);
  const editTimeTemplate= createEditTimeTemplate(dateFrom, dateTo);
  const eventTypeEditTemplate = OFFERS_TYPES.map((offerName) =>{
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
    </header>
    ${editOffersTemplate}
  </form>`
};

export default class EditForm extends AbstractComponent {
  constructor(tripEvent) {
    super();
    this._tripEvent = tripEvent;
    this._element = null
  }

  getTemplate() {
    return createEditFormTemplate(this._tripEvent);
  }

  setSaveBtnClickHandler(handler) {
    this.getElement().querySelector('.event__save-btn').addEventListener('click', handler);
  }
};
