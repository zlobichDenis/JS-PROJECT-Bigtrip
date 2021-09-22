import moment from "moment";
import { FilterType } from "./const";

const getRandomIntNumber = (min, max) => {
    return parseInt(Math.random() * (max - min) + min);
};

const getRandomArrayElem = (array) => {
    return array[getRandomIntNumber(0, array.length - 1)];
};


const getRandomDate = () => {
    const targetDate = new Date;
    const sign = Math.random() > 0.5 ? 1 : -1;
    const diffValue = sign * getRandomIntNumber(1, 8);

    targetDate.setDate(targetDate.getDate() + diffValue);
    
    return moment(targetDate);
};

const castTimeFormat = (value) => {
    return value < 10 ? `0${value}` : String(value);
};

export const getDeltaTime = (start, end) => {
    start = moment(start).get('minute')
    end = moment(end).get('minute')
    // return start.diff(end, 'minutes');
    return end - start;
}

export const formatTime = (date) => {

    return moment(date).format('hh:mm')
};
    
export const formatDate = (date) => {
    return moment(date);
};

const sortDatesAscending = (arr) => {
    return arr.sort(function(a,b){
        return a.date_from.milliseconds - b.date_from.milliseconds
      }); 
};

const groupByDays = (events) => {
    return events.reduce((acc, elem)=> {
    const date = elem.date_from;
    if (acc[date]) {
        acc[date].push(elem);
      } else {
        acc[date] = [elem];
      }
      return acc;
    }, {})
};

const getFutureEvents = (events) => events.filter((event) => new Date(event.date_from).getTime() > Date.now());

const getPastEvents = (events) => events.filter((event) => new Date(event.date_from).getTime()< Date.now());

export const generateEventsByFilter = (events, filterType) => {
    switch(filterType) {
        case FilterType.EVERY: 
            return events;
        case FilterType.FUTURE:
            return getFutureEvents(events);
        case FilterType.PAST:
            return getPastEvents(events);
    }
}





export {getRandomIntNumber, getRandomDate, getRandomArrayElem, sortDatesAscending, groupByDays};