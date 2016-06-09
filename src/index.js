// import $ from 'jquery';
import calendar from './calendar';

require('reset.css');

const bootstrap = function (document) {
    calendar(document.getElementsByClassName('calendar')[0]);
};

module.exports = bootstrap;
