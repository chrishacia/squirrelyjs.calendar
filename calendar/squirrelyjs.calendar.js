let reqYear = 2017;
let reqMonth = 3;
let reqDay = 1

let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

// function to return the total days in a given month, of a given year
// yes, most months have the same amount of days consistently, however Feburary
// has that magical leap it makes every 4 years..
let daysInMonth = (month,year) => (new Date(year, month, 0).getDate());

let buildYears = (year) => {
    reqYear = year;
    let startYear = 1970;
    let endYear = new Date().getFullYear() + 100;

    document.getElementsByClassName("squirrely-year")[0].innerHTML = '';
    for(let i=startYear; i < endYear; i++) {
        let opt = document.createElement('option');
        opt.value = i;
        opt.innerText = i;
        if (i === year) {
            opt.setAttribute('selected', 'selected');
        }
        document.getElementsByClassName("squirrely-year")[0].appendChild(opt);
    }

}

let buildDays = (reqYear, reqMonth, reqDay) => {
    let totalDays = daysInMonth(reqYear,reqMonth);
    // generates date object based on parameters
    let reqDateObj = new Date(reqYear, reqMonth, reqDay);

    //returns day of week 0-6
    let firstDay = reqDateObj.getDay();

    // gets last day of the month
    let lastDay = new Date(reqYear, reqMonth, totalDays).getDay();

    document.getElementsByClassName("squirrely-days")[0].innerHTML = '';

    let d = new Date();
    let todayYear = d.getFullYear();
    let todayMonth = d.getMonth();
    let todayDay = d.getDate();

    let totalDaysLastMonth = daysInMonth(reqYear,(reqMonth-1));
    console.log(reqMonth, reqMonth-1, totalDaysLastMonth);
    // pad days out to make the first fall on the given day expected
    let daysPrintedOut = 0;
    if(firstDay > 0) {
        for(let i=0; i < firstDay; i++) {
            let div = document.createElement('div');
            div.setAttribute('class', 'squirrely-day isPast');
            document.getElementsByClassName("squirrely-days")[0].appendChild(div);
            daysPrintedOut++;
        }
    }

    let calHead = document.getElementsByClassName("squirrely-month-name")[0].innerHTML = months[reqMonth];
    for(let i=0; i< totalDays; i++) {
        let div = document.createElement('div');
        div.innerHTML = i+1;

        let divClass = 'squirrely-day';

        if (todayYear === reqYear && todayMonth === reqMonth) {
            if (todayDay === i+1) {
                divClass += ' isToday';
            }
        }

        div.setAttribute('class', divClass);
        document.getElementsByClassName("squirrely-days")[0].appendChild(div);
        daysPrintedOut++;
    }
}

var classname = document.getElementsByClassName("squirrely-ctrl");


function cycleMonths() {
    let direction = this.getAttribute("data-direction");
    if(direction === 'up') {
        if(reqMonth < 11) {
            reqMonth++;
        } else {
            reqMonth = 0;
            reqYear++;
        }
    }

    if(direction === 'down') {
        if(reqMonth > 0) {
            reqMonth--;
        } else {
            reqMonth = 11;
            reqYear--;
        }
    }
    buildDays(reqYear, reqMonth, reqDay);
    buildYears(reqYear);
}

for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', cycleMonths, false);
}

function jumpYear() {
    let e = this;
    buildDays(e.options[e.selectedIndex].value, reqMonth, reqDay);
}


(function(){
    buildDays(reqYear, reqMonth, reqDay);
    buildYears(reqYear);
    document.getElementsByClassName('squirrely-year')[0].addEventListener('input', jumpYear, false);
})();
