import { generateEvents } from "../mock/events";

const COUNT_EVENTS = 10;

export default class PointsModel {
    constructor() {
        this._points = [];
    }

    getPoints() {
        return this._points;
    }

    setPoints() {
        this._points = generateEvents(COUNT_EVENTS);
    }
}