import { getRandomArrayElem, getRandomIntNumber } from "../util.js";
import { pointsOfDestination, offers } from "../data.js";
import { getRandomDate } from "../util.js";
import moment from "moment";

const generateEvent = () => {
    const destination = getRandomArrayElem(pointsOfDestination);
    const offer = getRandomArrayElem(offers); 
    const dateFrom = getRandomDate();
    const dateTo = dateFrom;
    return {
        "base_price": getRandomIntNumber(100, 500), 
        "date_from": dateFrom, 
        "date_to": dateTo,
        "destination": destination, 
        "id": String(new Date() + Math.random), 
        "is_favorite": Math.random() > 0.5,
        "offers": offer, 
    }
};

const generateEvents = (count) => {
    return new Array(count).fill('').map((item) => generateEvent());
};

export {generateEvents};