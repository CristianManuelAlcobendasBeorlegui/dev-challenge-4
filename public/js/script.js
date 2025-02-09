// === STRICT MODE === //
"use strict";

// === VARIABLES, CONSTANTS, DOM ELEMENTS === //
const CSS_CLASS = {
  active: "active",
  hidden: "hidden"
};
const ACTIVE_ELEMENTS = {};
const SECTION = {};
const SECTION_CODENAMES = {
  landingPage: "landing-page",
  requestAnAppointment: "request-an-appointment",
  consultAppointments: "consult-appointments"
};
let requestAnAppointmentAnchor;
let consultAppointmentsAnchor;
let requestAnAppointmentCTAButton;
let requestAnAppointmentForm;
const FORM_PAGES_NAVIGATION_BAR = {};
const FORM_PAGES = {};
const FORM_PAGE_KEYS = {
  personalData: "personalData",
  selectCategory: "selectCategory",
  chooseDatetime: "chooseDatetime",
  appointmentConfirmation: "appointmentConfirmation"
};
const FORM_PAGES_ORDER = [
  FORM_PAGE_KEYS.personalData,
  FORM_PAGE_KEYS.selectCategory,
  FORM_PAGE_KEYS.chooseDatetime,
  FORM_PAGE_KEYS.appointmentConfirmation
];
let currentFormPage = 0;
let backFormPageButton;
let nextFormPageButton;
let appointmentConfirmationSubmitButton;
/**
 * Functions that must return a boolean to know if data entered in current form
 * page is valid.
 */
const FORM_PAGE_VALIDATIONS = {};
const EMAIL_REGEX = /^[A-Za-z0-9]{1}([A-Za-z0-9\.\_\-]{0,}[A-Za-z0-9]{1}){0,1}@{1}[A-Za-z0-9]{1}([A-Za-z0-9\.\_\-]{0,}[A-Za-z0-9]){0,1}$/;
let consultAppointmentsForm;
let consultAppointmentsSubmitButton;
let consultAppointmentResults;
let loader;
let loaderHeading;
const URL = window.location.origin;
const ENDPOINT_PATH = "/api";
const ENDPOINT_URI = URL + ENDPOINT_PATH;
let consultAppointmentTable;
let consultAppointmentData;
let consultAppointmentNoDataMessage;
let calendar;
let calendarChooseADate;
let calendarDates;
let availableDateTimes = [];
const ENDPOINT = {
  categories: ENDPOINT_URI + "/categories",
  courses: ENDPOINT_URI + "/courses",
  courseTurns: ENDPOINT_URI + "/courses/{course-uuid}/shifts",
  hoursAvailable: ENDPOINT_URI + "/timestamps/{date-timestamp}/{shift-id}/available",
  consultAppointments: ENDPOINT_URI + "/appointments/for/email/{email-address}"
};
let courseInputField;
let asideNavigation;
let openAsideNavigationBarIcon;
let closeAsideNavigationBarIcon;
let requestAnAppointmentAsideAnchor;
let consultAppointmentsAsideAnchor;

// === EVENT LISTENERS === //
window.addEventListener("load", init);
window.addEventListener("calendar-content-updated", () => {
  // Link DOM elements
  calendarDates = document.querySelectorAll(".section__calendar-date:not(.section__calendar-date--inactive)");

  // Add event listeners
  calendarDates.forEach(calendarDate => {
    calendarDate.addEventListener("click", () => {
      // Get the date timestamp
      let timestamp = calendarDate.getAttribute("data-date-timestamp");
      let utcTimestamp = calendarDate.getAttribute("data-date-utc-timestamp");

      // Set value to date input field
      let dateInputField = document.querySelector(".section__form-item-input-field--date");
      dateInputField
        .value = calendar.formatDate(
          timestamp,
          "YYYY-MM-DD"
        );

      // Set timestamp attribute
      dateInputField.setAttribute("data-date-timestamp", timestamp);
      dateInputField.setAttribute("data-date-utc-timestamp", utcTimestamp);

      // Change current active calendar date
      let currentActiveCalendarDate = document.querySelector(".section__calendar-date--active");

      if (currentActiveCalendarDate instanceof HTMLElement) {
        currentActiveCalendarDate.classList.remove("section__calendar-date--active");
      }

      calendarDate.classList.add("section__calendar-date--active");

      // Make a request to the API to know available hours for this day
      showLoader("Recovering available times");

      ajax(
        "GET",
        ENDPOINT.hoursAvailable
          .replace("{date-timestamp}", utcTimestamp)
          .replace("{shift-id}", document.querySelector("[name='turn']").value),
        true,
        {},
        (response) => {
          // Check if status response is OK
          if (response.status == "ok") {
            // Link DOM elements
            let timeItem = document.querySelector(".section__form-item--time");
            let timeOptions = timeItem.querySelector(".section__input-radio-options");

            // Remove current time options
            timeOptions.innerHTML = "";

            // Update current available date times array
            availableDateTimes = response.data;

            // Check if there are results
            if (response.data.length > 0) {
              // Generate time elements
              response.data.forEach(result => {
                // Variables
                let timeId = "request-an-appointment--time-" + result.timestamp;
                let timeFormatted = calendar.formatDate(result.timestamp * 1000, "HH:mm");

                // Define DOM elements
                let timeInputBox = document.createElement("div");
                let timeInputField = document.createElement("input");
                let timeLabel = document.createElement("label");

                // Set attributes
                timeInputBox.setAttribute("class", "section__form-input-box section__form-input-box--time-radio");

                timeInputField.setAttribute("class", "section__form-input-field section__form-input-field--radio hidden");
                timeInputField.setAttribute("data-time-label", timeFormatted);
                timeInputField.setAttribute("type", "radio");
                timeInputField.setAttribute("name", "time");
                timeInputField.setAttribute("id", timeId);
                timeInputField.setAttribute("value", result.timestamp);

                timeLabel.setAttribute("class", "section__form-radio-label");
                timeLabel.setAttribute("for", timeId);

                // Set text/HTML content
                timeLabel.innerText = timeFormatted;

                // Append child nodes
                timeOptions.appendChild(timeInputBox);

                timeInputBox.appendChild(timeInputField);
                timeInputBox.appendChild(timeLabel);
              });
            } else {
              // Define DOM elements
              let errorMessage = document.createElement("span");

              // Set attributes
              errorMessage.setAttribute("class", "section__input-radio-no-time-options");

              // Set text/HTML content
              errorMessage.innerText = "No available hour";

              // Append child nodes
              timeOptions.appendChild(errorMessage);
            }
          }

          hideLoader();
        });
    });
  });
});

// === METHODS === //

// Init function
function init() {
  // Link DOM elements
  SECTION.landingPage = document.querySelector(".section--landing-page");
  SECTION.requestAnAppointment = document.querySelector(".section--request-an-appointment");
  SECTION.consultAppointments = document.querySelector(".section--consult-appointments");
  requestAnAppointmentAnchor = document.querySelector(".appointments__navigation-anchor--request-an-appointment");
  consultAppointmentsAnchor = document.querySelector(".appointments__navigation-anchor--consult-appointments");
  requestAnAppointmentCTAButton = document.querySelector(".section__cta-button");
  requestAnAppointmentForm = document.querySelector(".section__form--request-an-appointment");
  FORM_PAGES_NAVIGATION_BAR[FORM_PAGE_KEYS.personalData] = document.querySelector(".section__form-page-item--personal-data");
  FORM_PAGES_NAVIGATION_BAR[FORM_PAGE_KEYS.selectCategory] = document.querySelector(".section__form-page-item--select-a-category");
  FORM_PAGES_NAVIGATION_BAR[FORM_PAGE_KEYS.chooseDatetime] = document.querySelector(".section__form-page-item--choose-a-datetime");
  FORM_PAGES_NAVIGATION_BAR[FORM_PAGE_KEYS.appointmentConfirmation] = document.querySelector(".section__form-page-item--appointment-confirmation");
  FORM_PAGES[FORM_PAGE_KEYS.personalData] = document.querySelector(".section__form-page--personal-data");
  FORM_PAGES[FORM_PAGE_KEYS.selectCategory] = document.querySelector(".section__form-page--select-a-category");
  FORM_PAGES[FORM_PAGE_KEYS.chooseDatetime] = document.querySelector(".section__form-page--choose-a-datetime");
  FORM_PAGES[FORM_PAGE_KEYS.appointmentConfirmation] = document.querySelector(".section__form-page--appointment-confirmation");
  FORM_PAGE_VALIDATIONS[FORM_PAGE_KEYS.personalData] = () => {
    let validData = true;

    // First name
    let firstNameItem = document.querySelector(".section__form-item--first-name");
    let firstNameInputField = firstNameItem.querySelector(".section__form-input-field");
    let firstNameErrorMessageElement = firstNameItem.querySelector(".section__form-item-error-message");

    firstNameInputField.value = firstNameInputField.value.trim();

    if (firstNameInputField.value.trim() == "") {
      firstNameErrorMessageElement.innerText = "This field cannot be empty.";
      validData = false;
    } else {
      firstNameErrorMessageElement.innerText = "";
    }

    // Last name
    let lastNameItem = document.querySelector(".section__form-item--last-name");
    let lastNameInputField = lastNameItem.querySelector(".section__form-input-field");
    let lastNameErrorMessageElement = lastNameItem.querySelector(".section__form-item-error-message");

    lastNameInputField.value = lastNameInputField.value.trim();

    if (lastNameInputField.value.trim() == "") {
      lastNameErrorMessageElement.innerText = "This field cannot be empty.";
      validData = false;
    } else {
      lastNameErrorMessageElement.innerText = "";
    }
    updateAppointmentResumeItem("first-name", firstNameInputField.value + " " + lastNameInputField.value);


    // Email
    let emailItem = document.querySelector(".section__form-item--email");
    let emailInputField = emailItem.querySelector(".section__form-input-field");
    let emailErrorMessageElement = emailItem.querySelector(".section__form-item-error-message");

    emailInputField.value = emailInputField.value.trim();

    if (emailInputField.value.trim() == "") {
      emailErrorMessageElement.innerText = "This field cannot be empty.";
      validData = false;
    } else if (!emailInputField.value.match(EMAIL_REGEX)) {
      emailErrorMessageElement.innerText = "Given email has not a valid format. Example: john.doe@example.com";
      validData = false;
    } else {
      emailErrorMessageElement.innerText = "";
    }
    updateAppointmentResumeItem("email", emailInputField.value);

    // Course
    let courseItem = document.querySelector(".section__form-item--course");
    let courseInputField = courseItem.querySelector(".section__form-input-field");
    let courseErrorMessageElement = courseItem.querySelector(".section__form-item-error-message");

    if (courseInputField.value.trim() == "") {
      courseErrorMessageElement.innerText = "This field cannot be empty.";
      validData = false;
    } else {
      courseErrorMessageElement.innerText = "";
    }

    // Turn
    let turnItem = document.querySelector(".section__form-item--turn");
    let turnInputField = turnItem.querySelector(".section__form-input-field");
    let turnErrorMessageElement = turnItem.querySelector(".section__form-item-error-message");

    if (!turnInputField.disabled && turnInputField.value.trim() == "") {
      turnErrorMessageElement.innerText = "Please choose one turn.";
      validData = false;
    } else {
      turnErrorMessageElement.innerText = "";
    }

    updateAppointmentResumeItem(
      "course",
      courseInputField.options[courseInputField.selectedIndex].text
      + ((turnInputField.value.trim() != "")
        ? " (" + turnInputField.options[turnInputField.selectedIndex].text + ")"
        : "")
    );

    return validData;
  };
  FORM_PAGE_VALIDATIONS[FORM_PAGE_KEYS.selectCategory] = () => {
    let validData = true;

    // Category
    let categoryItem = document.querySelector(".section__form-item--category");
    let categoryInputField = categoryItem.querySelector(".section__form-input-field");
    let categoryErrorMessageElement = categoryItem.querySelector(".section__form-item-error-message");

    if (categoryInputField.value.trim() == "") {
      categoryErrorMessageElement.innerText = "Please, select a category from dropdown list.";
      updateAppointmentResumeItem("category", "");
      validData = false;
    } else {
      categoryErrorMessageElement.innerText = "";
      updateAppointmentResumeItem("category", categoryInputField.options[categoryInputField.selectedIndex].text);
    }

    return validData;
  };
  FORM_PAGE_VALIDATIONS[FORM_PAGE_KEYS.chooseDatetime] = () => {
    let validData = true;

    // Date
    let dateItem = document.querySelector(".section__form-item--date");
    let dateInputField = dateItem.querySelector(".section__form-input-field");
    let dateErrorMessageElement = dateItem.querySelector(".section__form-item-error-message");

    if (dateInputField.value.trim() == "") {
      dateErrorMessageElement.innerText = "Please choose a date.";
      validData = false;

      updateAppointmentResumeItem("date", "");
      updateAppointmentResumeItem("time", "");
    } else {
      dateErrorMessageElement.innerText = "";

      // Time
      let timeItem = document.querySelector(".section__form-item--time");
      let checkedTimeInputField = timeItem.querySelector(".section__form-input-field--radio:checked");
      let timeErrorMessageElement = timeItem.querySelector(".section__form-item-error-message");

      if (checkedTimeInputField == null) {
        timeErrorMessageElement.innerText = (availableDateTimes.length > 0)
          ? "Please, select a time."
          : "There's not any hours available, choose another date.";
        validData = false;
        updateAppointmentResumeItem("time", "");
      } else {
        timeErrorMessageElement.innerText = "";
        updateAppointmentResumeItem("time", checkedTimeInputField.getAttribute("data-time-label"));
      }

      updateAppointmentResumeItem("date", calendar.formatDate(
        dateInputField.getAttribute("data-date-timestamp"),
        "DD/MM/YYYY"
      ));
    }

    return validData;
  };
  FORM_PAGE_VALIDATIONS[FORM_PAGE_KEYS.appointmentConfirmation] = () => {
    let validData = true;

    if (!FORM_PAGE_VALIDATIONS[FORM_PAGE_KEYS.personalData]()) {
      validData = false;
    }

    if (!FORM_PAGE_VALIDATIONS[FORM_PAGE_KEYS.selectCategory]()) {
      validData = false;
    }

    if (!FORM_PAGE_VALIDATIONS[FORM_PAGE_KEYS.chooseDatetime]()) {
      validData = false;
    }

    let formResumeErrorMessage = FORM_PAGES.appointmentConfirmation.querySelector(".section__form-item-error-message");

    if (!validData) {
      formResumeErrorMessage.innerText = "Some of required fields are empty, fill them.";
    } else {
      formResumeErrorMessage.innerText = "";
    }

    return validData;
  };
  backFormPageButton = document.querySelector(".section__button--back");
  nextFormPageButton = document.querySelector(".section__button--next");
  appointmentConfirmationSubmitButton = document.querySelector(".section__button--appointment-confirmation-submit-button");
  consultAppointmentsForm = document.querySelector(".section__form--consult-appointments");
  consultAppointmentsSubmitButton = consultAppointmentsForm.querySelector(".section__button--consult-appointments-submit-button");
  consultAppointmentResults = document.querySelector(".section__appointments-results");
  loader = document.querySelector(".loader");
  loaderHeading = loader.querySelector(".loader__heading");
  consultAppointmentTable = document.querySelector(".section__table--consult-appointments");
  consultAppointmentData = consultAppointmentTable.querySelector(".section__table-data");
  consultAppointmentNoDataMessage = consultAppointmentResults.querySelector(".section__no-results-message");
  calendarChooseADate = document.querySelector(".section__calendar--choose-a-date");
  courseInputField = document.querySelector(".section__form-item--course .section__form-input-field");
  asideNavigation = document.querySelector(".appointments__aside--navigation");
  openAsideNavigationBarIcon = document.querySelector(".appointments__header-option--open-aside-navigation");
  closeAsideNavigationBarIcon = document.querySelector(".appointments__aside-header-option--close-aside-navigation");
  requestAnAppointmentAsideAnchor = asideNavigation.querySelector(".appointments__navigation-anchor--request-an-appointment");
  consultAppointmentsAsideAnchor = asideNavigation.querySelector(".appointments__navigation-anchor--consult-appointments");

  // Initialize variables
  calendar = new Calendar(calendarChooseADate);
  calendar.render();

  // Add event listeners
  requestAnAppointmentAnchor.addEventListener("click", () => showSection(SECTION_CODENAMES.requestAnAppointment));
  consultAppointmentsAnchor.addEventListener("click", () => showSection(SECTION_CODENAMES.consultAppointments));
  requestAnAppointmentCTAButton.addEventListener("click", () => {
    window.location.hash = "#request-an-appointment";
    showSection(SECTION_CODENAMES.requestAnAppointment);
  });
  backFormPageButton.addEventListener("click", () => {
    backFormPage();
  });
  nextFormPageButton.addEventListener("click", () => {
    nextFormPage();
  });
  requestAnAppointmentForm.addEventListener("keypress", (event) => {
    let keyCode = 0 || event.keyCode || event.charCode;
    if (keyCode == 13) {
      event.preventDefault();
    }
  });
  requestAnAppointmentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (FORM_PAGE_VALIDATIONS[FORM_PAGE_KEYS.appointmentConfirmation]()) {
      requestAnAppointmentForm.submit();
    }
  });
  consultAppointmentsForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Email validation
    let emailInputField = consultAppointmentsForm.querySelector(".section__form-input-field");
    let emailErrorMessageElement = consultAppointmentsForm.querySelector(".section__form-item-error-message");

    emailInputField.value = emailInputField.value.trim();

    if (emailInputField.value == "") {
      emailErrorMessageElement.innerText = "This field cannot be empty.";
    } else if (!emailInputField.value.match(EMAIL_REGEX)) {
      emailErrorMessageElement.innerText = "Given email does not have a valid format. Example: john.doe@example.com";
    } else {
      emailErrorMessageElement.innerText = "";

      showLoader("Recovering data");
      ajax(
        "GET",
        ENDPOINT.consultAppointments.replace("{email-address}", emailInputField.value),
        true,
        {},
        (response) => {
          if (response.status == "ok") {
            if (response.data.length > 0) {
              // Delete consult appointment table data
              consultAppointmentData.innerHTML = "";

              for (let appointment of response.data) {
                // Define elements
                let tableRow = document.createElement("tr");
                let categoryCell = document.createElement("td");
                let dateCell = document.createElement("td");
                let timeCell = document.createElement("td");
                let statusCell = document.createElement("td");
                let statusSpan = document.createElement("td");

                // Set attributes
                tableRow.setAttribute("class", "section__table-row");
                categoryCell.setAttribute("class", "section__table-cell");
                dateCell.setAttribute("class", "section__table-cell");
                timeCell.setAttribute("class", "section__table-cell");
                statusCell.setAttribute("class", "section__table-cell");
                statusSpan.setAttribute("class", "section__appointment-status section__appointment-status--" + appointment.status);

                // Set text/HTML content
                categoryCell.innerText = appointment.category;
                dateCell.innerText = appointment.date;
                timeCell.innerText = appointment.time;
                statusSpan.innerText = appointment.status.replaceAll("_", " ").substring(0, 1).toUpperCase() + appointment.status.replaceAll("_", " ").substring(1);

                // Append child nodes
                consultAppointmentData.appendChild(tableRow);

                tableRow.appendChild(categoryCell);
                tableRow.appendChild(dateCell);
                tableRow.appendChild(timeCell);
                tableRow.appendChild(statusCell);

                statusCell.appendChild(statusSpan);
              }

              // Show table
              consultAppointmentNoDataMessage.classList.add(CSS_CLASS.hidden);
              consultAppointmentTable.classList.remove(CSS_CLASS.hidden);
            } else {
              // Set text
              consultAppointmentNoDataMessage.innerText = "There's not any appointment set to this email for the next days.";

              // Show no data message
              consultAppointmentNoDataMessage.classList.remove(CSS_CLASS.hidden);
              consultAppointmentNoDataMessage.classList.remove("section__no-results-message--critical");
              consultAppointmentTable.classList.add(CSS_CLASS.hidden);
            }
          } else {
            // Set text
            consultAppointmentNoDataMessage.innerText = response.error_msg;

            // Show response given error message
            consultAppointmentNoDataMessage.classList.remove(CSS_CLASS.hidden);
            consultAppointmentNoDataMessage.classList.add("section__no-results-message--critical");
            consultAppointmentTable.classList.add(CSS_CLASS.hidden);
          }

          // Show appointment result section
          consultAppointmentResults.classList.remove(CSS_CLASS.hidden);

          hideLoader();
        });
    }
  });
  courseInputField.addEventListener("change", () => {
    loadTurns(courseInputField.value);
  });
  openAsideNavigationBarIcon.addEventListener("click", () => {
    asideNavigation.classList.add(CSS_CLASS.active);
  });
  closeAsideNavigationBarIcon.addEventListener("click", () => {
    asideNavigation.classList.remove(CSS_CLASS.active);
  });
  requestAnAppointmentAsideAnchor.addEventListener("click", () => {
    showSection("request-an-appointment");

    // Close aside navigation
    closeAsideNavigationBarIcon.click();
  })
  consultAppointmentsAsideAnchor.addEventListener("click", () => {
    showSection("consult-appointments");

    // Close aside navigation
    closeAsideNavigationBarIcon.click();
  })

  // Show alert messages
  let urlParameters = new URLSearchParams(window.location.search);
  if (urlParameters.get("alert") != null) {
    window.alert(urlParameters.get("alert"));
    urlParameters.delete("alert");
    window.location.search = urlParameters.toString();
  }

  // Execute some methods
  resetAllActiveElements();
  resetAllErrorMessages();
  resetFormPageButtons();
  loadCourses();
  loadCategories();
  showSection(window.location.hash.substring(1));
  setActiveFormPage(FORM_PAGES_ORDER[currentFormPage]);
}

/**
 * Reset all active elements by deleting them 'active' class.
 * */
function resetAllActiveElements() {
  let activeElements = document.querySelectorAll("." + CSS_CLASS.active);

  for (let activeElement of activeElements) {
    activeElement.classList.remove(CSS_CLASS.active);
  }
}

/**
 * @param { string } sectionAlias
 */
function showSection(sectionAlias) {
  let sectionCodename = getSectionCodename(sectionAlias);
  setActiveElement(
    "section",
    (SECTION[sectionCodename] != null)
      ? SECTION[sectionCodename]
      : SECTION.landingPage
  );
}

/**
 * @param { String } sectionAlias
 * @return { String } Section codename
 */
function getSectionCodename(sectionAlias) {
  for (let sectionCodename in SECTION_CODENAMES) {
    if (SECTION_CODENAMES[sectionCodename] == sectionAlias) {
      return sectionCodename;
    }
  }

  return null;
}

/**
 * @param { String } type
 * @param { Element } element
 */
function setActiveElement(type, element) {
  if (!(element instanceof Element)) throw "Given element is not an Element instance. Given " + typeof (element);

  if (ACTIVE_ELEMENTS[type] != null) {
    unsetActiveElement(ACTIVE_ELEMENTS[type]);
  }

  ACTIVE_ELEMENTS[type] = element;
  element.classList.add(CSS_CLASS.active);
}

/**
 * @param { element } element
 */
function unsetActiveElement(element) {
  if (!(element instanceof Element)) throw "Given element is not an Element instance. Given " + typeof (element);
  element.classList.remove(CSS_CLASS.active);
}

function setActiveFormPage(formPageKey) {
  if (FORM_PAGES_NAVIGATION_BAR[formPageKey] == null) throw "Given form page key does not exist in form page navigation bar. Key: " + formPageKey;
  if (FORM_PAGES[formPageKey] == null) throw "Given form key does not exist in form pages. Key: " + formPageKey;

  let formPageNavbarOption = FORM_PAGES_NAVIGATION_BAR[formPageKey];
  let formPage = FORM_PAGES[formPageKey];

  if (ACTIVE_ELEMENTS["formPageKey"] != null) {
    unsetActiveFormPage(ACTIVE_ELEMENTS["formPageKey"]);
  }

  setActiveElement("formPageNavigationBarOption", FORM_PAGES_NAVIGATION_BAR[formPageKey]);
  setActiveElement("formPage", FORM_PAGES[formPageKey]);

  formPageNavbarOption.classList.add(CSS_CLASS.active);
  formPage.classList.add(CSS_CLASS.active);
}

function unsetActiveFormPage(formPageKey) {
  if (FORM_PAGES_NAVIGATION_BAR[formPageKey] == null) throw "Given form page key does not exist in form page navigation bar. Key: " + formPageKey;
  if (FORM_PAGES[formPageKey] == null) throw "Given form key does not exist in form pages. Key: " + formPageKey;


  unsetActiveElement("formPageNavigationBarOption", FORM_PAGES_NAVIGATION_BAR[formPageKey]);
  unsetActiveElement("formPage", FORM_PAGES[formPageKey]);
}

function nextFormPage() {
  if (
    currentFormPage < FORM_PAGES_ORDER.length - 1
    && FORM_PAGE_VALIDATIONS[FORM_PAGES_ORDER[currentFormPage]]()
  ) {
    currentFormPage++;

    if (currentFormPage == 2) {
      // [Botched] Simulate a click in current selected date to activate event behavior
      let calendarActiveDate = document.querySelector(".section__calendar-date--active");
      if (calendarActiveDate instanceof HTMLElement) {
        calendarActiveDate.click();
      }
    }

    setActiveFormPage(FORM_PAGE_KEYS[FORM_PAGES_ORDER[currentFormPage]]);
    resetFormPageButtons();
  }
}

function backFormPage() {
  if (currentFormPage > 0) {
    currentFormPage--;
    setActiveFormPage(FORM_PAGE_KEYS[FORM_PAGES_ORDER[currentFormPage]]);
    resetFormPageButtons();
  }
}

function resetFormPageButtons() {
  if (currentFormPage == 0) {
    backFormPageButton.classList.add(CSS_CLASS.hidden);
    appointmentConfirmationSubmitButton.classList.add(CSS_CLASS.hidden);
  } else if (currentFormPage > 0 && currentFormPage < FORM_PAGES_ORDER.length - 1) {
    backFormPageButton.classList.remove(CSS_CLASS.hidden);
    nextFormPageButton.classList.remove(CSS_CLASS.hidden);
    appointmentConfirmationSubmitButton.classList.add(CSS_CLASS.hidden);
  } else {
    nextFormPageButton.classList.add(CSS_CLASS.hidden);
    appointmentConfirmationSubmitButton.classList.remove(CSS_CLASS.hidden);
  }
}

function resetAllErrorMessages() {
  let errorMessages = document.querySelectorAll(".section__form-item-error-message");

  for (let errorMessage of errorMessages) {
    errorMessage.innerHTML = "";
  }
}

function updateAppointmentResumeItem(itemName, itemValue) {
  let formResume = document.querySelector(".section__form-resume");
  let item = formResume.querySelector(".section__form-item--" + itemName);
  let value = item.querySelector(".section__form-item-value");

  if (itemValue.trim() == "") {
    value.innerText = "(Empty)";
    value.classList.add("section__form-item-value--italic");
  } else {
    value.innerText = itemValue;
    value.classList.remove("section__form-item-value--italic");
  }
}

function showLoader(headingText) {
  if (headingText.trim() == "") throw "Heading text cannot be empty.";
  loaderHeading.innerText = headingText;
  setActiveElement("loader", loader);
}

function hideLoader() {
  unsetActiveElement(ACTIVE_ELEMENTS["loader"]);
}

/**
 * Make a request to some resource.
 * 
 * @param {"GET"|"POST"} httpMethod - Date format you want to have.
 * @param { string } url
 * @param { boolean } async
 * @param { json } data
 * @param { function } callback
 */
function ajax(httpMethod, url, async, data, callback) {
  let xhttp = new XMLHttpRequest();
  xhttp.addEventListener("readystatechange", () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      callback(JSON.parse(xhttp.response));
    }
  });
  xhttp.open(httpMethod, url, async);
  xhttp.send(data);
}


/**
 * Load appointment available courses by doing a request to the "COURSES" 
 * endpoint.
 */
function loadCourses() {
  ajax("GET", ENDPOINT.courses, true, {}, (response) => {
    // Check response status
    if (response.status == "ok") {
      // Link DOM elements
      let courseItem = document.querySelector(".section__form-item--course");
      let courseInputField = courseItem.querySelector(".section__form-input-field");

      // Reset current course options
      courseInputField.innerHTML = "";

      // Check if there are courses
      if (response.data.length > 0) {
        // Set the default option
        let option = document.createElement("option");
        option.setAttribute("value", "");

        option.selected = true;
        option.disabled = true;
        option.hidden = true;

        option.innerText = "-- Choose a course --";
        courseInputField.appendChild(option);

        let coursesFound = [];

        // Generate course options
        response.data.forEach(course => {
          if (coursesFound.indexOf(course.name) == -1) {
            // Define DOM elements
            let option = document.createElement("option");

            // Set attributes
            option.setAttribute("value", course.uuid);

            // Set text/HTML content
            option.innerText = course.name;

            // Append child nodes
            courseInputField.appendChild(option);
            coursesFound.push(course.name);
          }
        });
      }
    }
  });
}

/**
 * Load appointment available turns by doing a request to the "COURSE_TURNS" 
 * endpoint.
 * 
 * @param { String } courseId - The ID of a course.
 */
function loadTurns(courseId) {
  if (!(typeof (courseId) == "string")) throw "Course IDm must be a 'String'. '" + typeof (courseId) + "' given";

  console.log("Petición nueva, ID: " + ((courseId == "") ? "(Empty)" : courseId));

  ajax("GET", ENDPOINT.courseTurns.replace("{course-uuid}", courseId), true, {}, (response) => {
    // Check response status
    if (response.status == "ok") {
      // Link DOM elements
      let turnItem = document.querySelector(".section__form-item--turn");
      let turnInputField = turnItem.querySelector(".section__form-input-field");

      // Reset current turn options
      turnInputField.innerHTML = "";

      // Define the default option
      let defaultOption = document.createElement("option");
      defaultOption.setAttribute("value", "");

      defaultOption.selected = true;
      defaultOption.disabled = true;
      defaultOption.hidden = true;

      defaultOption.innerText = "-- Choose a turn --";
      turnInputField.appendChild(defaultOption);

      // Check if there are course turns
      if (response.data.length > 0) {
        // Generate course turns options
        response.data.forEach(turn => {
          // Define DOM elements
          let option = document.createElement("option");

          // Set attributes
          option.setAttribute("value", turn.uuid);
          option.selected = (response.data.length == 1);

          // Set text/HTML content
          option.innerText = turn.shift.substring(0, 1).toUpperCase() + turn.shift.substring(1);

          // Append child nodes
          turnInputField.appendChild(option);
        });
      }
    }
  });
}

/**
 * Load appointment available categories by doing a request to the "CATEGORIES" 
 * endpoint.
 */
function loadCategories() {
  ajax("GET", ENDPOINT.categories, true, {}, (response) => {
    // Check response status
    if (response.status == "ok") {
      // Link DOM elements
      let categoryItem = document.querySelector(".section__form-item--category");
      let categoryInputField = categoryItem.querySelector(".section__form-input-field");

      // Reset current category options
      categoryInputField.innerHTML = "";

      // Define form default option
      let defaultOption = document.createElement("option");
      defaultOption.setAttribute("value", "");

      defaultOption.selected = true;
      defaultOption.disabled = true;
      defaultOption.hidden = true;

      defaultOption.innerText = "-- Choose a category --";
      categoryInputField.appendChild(defaultOption);

      // Check if there are categories
      if (response.data.length > 0) {
        // Load new category options
        response.data.forEach(category => {
          // Define DOM elements
          let option = document.createElement("option");

          // Set attributes
          option.setAttribute("value", category.uuid);
          option.selected = (response.data.length == 1);

          // Set text/HTML content
          option.innerText = category.name;

          // Append child nodes
          categoryInputField.appendChild(option);
        });
      }
    }
  });
}