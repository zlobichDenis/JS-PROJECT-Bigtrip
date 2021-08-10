import TripMenu from "./menu";
import TripSort from "./sort";
import TripList from "./trip-days-list";
import Filters from "./tripFilters";
import TripDay from './tripDay.js'
import EditForm from './form.js'
import TripDayEvents from "./trip-event";
import TripEventsList from "./trip-events-list";

import { render, RenderPosition, replace } from "../render.js";
import { groupByDays } from "../util";


const renderEvents = (tripEvents, container) => {
    const eventDayComponent = new TripDay(tripEvents);
    render(container, eventDayComponent, RenderPosition.BEFOREEND);

    const eventsListComponent = new TripEventsList();
    render(eventDayComponent.getElement(), eventsListComponent, RenderPosition.BEFOREEND);

    tripEvents.forEach((tripEvent) => {
        const clickOnEditFormBtn = () => {
            replace(tripEditForm, tripEventComponent);
        };
        const clickOnSaveFormBtn = () => {
            replace(tripEventComponent, tripEditForm);
        };

        const tripEventComponent = new TripDayEvents(tripEvent);
        const tripEditForm = new EditForm(tripEvent);

        tripEventComponent.setEditButtonClickHandler(() => {
            clickOnEditFormBtn()
        });
    
        tripEditForm.setSaveBtnClickHandler((evt) => {
            evt.preventDefault();
            clickOnSaveFormBtn();
        });
        render(eventsListComponent.getElement(), tripEventComponent, RenderPosition.BEFOREEND);
    });
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