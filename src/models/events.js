import { generateEvents } from "../mock/events";
import { generateEventsByFilter } from "../util";
import { FilterType } from "../const.js";


export default class EventsModel {
    constructor() {
        this._events = [];

        this._dataChangeHandlers = [];
        this._filterChangeHandlers = [];
        
        this.activeFilter = FilterType.EVERY;
    }

    getAllEvents() {
        return this._events;
    }

    getEventsByFilter() {
        return generateEventsByFilter(this._events, this.activeFilter);
    }

    setFilterType(activeFilter) {
        this.activeFilter = activeFilter;
        this._callHandlers(this._filterChangeHandlers);
    }

    setEvents(events) {
        this._events = Array.from(events);
        this._callHandlers(this._dataChangeHandlers);
    }

    updateEvent(id, event) {
        const index = this._events.findIndex((it) => it === id);

        if (index === -1) {
            return false;
        }

        this._events = [].concat(this._events.slice(0, index), event, this._events.slice(index + 1));
        
        return true;
    }

    _setDataChangeHandlers(handler) {
        this._dataChangeHandlers.push(handler);
    }

    _setFilterChangeHandlers(handler) {
        this._filterChangeHandlers.push(handler);
    }

    _callHandlers(handlers) {
        handlers.forEach((handler) => handler());
    }
}