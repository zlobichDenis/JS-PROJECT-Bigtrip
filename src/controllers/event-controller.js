import TripDay from "../components/tripDay";
import EditForm from "../components/form";
import TripDayEvents from "../components/trip-event";
import { render, RenderPosition, replace } from "../render";

export default class EventController {
    constructor() {

    }

    render(tripEvents, container) {
        this._tripEvents = tripEvents;
        this._tripEvents.forEach((tripEvent) => {
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
            render(container.getElement(), tripEventComponent, RenderPosition.BEFOREEND);
        });
    }

    _onDataChange(eventController, oldData, newData) {
        const index = this._tripEvents.findIndex((it) => it === oldData);

        if (index === -1) {
            return;
        }

        this._tripEvents = [].concat(this._tripEvents.slice(0, index), newData, this._tripEvents.slice(index + 1));
        eventController.render(this._tripEvents);
    }
}