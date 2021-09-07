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


const renderEvents = (tripEvent, container, onDataChange, onViewChange) => {
    const eventController = new EventController(tripEvent, container, onDataChange, onViewChange);
    eventController.render(tripEvent, Mode.DEFAULT);
    
    return eventController;
};

const renderEventsByDays = (tripEvents, container, indexOfDay, onDataChange, onViewChange) => {
    const eventDayComponent = new TripDay(tripEvents, indexOfDay);
    render(container, eventDayComponent, RenderPosition.BEFOREEND);
    const eventsListComponent = new TripEventsList();
    render(eventDayComponent.getElement(), eventsListComponent, RenderPosition.BEFOREEND);

    return tripEvents.map((tripEvent) => {
        return renderEvents(tripEvent, eventsListComponent, onDataChange, onViewChange);
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

        this.activeFilterType = FilterType.EVERY;
        this.activeSortType = SortType.EVENT;

        this._eventsModel = eventsModel;

        this._showedEventsControllers = [];
        this._showedTripDays = [];

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

    createBoard() {
        render(this._container, this._sort, RenderPosition.BEFOREEND);

        this.renderEventsByDays(this._eventsModel.getAllEvents());
    }

    getShowedTaskControllers(tripDays) {
        tripDays.forEach((day) => day.forEach((eventController) => this._showedEventsControllers.push(eventController)));
    }

    renderEventsByDays(events, isShowingDayCount) {
        if (this._showedEventsControllers) {
            this._removeEvents();
        }
        render(this._container, this._tripDaysList, RenderPosition.BEFOREEND);                   
        this._tripEvents = groupByDays(events);
        this._tripDays = Object.keys(this._tripEvents);

        this._showedTripDays = this._tripDays.map((tripDate) => {
           let indexOfDay = this._tripDays.indexOf(tripDate) + 1;
           isShowingDayCount ? indexOfDay = this._tripDays.indexOf(tripDate) + 1 : null;
           return renderEventsByDays(this._tripEvents[tripDate], this._tripDaysList.getElement(), indexOfDay, this._onDataChange, this._onViewChange);
        });

        this.getShowedTaskControllers(this._showedTripDays);
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

        this._tripEvents = this._eventsModel.getEventsByFilter();

        if (this._eventsModel.activeFilter === FilterType.EVERY) {
            this.renderEventsByDays(this._tripEvents, true);
            return;
        }
        
        this._renderEvents(this._tripEvents);
    }

    _removeEvents() {
        remove(this._tripDaysList);
        this._showedEventsControllers.forEach((eventController) => eventController.destroy());
        this._showedEventsControllers = [];
    }

    _renderEvents(events) {
        this._removeEvents();
        this._tripEvents = events;
        this._tripDays = Object.keys(this._tripEvents);
        this._tripDaysList = new TripDaysList();
        render(this._container, this._tripDaysList, RenderPosition.BEFOREEND);

        const eventDayComponent = new TripDay(this._tripEvents, null);
        render(this._tripDaysList.getElement(), eventDayComponent, RenderPosition.BEFOREEND);
        const eventsListComponent = new TripEventsList();
        render(eventDayComponent.getElement(), eventsListComponent, RenderPosition.BEFOREEND);

        this._showedEventsControllers = this._tripEvents.map((tripEvent) => {
            return renderEvents(tripEvent, eventsListComponent, this._onDataChange, this._onViewChange);
        })
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
        let sortedEvents = [];
        switch(activeType) {
            case SortType.EVENT: 
                sortedEvents = getSortedEvents(this._eventsModel.getEventsByFilter(), SortType.EVENT);
                this.renderEventsByDays(sortedEvents, null);
                return;
            
            case SortType.TIME:  
                sortedEvents = getSortedEvents(this._eventsModel.getEventsByFilter(), SortType.TIME);
                this._renderEvents(sortedEvents);
                return;

            case SortType.PRICE:
                sortedEvents = getSortedEvents(this._eventsModel.getEventsByFilter(), SortType.PRICE);
                this._renderEvents(sortedEvents);
        }
    }
}