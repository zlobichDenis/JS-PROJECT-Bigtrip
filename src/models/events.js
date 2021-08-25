import { generateEvents } from "../mock/events";


export default class EventsModel {
    constructor() {
        this._events = [];

        this._dataChangeHandlers = [];
    }

    getEvents() {
        return this._events;
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

    _callHandlers() {
        this._dataChangeHandlers.forEach((handler) => handler());
    }
}