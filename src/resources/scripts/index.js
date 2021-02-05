import 'alpinejs';
import Litepicker from 'litepicker/dist/nocss/litepicker.umd.js';

const start = document.getElementById('start-date');
const end = document.getElementById('end-date');
const startdate = new Date(start.value);
const enddate = new Date(end.value);
const event = document.getElementsByClassName('event');

window.disableLitepickerStyles = true;

console.log(startdate);
console.log(enddate);

const picker = new Litepicker({
    element: start,
    elementEnd: end,
    firstDay: 1,
    format: 'YYYY-MM-DD',
    lang: 'de-DE',
    numberOfMonths: 1,
    numberOfColumns: 1,
    minDate: null,
    maxDate: null,
    minDays: null,
    maxDays: null,
    selectForward: false,
    selectBackward: false,
    splitView: false,
    inlineMode: true,
    singleMode: false,
    autoApply: true,
    showWeekNumbers: false,
    showTooltip: false,
    disableWeekends: false,
    mobileFriendly: true,

    onSelect: function () {
        for (let i = 0; i < event.length; i++) {
            const eventdate = new Date(event[i].getAttribute('data-date'));

            if (eventdate > startdate && eventdate < enddate) {
                event[i].classList.remove('hidden');
                console.log(eventdate);
                console.log(startdate);
                console.log(enddate);
                console.log('unhide');
            } else {
                event[i].classList.add('hidden');
            }
        }
    },
});

picker;
