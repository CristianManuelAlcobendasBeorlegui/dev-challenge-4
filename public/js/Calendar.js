// === STRICT MODE === //
"use strict";

// === CUSTOM EVENTS === //
const eventCalendarRender = new Event("calendar-render");
const eventCalendarContentUpdated = new Event("calendar-content-updated");

// === CLASS === //
class Calendar {
  // === ATTRIBUTES === //
  #calendar;
  #date;
  #year;
  #month;
  #day;
  #currentDate;
  #previousMonthOption;
  #nextMonthOption;
  #MONTHS = [
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
  #WEEK_DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
  #MAX_DATES = 42;

  // === BUILDER === //

  /**
   * @param { HTMLElement } calendar - Where to render calendar data.
   */
  constructor(calendar) {
    if (!(calendar instanceof HTMLElement)) throw "Given parameter is not an HTML element.";

    // Initialize attributes
    this.#calendar = calendar;
    this.#date = new Date();
    this.#year = this.#date.getFullYear();
    this.#month = this.#date.getMonth();
  }

  // === METHODS === //

  /**
   * Render calendar content.
   */
  render() {
    // Define DOM elements
    let header = document.createElement("div");
    let calendarCurrentDate = document.createElement("span");
    let calendarNavigationOptions = document.createElement("div");
    let calendarNextMonthOption = document.createElement("i");
    let calendarPreviousMonthOption = document.createElement("i");
    let body = document.createElement("div");
    let calendarWeekdays = document.createElement("div");
    let calendarDates = document.createElement("div");

    // Set attributes
    header.setAttribute("class", "section__calendar-header");
    calendarCurrentDate.setAttribute("class", "section__calendar-current-date");
    calendarNavigationOptions.setAttribute("class", "section__calendar-navigation-options");

    calendarPreviousMonthOption.setAttribute("class", "ti ti-chevron-left section__calendar-navigation-option section__calendar-navigation-option--previous-month");
    calendarPreviousMonthOption.setAttribute("title", "Previous month");

    calendarNextMonthOption.setAttribute("class", "ti ti-chevron-right section__calendar-navigation-option section__calendar-navigation-option--next-month");
    calendarNextMonthOption.setAttribute("title", "Next month");

    body.setAttribute("class", "section__calendar-body");

    calendarWeekdays.setAttribute("class", "section__calendar-row section__calendar-row--weekdays");
    calendarDates.setAttribute("class", "section__calendar-row section__calendar-row--dates");

    // Set HTML/text content
    calendarCurrentDate.innerText = "January 0000";

    // Append child nodes
    this.#calendar.appendChild(header);
    this.#calendar.appendChild(body);

    header.appendChild(calendarCurrentDate);
    header.appendChild(calendarNavigationOptions);

    calendarNavigationOptions.appendChild(calendarPreviousMonthOption);
    calendarNavigationOptions.appendChild(calendarNextMonthOption);

    body.appendChild(calendarWeekdays);
    body.appendChild(calendarDates);

    // Generate, set attributes and append child nodes of weekdays
    for (let i = 0; i < this.#WEEK_DAYS.length; i++) {
      let weekday = document.createElement("span");
      weekday.setAttribute("class", "section__calendar-weekday");
      weekday.innerText = this.#WEEK_DAYS[i].substring(0, 3);
      calendarWeekdays.appendChild(weekday);
    }

    // Link DOM elements
    this.#day = calendarDates;
    this.#currentDate = calendarCurrentDate;
    this.#previousMonthOption = calendarPreviousMonthOption;
    this.#nextMonthOption = calendarNextMonthOption;

    // Add event listeners
    this.#previousMonthOption.addEventListener("click", () => {
      this.#month--;
      this.#updateCalendarData();
    });
    this.#nextMonthOption.addEventListener("click", () => {
      this.#month++;
      this.#updateCalendarData();
    });

    // Dispatch events
    window.dispatchEvent(eventCalendarRender);

    // Execute methods
    this.#manipulate();
  }

  /**
   * Update internal calendar data and manipulate current content.
   */
  #updateCalendarData() {
    // Check if the month is out of range
    if (this.#month < 0 || this.#month > 11) {
      // Set the date to the first day of the month with the new year
      this.#date = new Date(this.#year, this.#month, new Date().getDate());

      // Set the year to the new year
      this.#year = this.#date.getFullYear();

      // Set the month to the new month
      this.#month = this.#date.getMonth();
    } else {
      // Set the date to the current date
      this.#date = new Date();
    }

    // Call the manipulate function to update calendar content
    this.#manipulate();
  }

  /**
   * Manipulate calendar content with data set in attributes.
   */
  #manipulate() {
    // Get the first day of the month
    let firstMonthDay = new Date(this.#year, this.#month, 1).getDay();

    // Get the last date of the month
    let lastMonthDate = new Date(this.#year, this.#month + 1, 0).getDate();

    // Get the last day of the previous month
    let previousMonthLastDate = new Date(this.#year, this.#month, 0).getDate();

    // Array to save all date elements
    let dates = [];

    // Loop to add the last dates of the previous month
    for (let i = firstMonthDay - 1; i > 0; i--) {
      // Define DOM elements
      let dateCell = document.createElement("span");
      let dateSpan = document.createElement("span");

      // Set attributes
      dateCell.setAttribute("class", "section__calendar-date section__calendar-date--inactive");
      dateSpan.setAttribute("class", "section__calendar-date-span");

      // Set HTML/text content
      dateSpan.innerText = this.formatDate(
        new Date(this.#year, this.#month, previousMonthLastDate - i + 1).getTime(),
        "DD"
      );

      // Append child nodes
      dateCell.appendChild(dateSpan);

      // Add element to dates array
      dates.push(dateCell);
    }

    // Loop to add the dates of the current month
    for (let i = 1; i <= lastMonthDate; i++) {
      // Define DOM elements
      let dateCell = document.createElement("span");
      let dateSpan = document.createElement("span");
      let isToday = (
        i === this.#date.getDate()
        && this.#month === new Date().getMonth()
        && this.#year === new Date().getFullYear()
      );
      let timestamp = new Date(this.#year, this.#month, i).getTime();
      let utcTimestamp = Math.floor(new Date(this.#year, this.#month, i + 1, 0, 0, 0, 0) / 1000);

      // Set attributes
      dateCell.setAttribute("class", "section__calendar-date " + (
        (isToday)
          ? "section__calendar-date--active"
          : ""
      ));

      dateCell.setAttribute("data-date-timestamp", timestamp);
      dateCell.setAttribute("data-date-utc-timestamp", utcTimestamp);

      dateSpan.setAttribute("class", "section__calendar-date-span");

      // Set HTML/text content
      dateSpan.innerText = this.formatDate(
        timestamp,
        "DD"
      );

      // Append child nodes
      dateCell.appendChild(dateSpan);

      // Add element to dates array
      dates.push(dateCell);
    }

    // Loop to add the first dates of the next month
    for (let i = 0; dates.length < this.#MAX_DATES; i++) {
      // Define DOM elements
      let dateCell = document.createElement("span");
      let dateSpan = document.createElement("span");

      // Set attributes
      dateCell.setAttribute("class", "section__calendar-date section__calendar-date--inactive");
      dateSpan.setAttribute("class", "section__calendar-date-span");

      // Set HTML/text content
      dateSpan.innerText = this.formatDate(
        new Date(this.#year, this.#month, i + 1).getTime(),
        "DD"
      );

      // Append child nodes
      dateCell.appendChild(dateSpan);

      // Add element to dates array
      dates.push(dateCell);

      if (i >= 9999) throw "Max iterations reached";
    }

    // Update the current date element with the formatted current month and year
    this.#currentDate.innerText = this.formatDate(
      new Date(this.#year, this.#month, 1).getTime(),
      "MONTH-NAME YYYY"
    );

    // Update calendar content with new dates
    this.#day.innerHTML = "";
    dates.forEach(date => this.#day.appendChild(date));

    // Dispatch events
    window.dispatchEvent(eventCalendarContentUpdated);
  }

  /**
   * Return a date in specific format.
   * 
   * @param { Date } timestamp - Date's timestamp
   * @param {"DD"|"YYYY-MM-DD"|"DD-MM-YYYY"|"DD/MM/YYYY"|"MONTH-NAME YYYY"|"HH:mm"} formatType - Date format you want to have.
   * @return Formatted date or NULL, if given format is not supported.
   */
  formatDate(timestamp, formatType) {
    let date = new Date();
    date.setTime(timestamp);

    switch (formatType) {
      case "DD":
        return String(date.getDate()).padStart(2, "0");

      case "YYYY-MM-DD":
        return String(date.getFullYear()).padStart(4, "0")
          + "-"
          + String(date.getMonth() + 1).padStart(2, "0")
          + "-"
          + String(date.getDate()).padStart(2, "0");

      case "DD-MM-YYYY":
        return String(date.getDate()).padStart(2, "0")
          + "-"
          + String(date.getMonth() + 1).padStart(2, "0")
          + "-"
          + String(date.getFullYear()).padStart(4, "0");

      case "DD/MM/YYYY":
        return String(date.getDate()).padStart(2, "0")
          + "/"
          + String(date.getMonth() + 1).padStart(2, "0")
          + "/"
          + String(date.getFullYear()).padStart(4, "0");

      case "MONTH-NAME YYYY":
        return this.#MONTHS[date.getMonth()]
          + " "
          + String(date.getFullYear()).padStart(4, "0");
        
      case "HH:mm":
        return String(date.getHours()).padStart(2, "0")
          + ":" 
          + String(date.getMinutes()).padStart(2, "0");

      default:
        console.error("Given format (" + formatType + ") is not supported.");
        return null;
    }
  }
}