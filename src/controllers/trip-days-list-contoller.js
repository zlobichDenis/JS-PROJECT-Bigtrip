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
import EventController from "./event-controller";


const renderEvents = (tripEvents, container, onDataChange) => {
    const eventDayComponent = new TripDay(tripEvents);
    render(container, eventDayComponent, RenderPosition.BEFOREEND);

    const eventsListComponent = new TripEventsList();
    render(eventDayComponent.getElement(), eventsListComponent, RenderPosition.BEFOREEND);

    return tripEvents.map((tripEvent) => {
        const eventController = new EventController(tripEvent, onDataChange);
        eventController.render(tripEvent, eventsListComponent);
        
        return eventController;
    });
};

export default class TripListController {
    constructor(container) {

        this._container = container;
        this._tripEvents = []
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