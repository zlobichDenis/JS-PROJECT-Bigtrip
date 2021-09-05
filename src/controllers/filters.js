import { render, RenderPosition} from '../render';
import FiltersComponent from '../components/trip-filters';
import { FilterType } from '../const';

export default class FiltersController { 
    constructor(container, eventsModel) {
        this.container = container;
        this.eventsModel = eventsModel;

        this.activeFilter = FilterType.EVERY;
        this._setOnFilterChange = this._setOnFilterChange.bind(this);
     }

    render() {
        this.filtersComponent = new FiltersComponent();
        render(this.container, this.filtersComponent, RenderPosition.BEFOREEND);
        this._subscribeOnEvents();
    }

    _subscribeOnEvents() {
        this.filtersComponent.setActiveEveryFilter(() => {
            this.eventsModel.setFilterType(FilterType.EVERY);
        });

        this.filtersComponent.setActiveFutureFilter(() => {
            this.eventsModel.setFilterType(FilterType.FUTURE);
        });

        this.filtersComponent.setActivePastFilter(() => {
            this.eventsModel.setFilterType(FilterType.PAST);
        });
    }

    _setOnFilterChange() {
        this.eventsModel.getEventsByFilter(this.activeFilter);
    }
}
