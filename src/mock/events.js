import { getRandomArrayElem, getRandomIntNumber } from "../util.js";
import { pointsOfDestination, offers } from "../data.js";
import { getRandomDate } from "../util.js";

const generateEvent = () => {
    const destination = getRandomArrayElem(pointsOfDestination);
    const offer = getRandomArrayElem(offers); 
    const dateFrom = getRandomDate();
    const dateTo = getRandomDate();
    return {
        "base_price": getRandomIntNumber(100, 500), // Сумма цент всех офферов путешествия
        "date_from": dateFrom , // функция для определения
        "date_to": dateTo,
        "destination": destination, // Массив состоящий из все точек путешествий
        "id": String(new Date() + Math.random), // Счетчик i
        "is_favorite": Math.random() > 0.5,
        "offers": offer, // Массив состоящий из всех офферов каждого ивента
    }
};

const generateEvents = (count) => {
    return new Array(count).fill('').map((item) => generateEvent());
};

export {generateEvents};