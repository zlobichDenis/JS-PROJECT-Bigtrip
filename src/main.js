import TripListController from './controllers/trip-days-list-contoller.js';
import TripMenu from './components/menu.js';
import Filters from './components/tripFilters.js';
import EventsModel from './models/events.js';
import FiltersController from './controllers/filters.js';


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

render(tripControls, new TripMenu(), RenderPosition.AFTERBEGIN);
const filterController = new FiltersController(tripControls, eventsModel);
filterController.render()


const tripDaysList = new TripListController(tripEvents, eventsModel);
tripDaysList.render();











