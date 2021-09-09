import AbstractComponent from "./abstract-component.js";
import { formatTime, getDeltaTime } from "../util.js";

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

        const timeFrom = formatTime(dateFrom);
        const timeTo = formatTime(dateTo);
        const offersList = createOffersMarkup(offers);
        const deltaTime = getDeltaTime(dateFrom, dateTo);
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
                <p class="event__duration">${deltaTime}M</p>
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


export default class TripDayEvents extends AbstractComponent {
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