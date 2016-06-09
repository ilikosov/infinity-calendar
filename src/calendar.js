import calendarTpl from './tpl/calendar.ejs';
import titleTpl from './tpl/title.ejs';
import weekTpl from  './tpl/week.ejs';
import IScroll from './lib/iscroll';

import './css/calendar.css';

var leo = new Date(2000, 0, 1);

var myScroll;
var now = new Date().getTime();

var MONTHS = 'Январь Февраль Март Апрель Май Июнь Июль Август Сентябрь Октябрь Ноябрь Декабрь'.split(' ');

function getMonthName (monthNumber) {
    return MONTHS[monthNumber];
}

function getWeekArray(start, end) {
    var shift = 7 - end + start - 1,
        shiftArr = [],
        array = [], 
        index;
    
    for (index = 0; index < shift; index++) {
        shiftArr.push(' ');
    }

    for (index = start; index <= end; index++) {
        array.push(index);
    }    
    // console.log('start', start, a);
    if (start == 1){
        array = shiftArr.concat(array);
    } else {
        array = array.concat(shiftArr);
    }
    
    return array;
}

function loaded(cacheSize) {
    myScroll = new IScroll('#scrollArea', {
        mouseWheel: true,
        infiniteElements: '.calendar--line',
        infiniteLimit: cacheSize,
        dataset: requestData,
        dataFiller: updateContent,
        cacheSize: cacheSize,
        startY: -cacheSize * 45 + 500
    });
}



function getWeeksInMonth(month, year) {
    var weeks = [],
        firstDate = new Date(year, month, 1),
        lastDate = new Date(year, month + 1, 0),
        numDays = lastDate.getDate();

    var start = 1;
    var end = 7 - (firstDate.getDay() || 7) + 1;
    while (start <= numDays) {
        weeks.push({ start: start, end: end });
        start = end + 1;
        end = end + 7;
        if (end > numDays)
            end = numDays;
    }
    return weeks;
}

function data(start) {
    return cache.slice(start);
}

function dayTouch (e) {
    e.preventDefault();
    var line_id = e.target.parentElement.getAttribute('data-line_id');
    if (!line_id){
        return;
    }
    cache[line_id] =  cache[line_id].replace('calendar--week', 'calendar--week calendar--week__selected');
    myScroll.updateCachePartial(line_id, [cache[line_id]], true);
    // myScroll.refresh(); 
    
}

function requestData(start, count) {
    // console.log('requestData', start, count);
    setTimeout(function () {
        myScroll.updateCache(start, data(start));
    }, 0);
}

function updateContent(el, data) {
    el.innerHTML = data;
}

var cache = [],
    day = new Date(leo);

while(day.getTime() <= now) {
    var month = day.getMonth(),
        year  = day.getFullYear(),
        week = getWeeksInMonth(month, year);
    cache.push(getMonthName(month) + ' ' + year);
    
    for (var key in week) {
        cache.push (weekTpl({line_id:cache.length, days: getWeekArray(week[key].start, week[key].end) }));
    }
    
    day.setMonth(month + 1);
}

// console.log(cache);

module.exports = function (el) {
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

    el.innerHTML = calendarTpl({});
    loaded(cache.length);
    // myScroll.updateCache(12, data(12));
    // myScroll.resetPosition(1);
    // requestData(500, 500);
    myScroll.refresh();
    el.addEventListener('touchend', dayTouch);
    // myScroll.scrollTo(0, -500);
};
