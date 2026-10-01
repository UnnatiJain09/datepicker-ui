// ======================================
// SELECT ELEMENTS
// ======================================

const monthYearElement =
    document.querySelector("#month-year");

const calendarDaysElement =
    document.querySelector("#calendar-days");

const prevMonthButton =
    document.querySelector("#prev-month");

const nextMonthButton =
    document.querySelector("#next-month");

const todayButton =
    document.querySelector("#today-btn");

const clearButton =
    document.querySelector("#clear-btn");

const selectedDayElement =
    document.querySelector("#selected-day");

const selectedMonthElement =
    document.querySelector("#selected-month");

const selectedWeekdayElement =
    document.querySelector("#selected-weekday");

const detailDayElement =
    document.querySelector("#detail-day");

const detailMonthElement =
    document.querySelector("#detail-month");

const detailYearElement =
    document.querySelector("#detail-year");

const selectionMessageElement =
    document.querySelector("#selection-message");

const visualDateElement =
    document.querySelector("#visual-date");

const themeToggle =
    document.querySelector("#theme-toggle");

const insightWeekdayElement =
    document.querySelector("#insight-weekday");

const insightDistanceElement =
    document.querySelector("#insight-distance");

const insightWeekElement =
    document.querySelector("#insight-week");

const insightDayYearElement =
    document.querySelector("#insight-day-year");


// ======================================
// DATE DATA
// ======================================

const today = new Date();

let currentDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
);

let selectedDate = null;


// ======================================
// MONTH & WEEKDAY NAMES
// ======================================

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const weekdayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];


// ======================================
// INITIALIZE
// ======================================

renderCalendar();


// ======================================
// RENDER CALENDAR
// ======================================

function renderCalendar() {

    calendarDaysElement.innerHTML = "";

    const year =
        currentDate.getFullYear();

    const month =
        currentDate.getMonth();


    monthYearElement.textContent =
        `${monthNames[month]} ${year}`;


    const firstDay =
        new Date(
            year,
            month,
            1
        ).getDay();


    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    const daysInPreviousMonth =
        new Date(
            year,
            month,
            0
        ).getDate();


    // ==================================
    // PREVIOUS MONTH
    // ==================================

    for (
        let i = firstDay - 1;
        i >= 0;
        i--
    ) {

        const dayNumber =
            daysInPreviousMonth - i;

        const previousMonthDay =
            new Date(
                year,
                month - 1,
                dayNumber
            );

        createDayElement(
            previousMonthDay,
            true
        );
    }


    // ==================================
    // CURRENT MONTH
    // ==================================

    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const date =
            new Date(
                year,
                month,
                day
            );

        createDayElement(
            date,
            false
        );
    }


    // ==================================
    // NEXT MONTH
    // ==================================

    const totalCells =
        calendarDaysElement.children.length;

    const remainingCells =
        42 - totalCells;


    for (
        let day = 1;
        day <= remainingCells;
        day++
    ) {

        const nextMonthDay =
            new Date(
                year,
                month + 1,
                day
            );

        createDayElement(
            nextMonthDay,
            true
        );
    }
}


// ======================================
// CREATE DAY ELEMENT
// ======================================

function createDayElement(
    date,
    isOtherMonth
) {

    const button =
        document.createElement("button");


    button.type = "button";

    button.classList.add(
        "calendar-day"
    );

    button.textContent =
        date.getDate();


    // Other month

    if (isOtherMonth) {

        button.classList.add(
            "other-month"
        );
    }


    // Today

    if (
        isSameDate(
            date,
            today
        )
    ) {

        button.classList.add(
            "today"
        );
    }


    // Selected date

    if (
        selectedDate &&
        isSameDate(
            date,
            selectedDate
        )
    ) {

        button.classList.add(
            "selected"
        );
    }


    // ==================================
    // DATE CLICK
    // ==================================

    button.addEventListener(
        "click",
        function () {

            selectedDate =
                new Date(date);


            currentDate =
                new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    1
                );


            renderCalendar();

            updateSelectedDate();

            updateDateInsight();

        }
    );


    calendarDaysElement.appendChild(
        button
    );
}


// ======================================
// CHECK SAME DATE
// ======================================

function isSameDate(
    dateOne,
    dateTwo
) {

    return (
        dateOne.getFullYear() ===
        dateTwo.getFullYear() &&

        dateOne.getMonth() ===
        dateTwo.getMonth() &&

        dateOne.getDate() ===
        dateTwo.getDate()
    );
}


// ======================================
// UPDATE SELECTED DATE
// ======================================

function updateSelectedDate() {

    if (!selectedDate) {

        selectedDayElement.textContent =
            "—";

        selectedMonthElement.textContent =
            "Choose a date";

        selectedWeekdayElement.textContent =
            "—";

        detailDayElement.textContent =
            "—";

        detailMonthElement.textContent =
            "—";

        detailYearElement.textContent =
            "—";

        selectionMessageElement.textContent =
            "Select a date from the calendar";

        visualDateElement.textContent =
            "—";

        return;
    }


    const day =
        selectedDate.getDate();

    const month =
        selectedDate.getMonth();

    const year =
        selectedDate.getFullYear();

    const weekday =
        selectedDate.getDay();


    selectedDayElement.textContent =
        day;


    selectedMonthElement.textContent =
        `${monthNames[month]} ${year}`;


    selectedWeekdayElement.textContent =
        weekdayNames[weekday];


    detailDayElement.textContent =
        day;


    detailMonthElement.textContent =
        monthNames[month];


    detailYearElement.textContent =
        year;


    if (
        isSameDate(
            selectedDate,
            today
        )
    ) {

        selectionMessageElement.textContent =
            "This is today ✨";

    } else {

        selectionMessageElement.textContent =
            `You selected ${weekdayNames[weekday]}.`;
    }


    visualDateElement.textContent =
        `${monthNames[month]} ${day}, ${year}`;
}


// ======================================
// DATE INSIGHT
// ======================================

function updateDateInsight() {

    if (!selectedDate) {

        insightWeekdayElement.textContent =
            "—";

        insightDistanceElement.textContent =
            "—";

        insightWeekElement.textContent =
            "—";

        insightDayYearElement.textContent =
            "—";
        dateStatusElement.className =
            "date-status";

        statusTextElement.textContent =
            "No date selected";

        return;
    }


    // ==================================
    // WEEKDAY
    // ==================================

    const weekday =
        weekdayNames[
            selectedDate.getDay()
        ];


    insightWeekdayElement.textContent =
        weekday;


    // ==================================
    // DISTANCE FROM TODAY
    // ==================================

    const selectedOnly =
        new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate()
        );


    const todayOnly =
        new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );


    const difference =
        selectedOnly.getTime() -
        todayOnly.getTime();


    const daysDifference =
        Math.round(
            difference /
            (1000 * 60 * 60 * 24)
        );


    if (daysDifference === 0) {

        insightDistanceElement.textContent =
            "Today";

    } else if (daysDifference > 0) {

        insightDistanceElement.textContent =
            `In ${daysDifference} days`;

    } else {

        insightDistanceElement.textContent =
            `${Math.abs(daysDifference)} days ago`;
    }


    // ==================================
    // DAY OF YEAR
    // ==================================

    const startOfYear =
        new Date(
            selectedDate.getFullYear(),
            0,
            1
        );


    const differenceFromYearStart =
        selectedOnly.getTime() -
        startOfYear.getTime();


    const dayOfYear =
        Math.floor(
            differenceFromYearStart /
            (1000 * 60 * 60 * 24)
        ) + 1;


    // ==================================
    // WEEK NUMBER
    // ==================================

    const weekNumber =
        Math.ceil(
            dayOfYear / 7
        );


    insightWeekElement.textContent =
        `Week ${weekNumber}`;


    insightDayYearElement.textContent =
        dayOfYear;
        // ==================================
// DATE STATUS
// ==================================

dateStatusElement.className =
    "date-status";


if (daysDifference === 0) {

    dateStatusElement.classList.add(
        "today-status"
    );

    statusTextElement.textContent =
        "Today";

} else if (daysDifference > 0) {

    dateStatusElement.classList.add(
        "upcoming-status"
    );

    statusTextElement.textContent =
        "Upcoming date";

} else {

    dateStatusElement.classList.add(
        "past-status"
    );

    statusTextElement.textContent =
        "Past date";
}
}


// ======================================
// PREVIOUS MONTH
// ======================================

prevMonthButton.addEventListener(
    "click",
    function () {

        currentDate.setMonth(
            currentDate.getMonth() - 1
        );

        renderCalendar();
    }
);


// ======================================
// NEXT MONTH
// ======================================

nextMonthButton.addEventListener(
    "click",
    function () {

        currentDate.setMonth(
            currentDate.getMonth() + 1
        );

        renderCalendar();
    }
);


// ======================================
// TODAY BUTTON
// ======================================

todayButton.addEventListener(
    "click",
    function () {

        currentDate =
            new Date(
                today.getFullYear(),
                today.getMonth(),
                1
            );


        selectedDate =
            new Date(today);


        renderCalendar();

        updateSelectedDate();

        updateDateInsight();
    }
);


// ======================================
// CLEAR BUTTON
// ======================================

clearButton.addEventListener(
    "click",
    function () {

        selectedDate = null;


        currentDate =
            new Date(
                today.getFullYear(),
                today.getMonth(),
                1
            );


        renderCalendar();

        updateSelectedDate();

        updateDateInsight();

        visualDateElement.textContent =
            "—";
    }
);


// ======================================
// DARK MODE
// ======================================

const savedTheme =
    localStorage.getItem(
        "datepickerTheme"
    );


if (savedTheme === "dark") {

    document.body.classList.add(
        "dark-mode"
    );


    themeToggle.textContent =
        "☀";


    themeToggle.setAttribute(
        "aria-label",
        "Switch to light mode"
    );
}


// ======================================
// THEME TOGGLE
// ======================================

themeToggle.addEventListener(
    "click",
    function () {

        document.body.classList.toggle(
            "dark-mode"
        );


        const isDark =
            document.body.classList.contains(
                "dark-mode"
            );


        if (isDark) {

            themeToggle.textContent =
                "☀";


            themeToggle.setAttribute(
                "aria-label",
                "Switch to light mode"
            );


            localStorage.setItem(
                "datepickerTheme",
                "dark"
            );

        } else {

            themeToggle.textContent =
                "☾";


            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );


            localStorage.setItem(
                "datepickerTheme",
                "light"
            );
        }
    }
);