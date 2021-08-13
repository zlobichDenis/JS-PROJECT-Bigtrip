import TripDay from "../components/tripDay";
import EditForm from "../components/form";
import TripDayEvents from "../components/trip-event";
import { render, RenderPosition, replace } from "../render";

export default class EventController {
    constructor() {

    }

    render(tripEvents, container) {
        tripEvents.forEach((tripEvent) => {
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
}