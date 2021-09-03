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
import EventController, {Mode} from "./event-controller";


const renderEventsByDays = (tripEvents, container, onDataChange, onViewChange) => {
    const eventDayComponent = new TripDay(tripEvents);
    render(container, eventDayComponent, RenderPosition.BEFOREEND);

    const eventsListComponent = new TripEventsList();
    render(eventDayComponent.getElement(), eventsListComponent, RenderPosition.BEFOREEND);

    return tripEvents.map((tripEvent) => {
        const eventController = new EventController(tripEvent, onDataChange, onViewChange);
        eventController.render(tripEvent, eventsListComponent, Mode.DEFAULT);
        
        return eventController;
    });
};

const renderEvents = (tripEvents, container, onDataChange, onViewChange) => {
    return tripEvents.map((event) => {
        const eventController = new EventController(event, onDataChange, onViewChange);
        eventController.render(event, container, Mode.DEFAULT);
        return eventController;
    })

}



export default class TripListController {
    constructor(container, eventsModel) {

        this._container = container;
        this._tripEvents = [];

        this._eventsModel = eventsModel;
        this._showedEventsControllers = [];
        this._menu = new TripMenu();
        this._tripDaysList = new TripList();
        this._sort = new TripSort();
        this._filters = new Filters();

        this._onDataChange = this._onDataChange.bind(this);
        this._onFilterChange = this._onFilterChange.bind(this);
        this._onViewChange = this._onViewChange.bind(this);

        this._eventsModel._setFilterChangeHandlers(this._onFilterChange);
    }

    render() {
        render(this._container, this._sort, RenderPosition.BEFOREEND);
        render(this._container, this._tripDaysList, RenderPosition.BEFOREEND);

        const eventsGroupedByDate = groupByDays(this._eventsModel.getAllEvents());
        const tripDays = Object.keys(eventsGroupedByDate);

        this._tripDays = tripDays;
        this._tripEvents = eventsGroupedByDate;

        this._showedEventsControllers = this._tripDays.map((tripDate) => {
           return renderEventsByDays(this._tripEvents[tripDate], this._container, this._onDataChange, this._onViewChange);
        });
    };

    updateEvents() {
        this._removeEvents();
        const eventsListComponent = new TripEventsList();
        this._events = this._eventsModel.getEventsByFilter();
        renderEvents(this._events, eventsListComponent, this._onDataChange, this._onViewChange);
    }

    _removeEvents() {
        this._showedEventsControllers.forEach((eventControllers) => eventControllers.forEach(eventController => eventController.destroy()));
        this._showedEventsControllers = [];
    }

    _onDataChange(eventController, oldData, newData) {
        const isSucces = this._eventsModel(oldData.id, newData.id);
        const container = new TripEventsList.getElement();
        if (isSucces) {
            eventController.render(newData, container, Mode.DEFAULT);
        }
    }

    _onViewChange() {
        this._showedEventsControllers.forEach((day) => {
            day.forEach((tripEvent) => {
                tripEvent.setDefaultView(tripEvent);
            });
        });
    }

    _onFilterChange() {
        this.updateEvents();
    }
}