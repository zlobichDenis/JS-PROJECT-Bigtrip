"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _menu = _interopRequireDefault(require("../components/menu"));

var _sort = _interopRequireWildcard(require("../components/sort"));

var _tripDaysList = _interopRequireDefault(require("../components/trip-days-list"));

var _tripFilters = _interopRequireDefault(require("../components/trip-filters"));

var _tripDay = _interopRequireDefault(require("../components/trip-day.js"));

var _form = _interopRequireDefault(require("../components/form.js"));

var _tripEvent = _interopRequireDefault(require("../components/trip-event"));

var _tripEventsList = _interopRequireDefault(require("../components/trip-events-list"));

var _render = require("../render.js");

var _util = require("../util");

var _eventController = _interopRequireWildcard(require("./event-controller"));

var _const = require("../const");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _renderEventsByDays = function renderEventsByDays(tripEvents, container, indexOfDay, onDataChange, onViewChange) {
  var eventDayComponent = new _tripDay["default"](tripEvents, indexOfDay);
  (0, _render.render)(container, eventDayComponent, _render.RenderPosition.BEFOREEND);
  var eventsListComponent = new _tripEventsList["default"]();
  (0, _render.render)(eventDayComponent.getElement(), eventsListComponent, _render.RenderPosition.BEFOREEND);
  return tripEvents.map(function (tripEvent) {
    // const eventController = new EventController(tripEvent, eventsListComponent, onDataChange, onViewChange);
    // eventController.render(tripEvent, Mode.DEFAULT);
    // return eventController;
    return renderEvents(tripEvent, eventsListComponent, onDataChange, onViewChange);
  });
};

var renderEvents = (tripEvent, container, indexOfDay, onDataChange, function (onViewChange) {
  var eventController = new _eventController["default"](tripEvent, container, onDataChange, onViewChange);
  eventController.render(tripEvent, _eventController.Mode.DEFAULT);
  return eventController;
});

var getSortedEvents = function getSortedEvents(events, activeSortType) {
  var showingEvents = events.slice();
  var sortedEvents = [];

  switch (activeSortType) {
    case _sort.SortType.EVENT:
      return showingEvents;

    case _sort.SortType.TIME:
      sortedEvents = showingEvents.sort(function (a, b) {
        var deltaA = a.date_to - a.date_from;
        var deltaB = b.date_to - b.date_from;
        return deltaA - deltaB;
      });
      return sortedEvents;

    case _sort.SortType.PRICE:
      sortedEvents = showingEvents.sort(function (a, b) {
        return a.base_price - b.base_price;
      });
      return sortedEvents;
  }
};

var TripListController =
/*#__PURE__*/
function () {
  function TripListController(container, eventsModel) {
    _classCallCheck(this, TripListController);

    this._container = container;
    this._tripEvents = [];
    this._eventsModel = eventsModel;
    this._showedEventsControllers = [];
    this._showedTripDays = [];
    this._menu = new _menu["default"]();
    this._tripDaysList = new _tripDaysList["default"]();
    this._sort = new _sort["default"]();
    this._filters = new _tripFilters["default"]();
    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._eventsModel._setFilterChangeHandlers(this._onFilterChange);

    this._sort.setActiveSortType(this._onSortTypeChange);
  }

  _createClass(TripListController, [{
    key: "createBoard",
    value: function createBoard() {
      (0, _render.render)(this._container, this._sort, _render.RenderPosition.BEFOREEND);
      (0, _render.render)(this._container, this._tripDaysList, _render.RenderPosition.BEFOREEND);
      this.renderEventsByDays();
    }
  }, {
    key: "getShowedTaskControllers",
    value: function getShowedTaskControllers(tripDays) {
      var _this = this;

      tripDays.forEach(function (day) {
        return day.forEach(function (eventController) {
          return _this._showedEventsControllers.push(eventController);
        });
      });
    }
  }, {
    key: "renderEventsByDays",
    value: function renderEventsByDays() {
      var _this2 = this;

      this._tripEvents = (0, _util.groupByDays)(this._eventsModel.getAllEvents());
      this._tripDays = Object.keys(this._tripEvents);
      this._showedTripDays = this._tripDays.map(function (tripDate) {
        var indexOfDay = _this2._tripDays.indexOf(tripDate) + 1;
        return _renderEventsByDays(_this2._tripEvents[tripDate], _this2._tripDaysList.getElement(), indexOfDay, _this2._onDataChange, _this2._onViewChange);
      });
      this.getShowedTaskControllers(this._showedTripDays);
    }
  }, {
    key: "createEvent",
    value: function createEvent() {
      if (this.creatingEvent) {
        return;
      }

      this.creatingEvent = new _eventController["default"](_eventController.EmptyEvent, this._tripDaysList, this._onDataChange, this._onViewChange);
      this.creatingEvent.render(_eventController.EmptyEvent, _eventController.Mode.ADDING);
    }
  }, {
    key: "updateEvents",
    value: function updateEvents() {
      var _this3 = this;

      this._removeEvents();

      this._tripEvents = this._eventsModel.getEventsByFilter();
      this._tripDays = Object.keys(this._tripEvents);
      this._tripDaysList = new _tripDaysList["default"]();
      (0, _render.render)(this._container, this._tripDaysList, _render.RenderPosition.BEFOREEND);
      var eventDayComponent = new _tripDay["default"](tripEvents, indexOfDay);
      (0, _render.render)(container, eventDayComponent, _render.RenderPosition.BEFOREEND);
      var eventsListComponent = new _tripEventsList["default"]();
      (0, _render.render)(eventDayComponent.getElement(), eventsListComponent, _render.RenderPosition.BEFOREEND);
      this._showedEventsControllers = this._tripEvents.map(function (tripEvent) {
        return renderEvents(tripEvent, eventsListComponent, _this3._onDataChange, _this3._onViewChange);
      }); // this._showedEventsControllers = this._tripDays.map((tripDate) => {
      //     let indexOfDay;
      //     this._eventsModel.activeFilter === FilterType.EVERY ? indexOfDay = this._tripDays.indexOf(tripDate) + 1 : indexOfDay = null;
      //     return renderEventsByDays(this._tripEvents[tripDate], this._tripDaysList.getElement(), indexOfDay, this._onDataChange, this._onViewChange);
      //  });
    }
  }, {
    key: "_removeEvents",
    value: function _removeEvents() {
      (0, _render.remove)(this._tripDaysList);

      this._showedEventsControllers.forEach(function (eventController) {
        return eventController.destroy();
      });

      this._showedEventsControllers = [];
    }
  }, {
    key: "_renderEvents",
    value: function _renderEvents(events) {
      var _this4 = this;

      this._removeEvents();

      this._tripEvents = (0, _util.groupByDays)(events);
      this._tripDays = Object.keys(this._tripEvents);
      this._tripDaysList = new _tripDaysList["default"]();
      (0, _render.render)(this._container, this._tripDaysList, _render.RenderPosition.BEFOREEND);
      this._showedTripDays = this._tripDays.map(function (tripDate) {
        var indexOfDay;
        _this4._eventsModel.activeFilter === _const.FilterType.EVERY ? indexOfDay = _this4._tripDays.indexOf(tripDate) + 1 : indexOfDay = null;
        return _renderEventsByDays(_this4._tripEvents[tripDate], _this4._tripDaysList.getElement(), indexOfDay, _this4._onDataChange, _this4._onViewChange);
      });
    }
  }, {
    key: "_onDataChange",
    value: function _onDataChange(eventController, oldData, newData) {
      if (oldData === _eventController.EmptyEvent) {
        this.creatingEvent = null;

        if (newData === null) {
          eventController.destroy();
          this.updateEvents();
        } else {
          this._eventsModel.addEvent(newData);

          eventController.render(newData, _eventController.Mode.DEFAULT);
          this.updateEvents();
        }
      } else if (newData === null) {
        this._eventsModel.removeEvent(oldData.id);

        this.updateEvents();
      } else {
        var isSucces = this._eventsModel.updateEvent(oldData.id, newData);

        if (isSucces) {
          eventController.render(newData, _eventController.Mode.DEFAULT);
        }
      }
    }
  }, {
    key: "_onViewChange",
    value: function _onViewChange() {
      this._showedEventsControllers.forEach(function (day) {
        day.forEach(function (tripEvent) {
          tripEvent.setDefaultView(tripEvent);
        });
      });
    }
  }, {
    key: "_onFilterChange",
    value: function _onFilterChange() {
      this.updateEvents();
    }
  }, {
    key: "_onSortTypeChange",
    value: function _onSortTypeChange(activeType) {
      this._renderEvents(getSortedEvents(this._eventsModel.getEventsByFilter(), activeType));
    }
  }]);

  return TripListController;
}();

exports["default"] = TripListController;