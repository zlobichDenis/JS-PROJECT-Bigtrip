import TripDay from "../components/trip-day";
import EditForm from "../components/form";
import TripDayEvents from "../components/trip-event";
import { render, RenderPosition, replace, remove} from "../render";

export const Mode = {
    DEFAULT: 'default',
    EDIT: 'edit',
}

export default class EventController {
    constructor(tripEvent, container, onDataChange, onViewChange) {
        this._tripEvent = tripEvent;
        this._container = container;

        this._tripEventComponent = null;
        this._tripEditComponent = null;

        this._onDataChange = onDataChange;
        this._onViewChange = onViewChange;

        this._mode = Mode.DEFAULT;
    }

    render(tripEvent, mode) {
        const oldEventComponent = this._tripEventComponent;
        const oldEventEditComponent = this._tripEditComponent;

        this._mode = mode;

        this._tripEventComponent = new TripDayEvents(tripEvent);
        this._tripEditComponent = new EditForm(tripEvent, this._onDataChange);

        this._tripEventComponent.setEditButtonClickHandler(() => {
            this._replaceEventToEdit();
        });
    
        this._tripEditComponent.setSaveBtnClickHandler((evt) => {
            evt.preventDefault();
            const data = this._tripEditComponent.getData();
            this._onDataChange(this, tripEvent, data);
        });

        this._tripEditComponent.setDeleteBtnHandler((evt) => {
            evt.preventDefault();
        })

        if(oldEventEditComponent && oldEventComponent) {
            replace(this._tripEventComponent, oldEventComponent);
            replace(this._tripEditComponent, oldEventEditComponent);
            this._replaceEditToEvent();
        } else {
            render(this._container.getElement(), this._tripEventComponent, RenderPosition.AFTERBEGIN);
        }
    }
    

    destroy() {
        remove(this._tripEventComponent);
        remove(this._tripEditComponent);
    }

    setDefaultView() {
        if (this._mode !== Mode.DEFAULT) {
            this._replaceEditToEvent()
        }
    }

    _replaceEventToEdit() {
        this._onViewChange();
        replace(this._tripEditComponent, this._tripEventComponent);
        this._mode = Mode.EDIT;
    }

    _replaceEditToEvent() {
        this._tripEditComponent.reset();
        if (document.contains(this._tripEditComponent.getElement())) {
          replace(this._tripEventComponent, this._tripEditComponent);
        }
        this._mode = Mode.DEFAULT;
    }
}