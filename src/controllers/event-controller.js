import TripDay from "../components/tripDay";
import EditForm from "../components/form";
import TripDayEvents from "../components/trip-event";
import { render, RenderPosition, replace } from "../render";

const Mode = {
    DEFAULT: 'default',
    EDIT: 'edit',
}

export default class EventController {
    constructor(tripEvent, onDataChange) {
        this._tripEvent = tripEvent;

        this._onDataChange = onDataChange;
    }

    render(tripEvent, container) {
        this._tripEvent = tripEvent;
        const clickOnEditFormBtn = () => {
            replace(tripEditForm, tripEventComponent);
        };
        const clickOnSaveFormBtn = () => {
            replace(tripEventComponent, tripEditForm);
        };

        const tripEventComponent = new TripDayEvents(this._tripEvent);
        const tripEditForm = new EditForm(this._tripEvent, this._onDataChange);

        tripEventComponent.setEditButtonClickHandler(() => {
            clickOnEditFormBtn()
        });
    
        tripEditForm.setSaveBtnClickHandler((evt) => {
            evt.preventDefault();
            clickOnSaveFormBtn();
        });
        render(container.getElement(), tripEventComponent, RenderPosition.BEFOREEND);
    }
}