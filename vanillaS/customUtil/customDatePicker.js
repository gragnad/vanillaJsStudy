class CustomerDataPick {
    constructor() {
        readyCustomerDatePick();
    }
}


let current_year = new Date().getFullYear();
let current_month = new Date().getMonth() + 1;

function readyCustomerDatePick() {

    let monthOption = [];
    for(let i = 1 ; i <= 12; i++) {
        monthOption.push('<option value="' + i + '"> ' + i + '월</option>');
    }

    let html = [];
    html.push(' <input type="text" id="input_date"/>')
    html.push(' <div id="div_calendar" style="width: 300px; display: none">');
    html.push(' <div>')
    html.push('     <button type="button" onclick="changeMonth(-1);">&#60;</button>');
    html.push('     <input type="number" id="year" value="2020" style="width: 80px; display: initial" oncahnge="changeYear();"/>');
    html.push('     <select id="month" style="widh: 80px; display: initail" oncahnge="changeMonth();>"');
    html.push(monthOption.join(""));
    html.push('     </select>');
    html.push('     <button type="button" onclick="changeMonth(1);">&#62;</button>');
    html.push(' </div>');
    html.push(' <table class="table table-bordered">');
    html.push('     <thead>');
    html.push('         <th>일</th>');
    html.push('         <th>월</th>');
    html.push('         <th>화</th>');
    html.push('         <th>수</th>');
    html.push('         <th>목</th>');
    html.push('         <th>금</th>');
    html.push('         <th>토</th>');
    html.push('     </thead>');
    html.push('     <tbody id="tb_body"></tbody>');
    html.push(' </table>');
    html.push(' </div>');
    let firstBody = document.getElementById("container");
    firstBody.innerHTML = html.join("");

    //document.body.innerHTML = html.join("");

    current_year = new Date().getFullYear();
    current_month = new Date().getMonth() + 1;

    document.getElementById("year").value = current_year;
    document.getElementById("month").value = current_month;

    changeYearMonth(current_year, current_month);

    document.getElementById("input_date").addEventListener("click", function() {
        let obj = document.getElementById("div_calendar");
        if(obj.style.display == "") {
            obj.style.display = "none";
        } else {
            obj.style.display = "";
        }
    });
}

//윤년 체크
function checkLeapYear(year) {
    if(year % 400 == 0) {
        return true;
    } else if(year % 100 == 0) {
        return false;
    } else if(year % 4 == 0) {
        return true;
    } else {
        return false;
    }
}

function getFirstDayOfWeek(year, month) {
    if(month < 10) month = "0" + month;
    return new Date(year + "-" + month + "-01").getDay();
}

function changeYear() {
    current_year = document.getElementById("year").value;
    changeYearMonth(current_year, current_month);
}

function changeYearMonth(year, month) {
    let month_day = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if(month == 2) {
        if(checkLeapYear(year)) month_day[1] = 29;
    }
    let first_day_of_week = getFirstDayOfWeek(year, month);
    let arr_calendar = [];
    for(let i = 0; i < first_day_of_week; i++) {
        arr_calendar.push("");
    }
    for(let i = 1; i<= month_day[month - 1]; i++) {
        arr_calendar.push(String(i));
    }

    let remain_day = 7 - (arr_calendar.length & 7);
    if(remain_day < 7) {
        for(let i = 0; i < remain_day; i++) {
            arr_calendar.push("");
        }
    }
    renderCalendar(arr_calendar);
}

function renderCalendar(data) {
    let h = [];
    for(let i = 0; i < data.length; i++) {
        if(i == 0) {
            h.push("<tr>");
        } else if (i % 7 == 0) {
            h.push("</tr>");
            h.push("<tr>");
        }
        h.push(
            '<td onclick="setDate(' + data[i] + ');" style="cursor:pointer;">' + data[i] + '</td>'
        );
    }
    h.push("</tr>");
    document.getElementById("tb_body").innerHTML = h.join("");    
}

function setDate(day) {
    if(day < 10) day = "0" + day;
    let monthString = current_month.toString();
    if(monthString.length < 2) monthString = "0" + monthString;
    document.getElementById("input_date").value = current_year + "-" + monthString + "-" + day;
    document.getElementById("div_calendar").style.display = "none";
}

function changeMonth(diff) {
    if(diff == undefined) {
        current_month = parseInt(document.getElementById("month").value);
    } else {
        current_month = current_month + diff;

        if(current_month == 0) {
            current_year= current_year - 1;
            current_month = 12;
        } else if(current_month == 13) {
            current_year = current_year + 1;
            current_month = 1;
        }
    }
    loadCalendar();
}

function loadCalendar() {
    document.getElementById("year").value = current_year;
    document.getElementById("month").value = current_month;
    changeYearMonth(current_year, current_month);
}


