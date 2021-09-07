import TripListController from './controllers/trip-days-list-contoller.js';
import TripMenu from './components/menu.js';
import Filters from './components/trip-filters.js';
import EventsModel from './models/events.js';
import FiltersController from './controllers/filters-controller.js';


import { render, RenderPosition, replace } from './render.js';
import { generateEvents } from './mock/events.js';
import { sortDatesAscending, groupByDays } from './util.js'



// Variables
const tripControls = document.querySelector('.trip-main__trip-controls');
const tripEvents = document.querySelector('.trip-events');

const COUNT_EVENTS = 10;
const events = generateEvents(COUNT_EVENTS);
const sortedEvents = sortDatesAscending(events);

const eventsModel = new EventsModel();
eventsModel.setEvents(sortedEvents);

const siteMenu = new TripMenu();

render(tripControls, siteMenu, RenderPosition.AFTERBEGIN);
const filterController = new FiltersController(tripControls, eventsModel);
filterController.render()


const tripDaysList = new TripListController(tripEvents, eventsModel);
tripDaysList.createBoard();

document.querySelector('.trip-main__event-add-btn')
    .addEventListener('click', () => {
        tripDaysList.createEvent();
})











