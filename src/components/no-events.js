const createNoEventsTemplate = () => {
    return ` <h2 class="visually-hidden">Trip events</h2>
    <p class="trip-events__msg">Click New Event to create your first point</p>`
};


export default class NoEventsComponent {
    getTemplate() {
        return createNoEventsTemplate();
    }
}