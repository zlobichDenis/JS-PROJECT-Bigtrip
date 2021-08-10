import AbstractComponent from "./abstract-component.js";

const createTripDaysList = () => {
    return `<ul class="trip-days"></ul>`
};

export default class TripList extends AbstractComponent {
    getTemplate() {
        return createTripDaysList();
    }
}