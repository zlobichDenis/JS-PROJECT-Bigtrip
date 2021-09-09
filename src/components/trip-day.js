import { MONTH_NAMES } from "../const.js";
import AbstractComponent from "./abstract-component.js";
import moment from "moment";


const createTripDayTemplate = (eventsByDate, counterOfDay) => {

  const firstDay = eventsByDate[0];
  const {base_price: basePrice, offers, date_to: dateTo, date_from: dateFrom, destination, is_favorite: isFavorite} = firstDay;
  const monthOfTravel = moment(dateFrom).format('D');
  const dayOfTravel = moment(dateFrom).format('MMMM');

    return `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${counterOfDay === null ? '' : counterOfDay}</span>
          <time class="day__date" datetime="2019-03-18">${counterOfDay === null ? '' : monthOfTravel} ${counterOfDay === null ? '' : dayOfTravel}</time>
        </div>
      </li>`
};

export default class TripDay extends AbstractComponent {
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

