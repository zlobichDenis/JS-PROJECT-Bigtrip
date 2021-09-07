import { createElement } from "../util.js";
import AbstractComponent from "./abstract-component.js";


const createMenuTemplate = () => { 
    return `<nav class="trip-controls__trip-tabs  trip-tabs">
            <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
        </nav>
    `
};

export default class TripMenu extends AbstractComponent{
    constructor() {
      super();
      this.activeComponent = null;
    }

    getTemplate() {
      return createMenuTemplate();
    }
  };
