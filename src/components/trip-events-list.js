import AbstractComponent from "./abstract-component";

const createTripEventsListTemplate = () => {
    return `<ul class="trip-events__list"></ul>`
};

export default class TripEventsList extends AbstractComponent {
    getTemplate() {
        return createTripEventsListTemplate();
    }
}