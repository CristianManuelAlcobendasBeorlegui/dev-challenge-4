<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Digital Space</title>
  <link rel="icon" href="{{ asset('img/digital-space-favicon.svg') }}" type="image/svg">
  <link rel="stylesheet" href="{{ asset('css/style.css')}}">
  <link rel="stylesheet" href="{{ asset('css/tabler-icons-3.24.0/webfont/tabler-icons.min.css') }}">
  <script src="{{ asset('js/Calendar.js') }}"></script>
  <script src="{{ asset('js/script.js') }}"></script>
</head>

<body class="appointments appointments--guest-view">
  <header class="appointments__header">
    <div class="appointments__header-options">
      <i class="appointments__header-option appointments__header-option--open-aside-navigation ti ti-menu-2" title="Open navigation bar"></i>
    </div>
    <img class="appointments__header-logo" src="{{ asset('img/digital-space-logo.svg') }}" alt="Digital Space logo">
    <nav class="appointments__navigation-bar appointments__navigation-bar--header">
      <ul class="appointments__navigation-options">
        <li class="appointments__navigation-option">
          <a class="appointments__navigation-anchor appointments__navigation-anchor--request-an-appointment"
            href="#request-an-appointment">Request an appointment</a>
        </li>
        <li class="appointments__navigation-option">
          <a class="appointments__navigation-anchor appointments__navigation-anchor--consult-appointments"
            href="#consult-appointments">Consult appointments</a>
        </li>
      </ul>
    </nav>
  </header>
  <aside class="appointments__aside appointments__aside--navigation">
    <div class="appointments__aside-content">
      <div class="appointments__aside-header">
        <!-- <h1 class="appointments__aside-heading">Digital Space</h1> -->
        <img class="appointments__aside-header-logo" src="{{ asset('img/digital-space-logo.svg') }}" alt="Digital Space logo">
        <div class="appointments__aside-header-options">
          <i class="appointments__aside-header-option appointments__aside-header-option--close-aside-navigation ti ti-x" title="Close navigation bar"></i>
        </div>
      </div>
      <nav class="appointments__navigation-bar appointments__navigation-bar--aside">
        <ul class="appointments__navigation-options">
          <li class="appointments__navigation-option">
            <a class="appointments__navigation-anchor appointments__navigation-anchor--request-an-appointment"
              href="#request-an-appointment">
              <i class="appointments__navigation-anchor-icon ti ti-list-details"></i>
              <span class="appointments__navigation-anchor-text">Request an appointment</span>
            </a>
          </li>
          <li class="appointments__navigation-option">
            <a class="appointments__navigation-anchor appointments__navigation-anchor--consult-appointments"
              href="#consult-appointments">
              <i class="appointments__navigation-anchor-icon ti ti-search"></i>
              <span class="appointments__navigation-anchor-text">Consult appointments</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
  <main class="appointments__main-content">
    <section class="appointments__section section section--landing-page">
      <main class="section__main-content">
        <h1 class="section__heading">Welcome to Digital Space!!</h1>
        <p class="section__description">
          In the digital space, in front of the school cafeteria, you will find teachers who will help you to solve any
          problems you may have with your computer. However, it is <span class="featured-word">NOT possible to go there
            without an appointment</span>.
        </p>
        <p class="section__description">
          Students <span class="featured-word">CANNOT LOSE CLASSES to go to the digital space</span>, so morning
          students must make an appointment at the
          digital space in the afternoon and afternoon students in the morning. The only exception is 1st and 2nd year
          ESO students who can go to the digital space in the morning, <span class="featured-word">but they must always
            make an appointment
            beforehand</span>.
        </p>
        <button class="section__cta-button">Request an appointment</button>
      </main>
    </section>
    <section class="appointments__section section section--request-an-appointment">
      <main class="section__main-content">
        <h1 class="section__heading">Request an appointment</h1>
        <p class="section__description">
          From here you can book an appointment to use the services of the Digital Space, make sure that the contact
          details you add are correct.
        </p>
        <form class="section__form section__form--request-an-appointment" name="request-an-appointment" action="/api/appointments/create"
          method="POST">
          <nav class="section__form-pages-navigation-bar">
            <ol class="section__form-page-items">
              <li class="section__form-page-item section__form-page-item--personal-data active">Personal data</li>
              <li class="section__form-page-item section__form-page-item--select-a-category">Select a category</li>
              <li class="section__form-page-item section__form-page-item--choose-a-datetime">Choose a datetime</li>
              <li class="section__form-page-item section__form-page-item--appointment-confirmation">Confirmation</li>
            </ol>
          </nav>
          <div class="section__form-pages">
            <div class="section__form-page section__form-page--personal-data">
              <div class="section__form-item-group section__form-item-group--2">
                <div class="section__form-item section__form-item--first-name">
                  <label class="section__form-item-label" for="request-an-appointment--first-name">
                    <i class="section__form-item-icon ti ti-user"></i>
                    <span class="section__form-item-name">Name</span>
                  </label>
                  <div class="section__form-input-box">
                    <input class="section__form-input-field" type="text" name="first_name"
                      id="request-an-appointment--first-name">
                  </div>
                  <span class="section__form-item-error-message"><i class="ti ti-circle-x"></i>Some error</span>
                </div>
                <div class="section__form-item section__form-item--last-name">
                  <label class="section__form-item-label" for="request-an-appointment--last-name">
                    <i class="section__form-item-icon"></i>
                    <span class="section__form-item-name">Last name</span>
                  </label>
                  <div class="section__form-input-box">
                    <input class="section__form-input-field" type="text" name="last_name"
                      id="request-an-appointment--last-name">
                  </div>
                  <span class="section__form-item-error-message"></span>
                </div>
              </div>
              <div class="section__form-item-group">
                <div class="section__form-item section__form-item--email">
                  <label class="section__form-item-label" for="request-an-appointment--email">
                    <i class="section__form-item-icon ti ti-mail"></i>
                    <span class="section__form-item-name">Email</span>
                  </label>
                  <div class="section__form-input-box">
                    <input class="section__form-input-field" type="text" name="email"
                      id="request-an-appointment--email">
                  </div>
                  <span class="section__form-item-error-message"></span>
                </div>
              </div>
              <div class="section__form-item-group section__form-item-group--2">
                <div class="section__form-item section__form-item--course">
                  <label class="section__form-item-label" for="request-an-appointment--course">
                    <i class="section__form-item-icon ti ti-school"></i>
                    <span class="section__form-item-name">Course</span>
                  </label>
                  <div class="section__form-input-box">
                    <select class="section__form-input-field" name="course" id="request-an-appointment--course">
                      <option value="" selected hidden disabled>-- Choose a course --</option>
                    </select>
                  </div>
                  <span class="section__form-item-error-message"></span>
                </div>
                <div class="section__form-item section__form-item--turn">
                  <label class="section__form-item-label" for="request-an-appointment--turn">
                    <i class="section__form-item-icon ti ti-sun-moon"></i>
                    <span class="section__form-item-name">Turn</span>
                  </label>
                  <div class="section__form-input-box">
                    <select class="section__form-input-field" name="turn" id="request-an-appointment--turn">
                      <option value="" selected hidden disabled>-- Choose a turn --</option>
                    </select>
                  </div>
                  <div class="section__form-item-error-message"></div>
                </div>
              </div>
            </div>
            <div class="section__form-page section__form-page--select-a-category">
              <div class="section__form-item-group">
                <div class="section__form-item section__form-item--category">
                  <label class="section__form-item-label" for="request-an-appointment--category">
                    <i class="section__form-item-icon ti ti-category"></i>
                    <span class="section__form-item-name">Category</span>
                  </label>
                  <div class="section__form-input-box">
                    <select class="section__form-input-field" name="category" id="request-an-appointment--category">
                      <option value="" selected disabled hidden>-- Select a category --</option>
                    </select>
                  </div>
                  <span class="section__form-item-error-message"></span>
                </div>
              </div>
              <div class="section__form-item-group">
                <div class="section__form-item section__form-item--observations">
                  <label class="section__form-item-label" for="request-an-appointment--observations">
                    <i class="section__form-item-icon ti ti-notes"></i>
                    <span class="section__form-item-name">Observations</span>
                  </label>
                  <div class="section__form-input-box">
                    <textarea class="section__form-input-field section__form-input-field--textarea" name="observations"
                      id="request-an-appointment--observations"></textarea>
                  </div>
                  <span class="section__form-item-error-message"></span>
                </div>
              </div>
            </div>
            <div class="section__form-page section__form-page--choose-a-datetime">
              <div class="section__form-item-group">
                <div class="section__form-item section__form-item--date">
                  <label class="section__form-item-label">
                    <i class="section__form-item-icon ti ti-calendar-week"></i>
                    <span class="section__form-item-name">Date</span>
                  </label>
                  <div class="section__calendar section__calendar--choose-a-date" ref="calendar">
                    <!-- <div class="section__calendar-header">
                      <span class="section__calendar-current-date">Some month</span>
                      <div class="section__calendar-navigation-options">
                        <i class="ti ti-chevron-left section__calendar-navigation-option section__calendar-navigation-option--previous-month" title="Previous month"></i>
                        <i class="ti ti-chevron-right section__calendar-navigation-option section__calendar-navigation-option--next-month" title="Next month"></i>
                      </div>
                    </div>
                    <div class="section__calendar-body">
                      <div class="section__calendar-row section__calendar-row--weekdays">
                        <span class="section__calendar-weekday">Sun</span>
                        <span class="section__calendar-weekday">Mon</span>
                        <span class="section__calendar-weekday">Tue</span>
                        <span class="section__calendar-weekday">Wed</span>
                        <span class="section__calendar-weekday">Thu</span>
                        <span class="section__calendar-weekday">Fri</span>
                        <span class="section__calendar-weekday">Sat</span>
                      </div>
                      <div class="section__calendar-row section__calendar-row--dates"></div>
                    </div> -->
                  </div>
                  <input class="section__form-input-field section__form-item-input-field--date hidden"
                    value="2025-01-12" type="date" name="date" id="request-an-appointment--date">
                  <span class="section__form-item-error-message"></span>
                </div>
              </div>
              <div class="section__form-item-group">
                <div class="section__form-item section__form-item--time">
                  <label class="section__form-item-label">
                    <i class="section__form-item-icon ti ti-clock-hour-3"></i>
                    <span class="section__form-item-name">Time</span>
                  </label>
                  <div class="section__input-radio-options">
                    <span class="section__input-radio-no-time-options">No hours available</span>
                    <!-- <div class="section__form-input-box section__form-input-box--time-radio">
                      <input class="section__form-input-field section__form-input-field--radio hidden" data-time-label="17:00" type="radio"
                        name="time" id="request-an-appointment--time-20250110170000">
                      <label class="section__form-radio-label" for="request-an-appointment--time-20250110170000">17:00</label>
                    </div>
                    <div class="section__form-input-box section__form-input-box--time-radio">
                      <input class="section__form-input-field section__form-input-field--radio hidden" data-time-label="18:00" type="radio"
                        name="time" id="request-an-appointment--time-20250110180000">
                      <label class="section__form-radio-label" for="request-an-appointment--time-20250110180000">18:00</label>
                    </div>
                    <div class="section__form-input-box section__form-input-box--time-radio">
                      <input class="section__form-input-field section__form-input-field--radio hidden" type="radio"
                        name="time" id="request-an-appointment--time-20250110180000">
                      <label class="section__form-radio-label" for="request-an-appointment--time-20250110180000">18:00</label>
                    </div>
                    <div class="section__form-input-box section__form-input-box--time-radio">
                      <input class="section__form-input-field section__form-input-field--radio hidden" type="radio"
                        name="time" id="request-an-appointment--time-20250110180000">
                      <label class="section__form-radio-label" for="request-an-appointment--time-20250110180000">18:00</label>
                    </div>
                    <div class="section__form-input-box section__form-input-box--time-radio">
                      <input class="section__form-input-field section__form-input-field--radio hidden" type="radio"
                        name="time" id="request-an-appointment--time-20250110180000">
                      <label class="section__form-radio-label" for="request-an-appointment--time-20250110180000">18:00</label>
                    </div>
                    <div class="section__form-input-box section__form-input-box--time-radio">
                      <input class="section__form-input-field section__form-input-field--radio hidden" type="radio"
                        name="time" id="request-an-appointment--time-20250110180000">
                      <label class="section__form-radio-label" for="request-an-appointment--time-20250110180000">18:00</label>
                    </div>
                    <div class="section__form-input-box section__form-input-box--time-radio">
                      <input class="section__form-input-field section__form-input-field--radio hidden" type="radio"
                        name="time" id="request-an-appointment--time-20250110180000">
                      <label class="section__form-radio-label" for="request-an-appointment--time-20250110180000">18:00</label>
                    </div> -->
                  </div>
                  <span class="section__form-item-error-message"></span>
                </div>
              </div>
            </div>
            <div class="section__form-page section__form-page--appointment-confirmation active">
              <p class="section__form-page-description">
                Check all data provided and confirm the appointment.
              </p>
              <div class="section__form-resume">
                <div class="section__form-item section__form-item--first-name">
                  <div class="section__form-column">
                    <span class="section__form-item-label">
                      <i class="section__form-item-icon ti ti-user"></i>
                      <span class="section__form-item-name">Full name</span>
                    </span>
                  </div>
                  <div class="section__form-column">
                    <span class="section__form-item-value">(Empty)</span>
                  </div>
                </div>
                <div class="section__form-item section__form-item--email">
                  <div class="section__form-column">
                    <span class="section__form-item-label">
                      <i class="section__form-item-icon ti ti-mail"></i>
                      <span class="section__form-item-name">Email</span>
                    </span>
                  </div>
                  <div class="section__form-column">
                    <span class="section__form-item-value">(Empty)</span>
                  </div>
                </div>
                <div class="section__form-item section__form-item--course">
                  <div class="section__form-column">
                    <span class="section__form-item-label">
                      <i class="section__form-item-icon ti ti-school"></i>
                      <span class="section__form-item-name">Course</span>
                    </span>
                  </div>
                  <div class="section__form-column">
                    <span class="section__form-item-value">(Empty)</span>
                  </div>
                </div>
                <div class="section__form-item section__form-item--category">
                  <div class="section__form-column">
                    <span class="section__form-item-label">
                      <i class="section__form-item-icon ti ti-category"></i>
                      <span class="section__form-item-name">Category</span>
                    </span>
                  </div>
                  <div class="section__form-column">
                    <span class="section__form-item-value">(Empty)</span>
                  </div>
                </div>
                <div class="section__form-item section__form-item--date">
                  <div class="section__form-column">
                    <span class="section__form-item-label">
                      <i class="section__form-item-icon ti ti-calendar-week"></i>
                      <span class="section__form-item-name">Date</span>
                    </span>
                  </div>
                  <div class="section__form-column">
                    <span class="section__form-item-value">(Empty)</span>
                  </div>
                </div>
                <div class="section__form-item section__form-item--time">
                  <div class="section__form-column">
                    <span class="section__form-item-label">
                      <i class="section__form-item-icon ti ti-clock-hour-3"></i>
                      <span class="section__form-item-name">Time</span>
                    </span>
                  </div>
                  <div class="section__form-column">
                    <span class="section__form-item-value">(Empty)</span>
                  </div>
                </div>
              </div>
              <span class="section__form-item-error-message"></span>
            </div>
          </div>
          <div class="section__form-pages-options">
            <button type="button" class="section__button section__button--back">
              <i class="section__button-icon ti ti-math-lower"></i>
              <span class="section__button-text">Back</span>
            </button>
            <button type="button" class="section__button section__button--next">
              <i class="section__button-icon ti ti-math-greater"></i>
              <span class="section__button-text">Next</span>
            </button>
            <button type="submit"
              class="section__button section__button--primary section__button--appointment-confirmation-submit-button">Confirm
              appointment</button>
          </div>
        </form>
      </main>
    </section>
    <section class="section section--consult-appointments active">
      <main class="section__main-content">
        <h1 class="section__heading">Consult appointments</h1>
        <p class="section__description">
          Want to know your next appointments? Enter your email address and below will
          appear your active appointments.
        </p>
        <form class="section__form section__form--consult-appointments" name="consult-appointments" action="" method="">
          <div class="section__form-input-group section__form-input-group--search-box">
            <div class="section__form-item section__form-item--email">
              <div class="section__form-input-box">
                <label class="section__form-item-label section__form-item-label--inside-input-box"
                  for="consult-appointments--email">
                  <i class="section__form-item-icon ti ti-mail"></i>
                  <span class="section__form-item-name">Email</span>
                </label>
                <input class="section__form-input-field" type="text" name="email" id="consult-appointments--email"
                  required>
              </div>
              <span class="section__form-item-error-message"></span>
            </div>
            <div class="section__form-options">
              <button type="submit"
                class="section__button section__button--primary section__button--consult-appointments-submit-button"
                type="submit">
                <i class="section__button-icon ti ti-search"></i>
                <span class="section__button-text">Search</span>
              </button>
            </div>
          </div>
        </form>
        <div class="section__appointments-results hidden">
          <h2 class="section__heading section__heading--h2">Appointments</h2>
          <div class="section__results section__results--user-appointments">
            <span class="section__no-results-message section__no-results-message--critical hidden">There is no active
              appointment to this email account.</span>
            <table class="section__table section__table--consult-appointments hidden">
              <thead class="section__table-header">
                <tr class="section__table-row">
                  <th class="section__table-heading">Category</th>
                  <th class="section__table-heading">Date</th>
                  <th class="section__table-heading">Time</th>
                  <th class="section__table-heading">Status</th>
                </tr>
              </thead>
              <tbody class="section__table-data">
                <tr class="section__table-row">
                  <td class="section__table-cell">???</td>
                  <td class="section__table-cell">???</td>
                  <td class="section__table-cell">???</td>
                  <td class="section__table-cell">
                    <span class="section__appointment-status section__appointment-status--canceled">Canceled</span>
                  </td>
                </tr>
                <tr class="section__table-row">
                  <td class="section__table-cell">???</td>
                  <td class="section__table-cell">???</td>
                  <td class="section__table-cell">???</td>
                  <td class="section__table-cell">
                    <span class="section__appointment-status section__appointment-status--pending">Pending email
                      confirmation</span>
                  </td>
                </tr>
                <tr class="section__table-row">
                  <td class="section__table-cell">???</td>
                  <td class="section__table-cell">???</td>
                  <td class="section__table-cell">???</td>
                  <td class="section__table-cell">
                    <span class="section__appointment-status section__appointment-status--confirmed">Confirmed</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </section>
  </main>
  <footer class="appointments__footer">
    Digital Space
  </footer>
  <div class="loader active">
    <div class="loader__circle"></div>
    <h1 class="loader__heading">Loading content</h1>
  </div>
</body>

</html>