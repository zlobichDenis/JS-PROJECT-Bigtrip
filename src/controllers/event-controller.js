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

        this._tripEventComponent = null;
        this._tripEditComponent = null;

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

        this._tripEventComponent = new TripDayEvents(this._tripEvent);
        this._tripEditComponent = new EditForm(this._tripEvent, this._onDataChange);

        this._tripEventComponent.setEditButtonClickHandler(() => {
            this._replaceEventToEdit();
        });
    
        this._tripEditComponent.setSaveBtnClickHandler((evt) => {
            evt.preventDefault();
            this._replaceEditToEvent();
        });
        render(container.getElement(), this._tripEventComponent, RenderPosition.BEFOREEND);
    }

    setDefaultView() {
        if (this._mode !== Mode.DEFAULT) {
            this._replaceEditToEvent()
        }
    }

    _replaceEventToEdit() {
        replace(this._tripEditComponent, this._tripEventComponent);
        this._mode = Mode.EDIT;
    }

    _replaceEditToEvent() {
        replace(this._tripEventComponent, this._tripEditComponent);
        this._mode = Mode.DEFAULT;
    }
}