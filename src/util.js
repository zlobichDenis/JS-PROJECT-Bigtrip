import moment from "moment";

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
    
    return targetDate
};

const castTimeFormat = (value) => {
    return value < 10 ? `0${value}` : String(value);
};

export const formatTime = (date) => {
    return moment(date).format(`hh:mm`);
};
    
export const formatDate = (date) => {
    return moment(date).format(`DD/MM/YY hh:mm`);
};

const sortDatesAscending = (arr) => {
    return arr.sort(function(a,b){
        return a.date_from.getTime() - b.date_from.getTime()
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





export {getRandomIntNumber, getRandomDate, getRandomArrayElem, sortDatesAscending, groupByDays};