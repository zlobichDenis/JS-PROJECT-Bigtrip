"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _abstractComponent = _interopRequireDefault(require("./abstract-component.js"));

var _util = require("../util.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var createOffersMarkup = function createOffersMarkup(offers) {
  return offers.offers.map(function (offer) {
    return "<li class=\"event__offer\">\n        <span class=\"event__offer-title\">".concat(offer.title, "</span>\n        &plus;\n        &euro;&nbsp;<span class=\"event__offer-price\">").concat(offer.price, "</span>\n    </li>\n    ");
  }).join('\n');
};

var createTripEventMarkup = function createTripEventMarkup(tripEvents) {
  return tripEvents.map(function (tripEvent) {
    var basePrice = tripEvent.base_price,
        offers = tripEvent.offers,
        dateTo = tripEvent.date_to,
        dateFrom = tripEvent.date_from,
        destination = tripEvent.destination,
        isFavorite = tripEvent.is_favorite;
    var timeFrom = (0, _util.formatTime)(dateFrom);
    var timeTo = (0, _util.formatTime)(dateTo);
    var offersList = createOffersMarkup(offers);
    return "<li class=\"trip-events__item\">\n            <div class=\"event\">\n              <div class=\"event__type\">\n                <img class=\"event__type-icon\" width=\"42\" height=\"42\" src=\"img/icons/".concat(offers.type, ".png\" alt=\"Event type icon\">\n              </div>\n              <h3 class=\"event__title\">").concat(offers.type, " to ").concat(destination.name, "</h3>\n      \n              <div class=\"event__schedule\">\n                <p class=\"event__time\">\n                  <time class=\"event__start-time\" datetime=\"").concat(dateFrom, "\">").concat(timeFrom, "</time>\n                  &mdash;\n                  <time class=\"event__end-time\" datetime=\"").concat(dateTo, "\">").concat(timeTo, "</time>\n                </p>\n                <p class=\"event__duration\">30M</p>\n              </div>\n      \n              <p class=\"event__price\">\n                &euro;&nbsp;<span class=\"event__price-value\">").concat(basePrice, "</span>\n              </p>\n      \n              <h4 class=\"visually-hidden\">Offers:</h4>\n              <ul class=\"event__selected-offers\">\n                ").concat(offersList, "\n              </ul>\n      \n          <button class=\"event__rollup-btn\" type=\"button\">\n            <span class=\"visually-hidden\">Open event</span>\n          </button>\n        </div>\n      </li>");
  }).join('\n');
};

var TripDayEvents =
/*#__PURE__*/
function (_AbstractComponent) {
  _inherits(TripDayEvents, _AbstractComponent);

  function TripDayEvents(events) {
    var _this;

    _classCallCheck(this, TripDayEvents);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TripDayEvents).call(this));
    _this._events = events;
    return _this;
  }

  _createClass(TripDayEvents, [{
    key: "getTemplate",
    value: function getTemplate() {
      return createTripEventMarkup(this._events);
    }
  }]);

  return TripDayEvents;
}(_abstractComponent["default"]);

exports["default"] = TripDayEvents;