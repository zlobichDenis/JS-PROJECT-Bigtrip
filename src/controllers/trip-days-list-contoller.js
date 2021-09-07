import TripMenu from "../components/menu";
import TripSort, { SortType } from "../components/sort";
import TripDaysList from "../components/trip-days-list";
import Filters from "../components/trip-filters";
import TripDay from '../components/trip-day.js'
import EditForm from '../components/form.js'
import TripDayEvents from "../components/trip-event";
import TripEventsList from "../components/trip-events-list";

import { remove, render, RenderPosition, replace } from "../render.js";
import { groupByDays } from "../util";
import EventController, {Mode} from "./event-controller";
import { FilterType } from "../const";
import { EmptyEvent } from "./event-controller";

const renderEventsByDays = (tripEvents, container, indexOfDay, onDataChange, onViewChange) => {
    const eventDayComponent = new TripDay(tripEvents, indexOfDay);
    render(container, eventDayComponent, RenderPosition.BEFOREEND);
    const eventsListComponent = new TripEventsList();
    render(eventDayComponent.getElement(), eventsListComponent, RenderPosition.BEFOREEND);

    return tripEvents.map((tripEvent) => {
        const eventController = new EventController(tripEvent, eventsListComponent, onDataChange, onViewChange);
        eventController.render(tripEvent, Mode.DEFAULT);
        
        return eventController;
    });
};

const getSortedEvents = (events, activeSortType) => {
    const showingEvents = events.slice();
    let sortedEvents = [];

    switch(activeSortType) {
        case SortType.EVENT: 
            return showingEvents;

        case SortType.TIME: 
            sortedEvents = showingEvents.sort((a, b) => {
                let deltaA = a.date_to - a.date_from;
                let deltaB = b.date_to - b.date_from;
                return deltaA - deltaB
            });
            return sortedEvents;
        
        case SortType.PRICE: 
            sortedEvents = showingEvents.sort((a, b) => a.base_price - b.base_price);
            return sortedEvents;
    }
};


export default class TripListController {
    constructor(container, eventsModel) {

        this._container = container;
        this._tripEvents = [];

        this._eventsModel = eventsModel;
        this._showedEventsControllers = [];
        this._menu = new TripMenu();
        this._tripDaysList = new TripDaysList();
        this._sort = new TripSort();
        this._filters = new Filters();

        this._onDataChange = this._onDataChange.bind(this);
        this._onFilterChange = this._onFilterChange.bind(this);
        this._onViewChange = this._onViewChange.bind(this);
        this._onSortTypeChange = this._onSortTypeChange.bind(this);

        this._eventsModel._setFilterChangeHandlers(this._onFilterChange);

        this._sort.setActiveSortType(this._onSortTypeChange);
    }

    render() {
        render(this._container, this._sort, RenderPosition.BEFOREEND);
        render(this._container, this._tripDaysList, RenderPosition.BEFOREEND);

        this._tripEvents = groupByDays(this._eventsModel.getAllEvents());
        this._tripDays = Object.keys(this._tripEvents);

        this._showedEventsControllers = this._tripDays.map((tripDate) => {
           let indexOfDay = this._tripDays.indexOf(tripDate) + 1;
           return renderEventsByDays(this._tripEvents[tripDate], this._tripDaysList.getElement(), indexOfDay, this._onDataChange, this._onViewChange);
        });
    };

    createEvent() {
        if (this.creatingEvent) {
            return;
        }

        this.creatingEvent = new EventController(EmptyEvent, this._tripDaysList, this._onDataChange, this._onViewChange);
        this.creatingEvent.render(EmptyEvent, Mode.ADDING);
    }

    updateEvents() {
        this._removeEvents();
        this._tripEvents = groupByDays(this._eventsModel.getEventsByFilter());
        this._tripDays = Object.keys(this._tripEvents);
        this._tripDaysList = new TripDaysList();
        render(this._container, this._tripDaysList, RenderPosition.BEFOREEND);

        this._showedEventsControllers = this._tripDays.map((tripDate) => {
            let indexOfDay;
            this._eventsModel.activeFilter === FilterType.EVERY ? indexOfDay = this._tripDays.indexOf(tripDate) + 1 : indexOfDay = null;

            return renderEventsByDays(this._tripEvents[tripDate], this._tripDaysList.getElement(), indexOfDay, this._onDataChange, this._onViewChange);
         });
    }

    _removeEvents() {
        remove(this._tripDaysList);
        this._showedEventsControllers.forEach((eventControllers) => eventControllers.forEach(eventController => eventController.destroy()));
        this._showedEventsControllers = [];
    }

    _renderEvents(events) {
        this._removeEvents();
        this._tripEvents = groupByDays(events);
        this._tripDays = Object.keys(this._tripEvents);
        this._tripDaysList = new TripDaysList();
        render(this._container, this._tripDaysList, RenderPosition.BEFOREEND);

        this._showedEventsControllers = this._tripDays.map((tripDate) => {
            let indexOfDay;
            this._eventsModel.activeFilter === FilterType.EVERY ? indexOfDay = this._tripDays.indexOf(tripDate) + 1 : indexOfDay = null;

            return renderEventsByDays(this._tripEvents[tripDate], this._tripDaysList.getElement(), indexOfDay, this._onDataChange, this._onViewChange);
         });
    }

    _onDataChange(eventController, oldData, newData) {
        if (oldData === EmptyEvent) {
            this.creatingEvent = null;
            if (newData === null) {
                eventController.destroy();
                this.updateEvents();
            } else {
                this._eventsModel.addEvent(newData);
                eventController.render(newData, Mode.DEFAULT);
                this.updateEvents();
            }
        } else if (newData === null) {
              this._eventsModel.removeEvent(oldData.id);
              this.updateEvents();
        } else {
            const isSucces = this._eventsModel.updateEvent(oldData.id, newData);
      
            if (isSucces) {
             eventController.render(newData, Mode.DEFAULT);
            }
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

    _onSortTypeChange(activeType) {
        this._renderEvents(getSortedEvents(this._eventsModel.getEventsByFilter(), activeType));
    }
}