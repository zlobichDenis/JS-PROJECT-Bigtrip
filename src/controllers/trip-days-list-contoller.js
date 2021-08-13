import TripMenu from "../components/menu";
import TripSort from "../components/sort";
import TripList from "../components/trip-days-list";
import Filters from "../components/tripFilters";
import TripDay from '../components/tripDay.js'
import EditForm from '../components/form.js'
import TripDayEvents from "../components/trip-event";
import TripEventsList from "../components/trip-events-list";

import { render, RenderPosition, replace } from "../render.js";
import { groupByDays } from "../util";
import EventController from "./point-controller";


const renderEvents = (tripEvents, container) => {
    const eventDayComponent = new TripDay(tripEvents);
    render(container, eventDayComponent, RenderPosition.BEFOREEND);

    const eventsListComponent = new TripEventsList();
    render(eventDayComponent.getElement(), eventsListComponent, RenderPosition.BEFOREEND);

    const pointController = new EventController();
    pointController.render(tripEvents, eventsListComponent)
};

export default class TripListController {
    constructor(container) {
        
        this._container = container;
        this._menu = new TripMenu();
        this._tripDaysList = new TripList();
        this._sort = new TripSort();
        this._filters = new Filters();
    }

    render(sortedEvents) {

        render(this._container, this._sort, RenderPosition.BEFOREEND);
        render(this._container, this._tripDaysList, RenderPosition.BEFOREEND);

        const eventsGroupedByDate = groupByDays(sortedEvents);
        const tripDays = Object.keys(eventsGroupedByDate);

        tripDays.forEach((tripDate) => {
            renderEvents(eventsGroupedByDate[tripDate], this._container);
        });

    }
}