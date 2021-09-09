import TripDay from "../components/trip-day";
import EditForm from "../components/form";
import TripDayEvents from "../components/trip-event";
import { render, RenderPosition, replace, remove} from "../render";
import { getRandomDate, getRandomArrayElem } from "../util";
import { offers, pointsOfDestination } from "../data";
import moment from "moment";


export const Mode = {
    DEFAULT: 'default',
    EDIT: 'edit',
    ADDING: 'adding',
}

export const EmptyEvent = { 
    "base_price": 199, // Сумма цент всех офферов путешествия
    "date_from": getRandomDate(), // функция для определения
    "date_to": getRandomDate(),
    "destination": getRandomArrayElem(pointsOfDestination),
    "id": String(new Date() + Math.random), // Счетчик i
    "is_favorite": false,
    "offers": getRandomArrayElem(offers), // Массив состоящий из всех офферов каждого ивента
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
        });

        this._tripEditComponent.setOnStartDateChange((flatpickr, tripEvent) => {
            const selectedStartDate = flatpickr.selectedDates[0];
            tripEvent.date_from = selectedStartDate;
        });

        this._tripEditComponent.setOnEndDateChange((flatpickr, tripEvent) => {
            const selectedEndDate = moment(flatpickr.selectedDates[0]);
            tripEvent.date_to = selectedEndDate;
        });

        this._tripEditComponent.setDeleteBtnHandler((evt) => {
            evt.preventDefault();
            this._onDataChange(this, tripEvent, null);
        });

        if (this._mode === Mode.ADDING) {
            render(this._container.getElement(), this._tripEditComponent, RenderPosition.AFTERBEGIN);
            return;
          }

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