// === STRICT MODE === //
"use strict";

// === VARIABLES, CONSTANTS, DOM ELEMENTS === //
const ELEMENTS = {};
const ACTIVE_ELEMENTS = {};
const CSS_CLASS = {
  active: "active",
  hidden: "hidden"
};
const SECTION = {};
const SECTION_CODENAME = {
  dashboard: "dashboard",
  datesAndTimes: "dates-and-times"
};
const ASIDE_NAVIGATION_ITEMS = {};
const URL = window.location.origin;
const ENDPOINT_PATH = "/api";
const ENDPOINT_URI = URL + ENDPOINT_PATH;
const ENDPOINTS = {
  generalAppointmentsData: ENDPOINT_URI + "/appointments/general-data/{dateTimestamp}",
  appointmentsForDay: ENDPOINT_URI + "/appointments/for/{dateTimestamp}",
  datesAndTimes: ENDPOINT_URI + "/timestamps/{dateTimestamp}"
};
const DATA = {
  appointments: {}
};
let refreshAppointmentsGeneralData;

// === EVENT LISTENERS === //
window.addEventListener("load", init);
window.addEventListener("calendar-content-updated", () => {
  // Link DOM elements
  let datesAndTimesCalendar = SECTION.datesAndTimes.querySelector(".section__calendar");
  let calendarDates = datesAndTimesCalendar.querySelectorAll(".section__calendar-date:not(.section__calendar-date--inactive)");

  // Add event listeners
  calendarDates.forEach(date => {
    date.addEventListener("click", () => {
      // Variables
      let calendar = new Calendar(document.querySelector(".section__calendar"));

      // Get date timestamp
      let timestamp = date.getAttribute("data-date-timestamp") ;     
      let utcTimestamp = date.getAttribute("data-date-utc-timestamp");

      // Link DOM elements
      let dateItem = SECTION.datesAndTimes.querySelector(".section__form-item--date");
      let dateInputField = dateItem.querySelector(".section__form-input-field");

      // Set new date value
      dateInputField.value = calendar.formatDate(timestamp, "YYYY-MM-DD");

      showLoader("Recovering timestamps");
      ajax(
        "GET",
        ENDPOINTS.datesAndTimes.replace("{dateTimestamp}", utcTimestamp),
        true,
        {},
        {},
        (response) => {
          // Check response status is ok
          if (response.status == "ok") {
            // Variables
            let minDate = new Date(response.date_timestamp);
            let maxDate = new Date(response.date_timestamp);
            let date = new Date();
            let calendar = new Calendar(document.querySelector(".section__calendar"));

            // Set attributes
            minDate.setDate(minDate.getDate() - 1);
            minDate.setHours(8);
            minDate.setMinutes(0);
            minDate.setSeconds(0);
            minDate.setMilliseconds(0);
            
            date.setTime(minDate.getTime());
            
            maxDate.setDate(maxDate.getDate() - 1);
            maxDate.setHours(18);
            maxDate.setMinutes(0);
            maxDate.setSeconds(0);
            maxDate.setMilliseconds(0);

            // Link DOM elements
            let timeGroups = SECTION.datesAndTimes.querySelector(".section__form-times");

            // Remove current time items group content
            timeGroups.innerHTML = "";

            let timeGroupId;
            let timeGroup;
            let timeGroupHeader;
            let timeGroupSelectAllHoursCheckbox;
            let timeGroupLabel;
            let timeItems;

            // Generate time slots
            for (let currentTime = -1; getUTCTimestamp(date.getTime()) < getUTCTimestamp(maxDate.getTime()); date.setMinutes(date.getMinutes() + 5)) {
              if (currentTime != date.getHours()) {
                currentTime = date.getHours();

                // Define DOM elements
                timeGroupId = "dates-and-times--select-all-" + date.getHours() + "-hours"
                timeGroup = document.createElement("div");
                timeGroupHeader = document.createElement("div");
                timeGroupSelectAllHoursCheckbox = document.createElement("input");
                timeGroupLabel = document.createElement("label");
                timeItems = document.createElement("div");

                // Set attributes
                timeGroup.setAttribute("class", "section__form-time-items-group");
                timeGroup.setAttribute("data-time-group-timestamp", date.getTime());
                timeGroup.setAttribute("data-time-group-utc-timestamp", getUTCTimestamp(date.getTime()));

                timeGroupHeader.setAttribute("class", "section__form-time-items-group-header");

                timeGroupSelectAllHoursCheckbox.setAttribute("class", "section__form-input-field section__form-input-field--checkbox");
                timeGroupSelectAllHoursCheckbox.setAttribute("type", "checkbox");
                timeGroupSelectAllHoursCheckbox.setAttribute("id", timeGroupId);

                timeGroupLabel.setAttribute("class", "section__form-time-item-group-label");
                timeGroupLabel.setAttribute("for", timeGroupId);

                timeItems.setAttribute("class", "section__form-time-items");

                // Set inner text/HTML content
                timeGroupLabel.innerText = calendar.formatDate(date.getTime(), "HH:mm");

                // Add event listeners
                timeGroupSelectAllHoursCheckbox.addEventListener("change", (event) => {
                  let availableTimeItems = event.target
                    .parentNode
                    .parentNode
                    .querySelectorAll(".section__form-time-item:not(.section__form-time-item--locked) .section__form-input-field--checkbox");

                  availableTimeItems.forEach(timeItemCheckbox => {
                    timeItemCheckbox.checked = event.target.checked;
                  });
                });

                // Append child nodes
                timeGroups.appendChild(timeGroup);

                timeGroup.appendChild(timeGroupHeader);
                timeGroup.appendChild(timeItems);

                timeGroupHeader.appendChild(timeGroupSelectAllHoursCheckbox);
                timeGroupHeader.appendChild(timeGroupLabel);
              }
              // Define DOM elements
              let timeItem = document.createElement("div");
              let timeLabel = document.createElement("label");
              let timeCheckboxField = document.createElement("input");

              // Set attributes
              let timeItemClass = "section__form-time-item";
              timeCheckboxField.checked = response.data[getUTCTimestamp(date.getTime())] != null;
              
              if (response.data[getUTCTimestamp(date.getTime())] != null) {
                timeItemClass += " section__form-time-item--" + response.data[getUTCTimestamp(date.getTime())].status;
              }

              timeItem.setAttribute("class", timeItemClass);
              timeItem.setAttribute("data-date-timestamp", date.getTime());
              timeItem.setAttribute("data-date-utc-timestamp", getUTCTimestamp(date.getTime()));

              timeLabel.setAttribute("class", "section__form-time-item-label");
              timeLabel.setAttribute("for", "time--" + date.getTime());

              timeCheckboxField.setAttribute("class", "section__form-input-field section__form-input-field--checkbox hidden");
              timeCheckboxField.setAttribute("type", "checkbox");
              timeCheckboxField.setAttribute("name", "times[]");
              timeCheckboxField.setAttribute("id", "time--" + date.getTime());
              timeCheckboxField.setAttribute("value", getUTCTimestamp(date.getTime()));

              // Set text/HTML content
              timeLabel.innerText = calendar.formatDate(date.getTime(), "HH:mm");

              // Append child nodes
              timeItems.appendChild(timeItem);
              timeItem.appendChild(timeLabel);
              timeItem.appendChild(timeCheckboxField);
            }
          }

          hideLoader();
        }
      );

      if (ACTIVE_ELEMENTS["date"] != null) {
        ACTIVE_ELEMENTS["date"].classList.remove("section__calendar-date--active");
      }

      date.classList.add("section__calendar-date--active");
      ACTIVE_ELEMENTS["date"] = date;
    })
  });
});


// === METHODS === //

// Init function
function init() {
  // Variables
  let sectionAlias = localStorage.getItem("lastVisitedSectionAlias") ?? window.location.hash.substring(1);

  // Link DOM elements
  SECTION.dashboard = document.querySelector(".section--dashboard");
  SECTION.datesAndTimes = document.querySelector(".section--dates-and-times");
  ASIDE_NAVIGATION_ITEMS.dashboard = document.querySelector(".appointments__aside-navigation-item--dashboard");
  ASIDE_NAVIGATION_ITEMS.datesAndTimes = document.querySelector(".appointments__aside-navigation-item--dates-and-times");
  refreshAppointmentsGeneralData = document.querySelector(".appointments__refresh-appointments-general-data");

  // Add event listeners
  ASIDE_NAVIGATION_ITEMS.dashboard.addEventListener("click", () => {
    showSection(SECTION_CODENAME.dashboard);
    setActiveElement("aside-navigation-item", ASIDE_NAVIGATION_ITEMS.dashboard);
  });
  ASIDE_NAVIGATION_ITEMS.datesAndTimes.addEventListener("click", () => {
    showSection(SECTION_CODENAME.datesAndTimes);
    setActiveElement("aside-navigation-item", ASIDE_NAVIGATION_ITEMS.datesAndTimes);
  });
  refreshAppointmentsGeneralData.addEventListener("click", () => {
    loadAppointmentsGeneralData();
    loadAppointmentsData();
  })

  // Execute some methods
  resetAllActiveElements();
  loadDashboardData();
  loadDatesAndTimesData();

  // Show default/requested section
  setActiveElement("aside-navigation-item", ASIDE_NAVIGATION_ITEMS[getSectionCodename(SECTION_CODENAME.dashboard)]);
  showSection(SECTION_CODENAME.dashboard);

  // Show selected section
  showSection(sectionAlias);
}

/**
 * Add to given element 'active' class
 * 
 * @param { string } type
 * @param { HTMLElement } element
 */
function setActiveElement(type, element) {
  if (!(element instanceof HTMLElement)) throw "The argument (element) must be a HTML Element. Given " + typeof (element);

  // Check if exists an active element
  if (ACTIVE_ELEMENTS[type] != null) {
    unsetActiveElement(ACTIVE_ELEMENTS[type]);
  }

  element.classList.add(CSS_CLASS.active);
  ACTIVE_ELEMENTS[type] = element;
}

/**
 * Remove to given element 'active' class.
 * 
 * @param { HTMLElement } element
 */
function unsetActiveElement(element) {
  if (!(element instanceof HTMLElement)) throw "The argument (element) must be an HTML Element. Given " + typeof (element);
  element.classList.remove(CSS_CLASS.active);
}

/**
 * Show section by giving it's alias.
 * 
 * @param { string } alias
 */
function showSection(alias) {
  let codename = getSectionCodename(alias);
  let section = (SECTION[codename] != null)
    ? SECTION[codename]
    : SECTION.dashboard;

  localStorage.setItem("lastVisitedSectionAlias", alias);
  setActiveElement("aside-navigation-item", ASIDE_NAVIGATION_ITEMS[codename]);
  setActiveElement("section", section);
}

/**
 * Get section codename by giving it's alias.
 * 
 * @param   { string } alias - Section alias.
 * @return  Section codename or NULL, if section alias is not associated to any
 *          codename.
 */
function getSectionCodename(alias) {
  for (let codename in SECTION_CODENAME) {
    if (SECTION_CODENAME[codename] == alias) {
      return codename;
    }
  }

  return null;
}

/**
 * Reset all active elements.
 */
function resetAllActiveElements() {
  let activeElements = document.querySelectorAll(".active");
  activeElements.forEach(activeElement => {
    unsetActiveElement(activeElement);
  })
}

/**
 * Make an AJAX request to some URL.
 * 
 * @param { "GET" | "POST" } method
 * @param { string } url
 * @param { boolean } async 
 * @param { object } headers
 * @param { object } data
 * @param { function } callback  
 */
function ajax(method, url, async, headers, data, callback) {
  let xHttp = new XMLHttpRequest();
  xHttp.addEventListener("readystatechange", () => {
    if (xHttp.readyState == 4 && xHttp.status == 200) {
      callback(JSON.parse(xHttp.response));
    }
  });

  for (let header in headers) {
    xHttp.setRequestHeader(header, headers[header]);
  }

  xHttp.open(method, url, async);
  xHttp.send(data);
}

/**
 * Load dashboard data.
 */
function loadDashboardData() {
  loadAppointmentsGeneralData();
  loadDashboardCalendar();
  loadAppointmentsData();
}

/**
 * Load appointments general data.
 */
function loadAppointmentsGeneralData() {
  showLoader("Refreshing general appointments data");
  ajax(
    "GET",
    ENDPOINTS.generalAppointmentsData.replace("{dateTimestamp}", getUTCTimestamp(new Date().getTime())),
    true,
    {},
    {},
    (response) => {
      // Check response status
      if (response.status == "ok") {
        // Link DOM elements
        let appointmentsGeneralData = SECTION.dashboard.querySelector(".section__dashboard-item--general-appointments-data");
        let confirmedAppointmentsItem = appointmentsGeneralData.querySelector(".section__general-appointments-data-item--confirmed-appointments-for-today");
        let confirmedAppointmentsValue = confirmedAppointmentsItem.querySelector(".section__general-appointments-data-item-value");
        let pendingAppointmentsItem = appointmentsGeneralData.querySelector(".section__general-appointments-data-item--pending-appointments-for-today");
        let pendingAppointmentsValue = pendingAppointmentsItem.querySelector(".section__general-appointments-data-item-value");
        let canceledAppointmentsItem = appointmentsGeneralData.querySelector(".section__general-appointments-data-item--canceled-appointments-for-today");
        let canceledAppointmentsValue = canceledAppointmentsItem.querySelector(".section__general-appointments-data-item-value");

        // Set text/HTML content
        confirmedAppointmentsValue.innerText = response.data["confirmed_appointments"];
        pendingAppointmentsValue.innerText = response.data["pending_appointments"];
        canceledAppointmentsValue.innerText = response.data["canceled_appointments"];
      }

      hideLoader();
    });
}

/**
 * Load dashboard calendar.
 */
function loadDashboardCalendar() {
  let dashboardCalendar = SECTION.dashboard.querySelector(".section__dashboard-calendar");
  let calendar = new Calendar(dashboardCalendar);
  calendar.render();
}

/**
 * Load appointments table data.
 */
function loadAppointmentsData() {
  ajax(
    "GET",
    ENDPOINTS.appointmentsForDay.replace("{dateTimestamp}", getUTCTimestamp(new Date().getTime())),
    true,
    {},
    {},
    (response) => {
      // Check if response status is OK
      if (response.status == "ok") {
        // Link DOM element
        let appointmentsForTodayResults = SECTION.dashboard.querySelector(".section__appointments-for-today-results");

        // Remove current appointment results content
        appointmentsForTodayResults.innerHTML = "";

        // Check if there is appointments for today
        if (response.data.length > 0) {
          // Create the table data
          // Define DOM elements
          let table = document.createElement("table");
          let tableHeader = document.createElement("thead");
          let tableHeaderRow = document.createElement("tr");
          let tableDateHeading = document.createElement("th");
          let tableTimeHeading = document.createElement("th");
          let tableCategoryHeading = document.createElement("th");
          let tableActionsHeading = document.createElement("th");
          let tableBody = document.createElement("tbody");

          // Set attributes
          table.setAttribute("class", "section__table section__table--appointments-for-today");
          tableHeader.setAttribute("class", "section__table-header");
          tableHeaderRow.setAttribute("class", "section__table-row");
          tableDateHeading.setAttribute("class", "section__table-cell section__table-cell--heading");
          tableTimeHeading.setAttribute("class", "section__table-cell section__table-cell--heading");
          tableCategoryHeading.setAttribute("class", "section__table-cell section__table-cell--heading");
          tableActionsHeading.setAttribute("class", "section__table-cell section__table-cell--heading");
          tableBody.setAttribute("class", "section__table-data");

          // Set HTML/text content
          tableDateHeading.innerText = "Date";
          tableTimeHeading.innerText = "Time";
          tableCategoryHeading.innerText = "Category";
          tableActionsHeading.innerText = "Actions";

          // Append child nodes
          table.appendChild(tableHeader);
          table.appendChild(tableBody);

          tableHeader.appendChild(tableHeaderRow);

          tableHeaderRow.appendChild(tableDateHeading);
          tableHeaderRow.appendChild(tableTimeHeading);
          tableHeaderRow.appendChild(tableCategoryHeading);
          tableHeaderRow.appendChild(tableActionsHeading);

          // Generate table data
          response.data.forEach(appointment => {
            // Define DOM elements
            let tableRow = document.createElement("tr");
            let dateCell = document.createElement("td");
            let timeCell = document.createElement("td");
            let categoryCell = document.createElement("td");
            let actionsCell = document.createElement("td");
            let actionOptions = document.createElement("div");
            let actionSeeAppointmentDetailsOption = document.createElement("i");

            // Set attributes
            tableRow.setAttribute("class", "section__table-row");
            tableRow.setAttribute("data-appointment-id", appointment.id);

            dateCell.setAttribute("class", "section__table-cell");
            timeCell.setAttribute("class", "section__table-cell");
            categoryCell.setAttribute("class", "section__table-cell");
            actionsCell.setAttribute("class", "section__table-cell");
            actionOptions.setAttribute("class", "section__table-cell-options");

            actionSeeAppointmentDetailsOption.setAttribute("class", "section__table-cell-option section__table-cell-option--see-details ti ti-eye");
            actionSeeAppointmentDetailsOption.setAttribute("title", "See details");

            // Set HTML/text content
            dateCell.innerText = appointment.date;
            timeCell.innerText = appointment.time;
            categoryCell.innerText = appointment.category;

            // Add event listeners
            actionSeeAppointmentDetailsOption.addEventListener("click", () => openAppointmentDetailsModal(appointment.id));

            // Append child nodes
            tableBody.appendChild(tableRow);
            tableRow.appendChild(dateCell);
            tableRow.appendChild(timeCell);
            tableRow.appendChild(categoryCell);
            tableRow.appendChild(actionsCell);

            actionsCell.appendChild(actionOptions);
            actionOptions.appendChild(actionSeeAppointmentDetailsOption);

            // Save appointment data
            DATA.appointments[appointment.id] = appointment;
          });

          // Set the new table data in appointment results
          appointmentsForTodayResults.appendChild(table);

        } else {
          // No data
          // Define DOM elements
          let noDataMessage = document.createElement("span");
          noDataMessage.setAttribute("class", "no-data-message");
          noDataMessage.innerText = "There's not any appointments for today.";
          appointmentsForTodayResults.appendChild(noDataMessage);
        }
      }
    }
  );
}

/**
 * Open appointment details modal.
 * 
 * @param { string } appointmentId
 */
function openAppointmentDetailsModal(appointmentId) {
  // Link DOM elements
  let modal = document.querySelector(".modal--appointment-details[data-appointment-id='" + appointmentId + "']");
  modal = (modal != null)
    ? modal
    : generateAppointmentDetailsModal(appointmentId);

  console.log(modal);

  setActiveElement("appointment-details-modal", modal);
}

/**
 * Generate appointment details modal.
 * 
 * @param { string } appointmentId
 */
function generateAppointmentDetailsModal(appointmentId) {
  // Check if appointment data exists
  if (DATA.appointments[appointmentId] == null) throw "Appointment ID (" + appointmentId + ") has not associated any data.";

  // Link DOM elements
  let modals = document.querySelector(".modals");

  // Define DOM elements
  let modal = document.createElement("div");
  let modalContent = document.createElement("div");
  let modalHeader = document.createElement("div");
  let modalHeading = document.createElement("h1");
  let modalHeaderOptions = document.createElement("div");
  let closeModalOption = document.createElement("i");
  let modalMainContent = document.createElement("div");
  let appointmentDataItems = document.createElement("div");
  let fullName = {
    item: document.createElement("div"),
    label: document.createElement("label"),
    icon: document.createElement("i"),
    itemName: document.createElement("span"),
    value: document.createElement("span")
  };
  let email = {
    item: document.createElement("div"),
    label: document.createElement("label"),
    icon: document.createElement("i"),
    itemName: document.createElement("span"),
    value: document.createElement("span")
  };
  let course = {
    item: document.createElement("div"),
    label: document.createElement("label"),
    icon: document.createElement("i"),
    itemName: document.createElement("span"),
    value: document.createElement("span")
  };
  let category = {
    item: document.createElement("div"),
    label: document.createElement("label"),
    icon: document.createElement("i"),
    itemName: document.createElement("span"),
    value: document.createElement("span")
  };
  let date = {
    item: document.createElement("div"),
    label: document.createElement("label"),
    icon: document.createElement("i"),
    itemName: document.createElement("span"),
    value: document.createElement("span")
  };
  let time = {
    item: document.createElement("div"),
    label: document.createElement("label"),
    icon: document.createElement("i"),
    itemName: document.createElement("span"),
    value: document.createElement("span")
  };
  let observations = {
    item: document.createElement("div"),
    label: document.createElement("label"),
    icon: document.createElement("i"),
    itemName: document.createElement("span"),
    value: document.createElement("span")
  };

  // Set attributes
  modal.setAttribute("class", "modal modal--appointment-details");
  modal.setAttribute("data-appointment-id", appointmentId);

  modalContent.setAttribute("class", "modal__content");
  modalHeader.setAttribute("class", "modal__header");
  modalHeading.setAttribute("class", "modal__heading");
  modalHeaderOptions.setAttribute("class", "modal__header-options");

  closeModalOption.setAttribute("class", "modal__header-option modal__header-option--close-modal ti ti-x");
  closeModalOption.setAttribute("title", "Close modal");

  modalMainContent.setAttribute("class", "modal__main-content");
  appointmentDataItems.setAttribute("class", "modal__appointment-data-items");

  fullName.item.setAttribute("class", "modal__appointment-data-item modal__appointment-data-item--full-name");
  fullName.label.setAttribute("class", "modal__appointment-data-item-label");
  fullName.icon.setAttribute("class", "modal__appointment-data-item-icon ti ti-user");
  fullName.itemName.setAttribute("class", "modal__appointment-data-item-name");
  fullName.value.setAttribute("class", "modal__appointment-data-item-value");

  email.item.setAttribute("class", "modal__appointment-data-item modal__appointment-data-item--email");
  email.label.setAttribute("class", "modal__appointment-data-item-label");
  email.icon.setAttribute("class", "modal__appointment-data-item-icon ti ti-mail");
  email.itemName.setAttribute("class", "modal__appointment-data-item-name");
  email.value.setAttribute("class", "modal__appointment-data-item-value");

  course.item.setAttribute("class", "modal__appointment-data-item modal__appointment-data-item--course");
  course.label.setAttribute("class", "modal__appointment-data-item-label");
  course.icon.setAttribute("class", "modal__appointment-data-item-icon ti ti-school");
  course.itemName.setAttribute("class", "modal__appointment-data-item-name");
  course.value.setAttribute("class", "modal__appointment-data-item-value");

  category.item.setAttribute("class", "modal__appointment-data-item modal__appointment-data-item--category");
  category.label.setAttribute("class", "modal__appointment-data-item-label");
  category.icon.setAttribute("class", "modal__appointment-data-item-icon ti ti-category");
  category.itemName.setAttribute("class", "modal__appointment-data-item-name");
  category.value.setAttribute("class", "modal__appointment-data-item-value");

  date.item.setAttribute("class", "modal__appointment-data-item modal__appointment-data-item--date");
  date.label.setAttribute("class", "modal__appointment-data-item-label");
  date.icon.setAttribute("class", "modal__appointment-data-item-icon ti ti-calendar-week");
  date.itemName.setAttribute("class", "modal__appointment-data-item-name");
  date.value.setAttribute("class", "modal__appointment-data-item-value");

  time.item.setAttribute("class", "modal__appointment-data-item modal__appointment-data-item--time");
  time.label.setAttribute("class", "modal__appointment-data-item-label");
  time.icon.setAttribute("class", "modal__appointment-data-item-icon ti ti-clock");
  time.itemName.setAttribute("class", "modal__appointment-data-item-name");
  time.value.setAttribute("class", "modal__appointment-data-item-value");

  observations.item.setAttribute("class", "modal__appointment-data-item modal__appointment-data-item--observations");
  observations.label.setAttribute("class", "modal__appointment-data-item-label");
  observations.icon.setAttribute("class", "modal__appointment-data-item-icon ti ti-note");
  observations.itemName.setAttribute("class", "modal__appointment-data-item-name");
  observations.value.setAttribute("class", "modal__appointment-data-item-value");
  if (DATA.appointments[appointmentId]["observations"] == null) {
    observations.value.setAttribute("class", "modal__appointment-data-item-value modal__appointment-data-item-value--empty");
  }

  // Set inner HTML/text content
  modalHeading.innerText = "Appointment data";

  fullName.itemName.innerText = "Full name";
  fullName.value.innerText = DATA.appointments[appointmentId]["full_name"];

  email.itemName.innerText = "Email";
  email.value.innerText = DATA.appointments[appointmentId]["email"];

  course.itemName.innerText = "Course";
  course.value.innerText = DATA.appointments[appointmentId]["course"];

  category.itemName.innerText = "Category";
  category.value.innerText = DATA.appointments[appointmentId]["category"];

  date.itemName.innerText = "Date";
  date.value.innerText = DATA.appointments[appointmentId]["date"];

  time.itemName.innerText = "Time";
  time.value.innerText = DATA.appointments[appointmentId]["time"];

  observations.itemName.innerText = "Observations";
  observations.value.innerHTML = (DATA.appointments[appointmentId]["observations"] != null)
    ? DATA.appointments[appointmentId]["observations"]
    : "No comments";

  // Add event listener
  closeModalOption.addEventListener("click", () => unsetActiveElement(ACTIVE_ELEMENTS["appointment-details-modal"]));

  // Append child nodes
  modals.appendChild(modal);
  modal.appendChild(modalContent);

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalMainContent);

  modalHeader.appendChild(modalHeading);
  modalHeader.appendChild(modalHeaderOptions);

  modalHeaderOptions.appendChild(closeModalOption);
  modalMainContent.appendChild(appointmentDataItems);

  appointmentDataItems.appendChild(fullName.item);
  appointmentDataItems.appendChild(email.item);
  appointmentDataItems.appendChild(course.item);
  appointmentDataItems.appendChild(category.item);
  appointmentDataItems.appendChild(date.item);
  appointmentDataItems.appendChild(time.item);
  appointmentDataItems.appendChild(observations.item);

  // Full name
  fullName.item.appendChild(fullName.label);
  fullName.item.appendChild(fullName.value);

  fullName.label.appendChild(fullName.icon);
  fullName.label.appendChild(fullName.itemName);

  // Email
  email.item.appendChild(email.label);
  email.item.appendChild(email.value);

  email.label.appendChild(email.icon);
  email.label.appendChild(email.itemName);

  // Course
  course.item.appendChild(course.label);
  course.item.appendChild(course.value);

  course.label.appendChild(course.icon);
  course.label.appendChild(course.itemName);


  // Category
  category.item.appendChild(category.label);
  category.item.appendChild(category.value);

  category.label.appendChild(category.icon);
  category.label.appendChild(category.itemName);

  // Date
  date.item.appendChild(date.label);
  date.item.appendChild(date.value);

  date.label.appendChild(date.icon);
  date.label.appendChild(date.itemName);

  // Time
  time.item.appendChild(time.label);
  time.item.appendChild(time.value);

  time.label.appendChild(time.icon);
  time.label.appendChild(time.itemName);

  // Observations
  observations.item.appendChild(observations.label);
  observations.item.appendChild(observations.value);

  observations.label.appendChild(observations.icon);
  observations.label.appendChild(observations.itemName);

  // Return generated modal
  return modal;
}

/**
 * Load dates and times data.
 */
function loadDatesAndTimesData() {
  loadDatesAndTimesCalendar();
}

/**
 * Load dates and times calendar.
 */
function loadDatesAndTimesCalendar() {
  // Link DOM elements
  let datesAndTimesCalendar = SECTION.datesAndTimes.querySelector(".section__calendar");
  let calendar = new Calendar(datesAndTimesCalendar);
  calendar.render();

  // [Botched] Simulate a click in current selected date to activate event behavior
  let calendarActiveDate = SECTION.datesAndTimes.querySelector(".section__calendar-date--active");
  if (calendarActiveDate instanceof HTMLElement) {
    calendarActiveDate.click();
  }
}

function getUTCTimestamp(timestamp) {
  return Math.floor(timestamp / 1000);
}

function showLoader(headingText) {
  let loader  = document.querySelector(".loader");
  let loaderHeading = loader.querySelector(".loader__heading");
  if (headingText.trim() == "") throw "Heading text cannot be empty.";
  loaderHeading.innerText = headingText;
  setActiveElement("loader", loader);
}

function hideLoader() {
  unsetActiveElement(ACTIVE_ELEMENTS["loader"]);
}