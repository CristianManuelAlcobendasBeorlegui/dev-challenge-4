<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Digital Space - Admin Dashboard</title>
  <link rel="icon" href="{{ asset('img/digital-space-favicon.svg') }}" type="image/svg">
  <link rel="stylesheet" href="{{ asset('css/tabler-icons-3.24.0/webfont/tabler-icons.min.css') }}">
  <link rel="stylesheet" href="{{ asset('css/admin-dashboard-style.css') }}">
  <script src="{{ asset('js/Calendar.js') }}"></script>
  <script src="{{ asset('js/admin-dashboard-script.js') }}"></script>
</head>

<body class="appointments appointments--admin-dashboard-view">
  <header class="appointments__header">
    <div class="appointments__header-options">
      <div class="appointments__header-option appointments__header-option--user-profile">
        <img class="appointments__user-avatar" src="{{ asset('img/user-avatar.png') }}" alt="User avatar">
        <span class="appointments__user-name">{{ Auth::user()->name }}</span>
        <!-- <div class="appointments__user-options">
          <div class="appointments__user-option appointments__user-option--logout">
            <a class="appointments__user-option-anchor" href="{{ env('APP_URL') }}" title="Logout">
              <i class="appointments__user-option-icon ti ti-logout"></i>
            </a>
          </div>
        </div> -->
      </div>
    </div>
  </header>
  <aside class="appointments__aside appointments__aside--navigation">
    <div class="appointments__aside-header">
      <!-- <h1 class="appointments__aside-heading">Digital Space</h1> -->
       <img class="appointments__aside-header-logo" src="{{ asset('img/digital-space-logo.svg') }}" alt="Digital Space logo">
      <div class="appointments__aside-header-options">
        <i
          class="appointments__aside-header-option appointments__aside-header-option--close-aside-navigation ti ti-x"></i>
      </div>
    </div>
    <nav class="appointments__aside-navigation-bar">
      <div class="appointments__aside-navigation-items-group">
        <label class="appointments__aside-navigation-items-group-name">General data</label>
        <div class="appointments__aside-navigation-items">
          <div class="appointments__aside-navigation-item appointments__aside-navigation-item--dashboard active">
            <a class="appointments__aside-navigation-anchor" href="#dashboard">
              <i class="appointments__aside-navigation-item-icon ti ti-dashboard"></i>
              <span class="appointments__aside-navigation-item-name">Dashboard</span>
            </a>
          </div>
        </div>
      </div>
      <div class="appointments__aside-navigation-items-group appointments__aside-navigation-group--management">
        <label class="appointments__aside-navigation-items-group-name">Management</label>
        <div class="appointments__aside-navigation-items">
          <div class="appointments__aside-navigation-items">
            <div class="appointments__aside-navigation-item appointments__aside-navigation-item--dates-and-times">
              <a class="appointments__aside-navigation-anchor" href="#dates-and-times">
                <i class="appointments__aside-navigation-item-icon ti ti-calendar-week"></i>
                <span class="appointments__aside-navigation-item-name">Dates and times</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </aside>
  <main class="appointments__main-content">
    <section class="section section--dashboard active" id="dashboard">
      <h1 class="section__heading">Dashboard <i class="appointments__refresh-appointments-general-data ti ti-refresh" title="Refresh"></i></h1>
      <div class="section__dashboard-items">
        <div class="section__dashboard-item section__dashboard-item--general-appointments-data">
          <h2 class="section__heading section__heading--h2">Appointments</h2>
          <div class="section__general-appointments-data-items">
            <div
              class="section__general-appointments-data-item section__general-appointments-data-item--confirmed-appointments-for-today">
              <i class="section__general-appointments-data-item-icon ti ti-calendar-check"></i>
              <label class="section__general-appointments-data-item-name">Confirmed (Today)</label>
              <span class="section__general-appointments-data-item-value">0</span>
            </div>
            <div
              class="section__general-appointments-data-item section__general-appointments-data-item--pending-appointments-for-today">
              <i class="section__general-appointments-data-item-icon ti ti-calendar-clock"></i>
              <label class="section__general-appointments-data-item-name">Pending (Today)</label>
              <span class="section__general-appointments-data-item-value">0</span>
            </div>
            <div
              class="section__general-appointments-data-item section__general-appointments-data-item--canceled-appointments-for-today">
              <i class="section__general-appointments-data-item-icon ti ti-calendar-x"></i>
              <label class="section__general-appointments-data-item-name">Canceled (Today)</label>
              <span class="section__general-appointments-data-item-value">0</span>
            </div>
          </div>
        </div>
        <div class="section__dashboard-item section__dashboard-item--calendar">
          <h2 class="section__heading section__heading--h2">Calendar</h2>
          <div class="section__dashboard-calendar">
            <!-- Here goes a JS rendered calendar -->
          </div>
        </div>
        <div class="section__dashboard-item section__dashboard-item--appointments-for-today">
          <h2 class="section__heading section__heading--h2">Appointments for today</h2>
          <div class="section__appointments-for-today">
            <div class="section__appointments-for-today-results">
              <table class="section__table section__table--appointments-for-today">
                <thead class="section__table-header">
                  <tr class="section__table-row">
                    <th class="section__table-cell section__table-cell--heading">Date</th>
                    <th class="section__table-cell section__table-cell--heading">Time</th>
                    <th class="section__table-cell section__table-cell--heading">Category</th>
                    <th class="section__table-cell section__table-cell--heading">Actions</th>
                  </tr>
                </thead>
                <tbody class="section__table-data">
                  <tr class="section__table-row">
                    <td class="section__table-cell">01/01/2025</td>
                    <td class="section__table-cell">11:00</td>
                    <td class="section__table-cell">Others</td>
                    <td class="section__table-cell">
                      <div class="section__table-cell-options">
                        <i class="section__table-cell-option section__table-cell-option--see-details ti ti-eye"
                          title="See details"></i>
                      </div>
                    </td>
                  </tr>


                  <tr class="section__table-row">
                    <td class="section__table-cell">01/01/2025</td>
                    <td class="section__table-cell">11:00</td>
                    <td class="section__table-cell">Others</td>
                    <td class="section__table-cell">
                      <div class="section__table-cell-options">
                        <i class="section__table-cell-option section__table-cell-option--see-details ti ti-eye"
                          title="See details"></i>
                      </div>
                    </td>
                  </tr>
                  <tr class="section__table-row">
                    <td class="section__table-cell">01/01/2025</td>
                    <td class="section__table-cell">11:00</td>
                    <td class="section__table-cell">Others</td>
                    <td class="section__table-cell">
                      <div class="section__table-cell-options">
                        <i class="section__table-cell-option section__table-cell-option--see-details ti ti-eye"
                          title="See details"></i>
                      </div>
                    </td>
                  </tr>
                  <tr class="section__table-row">
                    <td class="section__table-cell">01/01/2025</td>
                    <td class="section__table-cell">11:00</td>
                    <td class="section__table-cell">Others</td>
                    <td class="section__table-cell">
                      <div class="section__table-cell-options">
                        <i class="section__table-cell-option section__table-cell-option--see-details ti ti-eye"
                          title="See details"></i>
                      </div>
                    </td>
                  </tr>
                  <tr class="section__table-row">
                    <td class="section__table-cell">01/01/2025</td>
                    <td class="section__table-cell">11:00</td>
                    <td class="section__table-cell">Others</td>
                    <td class="section__table-cell">
                      <div class="section__table-cell-options">
                        <i class="section__table-cell-option section__table-cell-option--see-details ti ti-eye"
                          title="See details"></i>
                      </div>
                    </td>
                  </tr>
                  <tr class="section__table-row">
                    <td class="section__table-cell">01/01/2025</td>
                    <td class="section__table-cell">11:00</td>
                    <td class="section__table-cell">Others</td>
                    <td class="section__table-cell">
                      <div class="section__table-cell-options">
                        <i class="section__table-cell-option section__table-cell-option--see-details ti ti-eye"
                          title="See details"></i>
                      </div>
                    </td>
                  </tr>
                  <tr class="section__table-row">
                    <td class="section__table-cell">01/01/2025</td>
                    <td class="section__table-cell">11:00</td>
                    <td class="section__table-cell">Others</td>
                    <td class="section__table-cell">
                      <div class="section__table-cell-options">
                        <i class="section__table-cell-option section__table-cell-option--see-details ti ti-eye"
                          title="See details"></i>
                      </div>
                    </td>
                  </tr>
                  <tr class="section__table-row">
                    <td class="section__table-cell">01/01/2025</td>
                    <td class="section__table-cell">11:00</td>
                    <td class="section__table-cell">Others</td>
                    <td class="section__table-cell">
                      <div class="section__table-cell-options">
                        <i class="section__table-cell-option section__table-cell-option--see-details ti ti-eye"
                          title="See details"></i>
                      </div>
                    </td>
                  </tr>
                  <tr class="section__table-row">
                    <td class="section__table-cell">01/01/2025</td>
                    <td class="section__table-cell">11:00</td>
                    <td class="section__table-cell">Others</td>
                    <td class="section__table-cell">
                      <div class="section__table-cell-options">
                        <i class="section__table-cell-option section__table-cell-option--see-details ti ti-eye"
                          title="See details"></i>
                      </div>
                    </td>
                  </tr>
                  <tr class="section__table-row">
                    <td class="section__table-cell">01/01/2025</td>
                    <td class="section__table-cell">11:00</td>
                    <td class="section__table-cell">Others</td>
                    <td class="section__table-cell">
                      <div class="section__table-cell-options">
                        <i class="section__table-cell-option section__table-cell-option--see-details ti ti-eye"
                          title="See details"></i>
                      </div>
                    </td>
                  </tr>
                  <tr class="section__table-row">
                    <td class="section__table-cell">01/01/2025</td>
                    <td class="section__table-cell">11:00</td>
                    <td class="section__table-cell">Others</td>
                    <td class="section__table-cell">
                      <div class="section__table-cell-options">
                        <i class="section__table-cell-option section__table-cell-option--see-details ti ti-eye"
                          title="See details"></i>
                      </div>
                    </td>
                  </tr>
                  <tr class="section__table-row">
                    <td class="section__table-cell">01/01/2025</td>
                    <td class="section__table-cell">11:00</td>
                    <td class="section__table-cell">Others</td>
                    <td class="section__table-cell">
                      <div class="section__table-cell-options">
                        <i class="section__table-cell-option section__table-cell-option--see-details ti ti-eye"
                          title="See details"></i>
                      </div>
                    </td>
                  </tr>
                  <tr class="section__table-row">
                    <td class="section__table-cell">01/01/2025</td>
                    <td class="section__table-cell">11:00</td>
                    <td class="section__table-cell">Others</td>
                    <td class="section__table-cell">
                      <div class="section__table-cell-options">
                        <i class="section__table-cell-option section__table-cell-option--see-details ti ti-eye"
                          title="See details"></i>
                      </div>
                    </td>
                  </tr>
                  <tr class="section__table-row">
                    <td class="section__table-cell">01/01/2025</td>
                    <td class="section__table-cell">11:00</td>
                    <td class="section__table-cell">Others</td>
                    <td class="section__table-cell">
                      <div class="section__table-cell-options">
                        <i class="section__table-cell-option section__table-cell-option--see-details ti ti-eye"
                          title="See details"></i>
                      </div>
                    </td>
                  </tr>
                  <tr class="section__table-row">
                    <td class="section__table-cell">01/01/2025</td>
                    <td class="section__table-cell">11:00</td>
                    <td class="section__table-cell">Others</td>
                    <td class="section__table-cell">
                      <div class="section__table-cell-options">
                        <i class="section__table-cell-option section__table-cell-option--see-details ti ti-eye"
                          title="See details"></i>
                      </div>
                    </td>
                  </tr>



                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section section--dates-and-times" id="dates-and-times">
      <h1 class="section__heading">Dates and times</h1>
      <p class="section__description">
        Choose a date on the calendar and then select all the times you want to be
        available on that day to make an appointment.
      </p>
      <div class="alert alert--info">
        <h2 class="alert__header">
          <i class="alert__header-icon ti ti-info-circle"></i>
          <span class="alert__header-text">Info</span>
        </h2>
        <p class="alert__description">
        <div>
          Time slots with <span class="featured-word">blue border</span> means that hour can be selected to request
          an appointment.
        </div>
        <div>
          Time slots with <span class="bold orange">orange border</span> means that hour is locked because an
          appointment has been requested.
        </div>
        <div>
          Time slots <span class="bold underline">without border</span> means that hour cannot be selected to
          request an appointment.
        </div>
        </p>
      </div>
      <form class="section__form section__form--dates-and-times" action="/api/timestamps/update" method="POST">
        <div class="section__form-item section__form-item--date">
          <label class="section__form-item-label">
            <i class="section__form-item-icon ti ti-calendar-week"></i>
            <span class="section__form-item-name">Date</span>
          </label>
          <div class="section__calendar">
            <!-- Here goes a JS rendered calendar -->
          </div>
          <span class="section__form-item-error-message"></span>
          <input class="section__form-input-field hidden" type="date" name="date" id="dates-and-times--date">
        </div>
        <div class="section__form-item section__form-item--time">
          <label class="section__form-item-label">
            <i class="section__form-item-icon ti ti-clock"></i>
            <span class="section__form-item-name">Time</span>
          </label>
          <span class="section__form-item-error-message"></span>
          <div class="section__form-times">
            <!-- <div class="section__form-time-items-group">
              <div class="section__form-time-items-group-header">
                <input class="section__form-input-field section__form-input-field--checkbox" type="checkbox" id="dates-and-times--select-all-8-hours-range">
                <label class="section__form-time-item-group-label" for="dates-and-times--select-all-8-hours-range">
                  08:00
                </label>
              </div>
              <div class="section__form-time-items">
                <div class="section__form-time-item section__form-time-item--enabled">
                  <label class="section__form-time-item-label" for="time--120000">08:00</label>
                  <input class="section__form-input-field section__form-input-field--checkbox hidden" type="checkbox"
                    name="times[]" id="time--120000">
                </div>
                <div class="section__form-time-item section__form-time-item--locked">
                  <label class="section__form-time-item-label" for="time--130000">08:05</label>
                  <input class="section__form-input-field section__form-input-field--checkbox hidden" type="checkbox"
                    name="times[]" id="time--130000">
                </div>
                <div class="section__form-time-item">
                  <label class="section__form-time-item-label" for="time--140000">08:10</label>
                  <input class="section__form-input-field section__form-input-field--checkbox hidden" type="checkbox"
                    name="times[]" id="time--140000">
                </div>
                <div class="section__form-time-item">
                  <label class="section__form-time-item-label" for="time--150000">08:15</label>
                  <input class="section__form-input-field section__form-input-field--checkbox hidden" type="checkbox"
                    name="times[]" id="time--150000">
                </div>
                <div class="section__form-time-item">
                  <label class="section__form-time-item-label" for="time--150000">08:20</label>
                  <input class="section__form-input-field section__form-input-field--checkbox hidden" type="checkbox"
                    name="times[]" id="time--150000">
                </div>
                <div class="section__form-time-item">
                  <label class="section__form-time-item-label" for="time--150000">08:25</label>
                  <input class="section__form-input-field section__form-input-field--checkbox hidden" type="checkbox"
                    name="times[]" id="time--150000">
                </div>
                <div class="section__form-time-item">
                  <label class="section__form-time-item-label" for="time--150000">08:30</label>
                  <input class="section__form-input-field section__form-input-field--checkbox hidden" type="checkbox"
                    name="times[]" id="time--150000">
                </div>
                <div class="section__form-time-item">
                  <label class="section__form-time-item-label" for="time--150000">08:35</label>
                  <input class="section__form-input-field section__form-input-field--checkbox hidden" type="checkbox"
                    name="times[]" id="time--150000">
                </div>
                <div class="section__form-time-item">
                  <label class="section__form-time-item-label" for="time--150000">08:40</label>
                  <input class="section__form-input-field section__form-input-field--checkbox hidden" type="checkbox"
                    name="times[]" id="time--150000">
                </div>
                <div class="section__form-time-item">
                  <label class="section__form-time-item-label" for="time--150000">08:45</label>
                  <input class="section__form-input-field section__form-input-field--checkbox hidden" type="checkbox"
                    name="times[]" id="time--150000">
                </div>
                <div class="section__form-time-item">
                  <label class="section__form-time-item-label" for="time--150000">08:50</label>
                  <input class="section__form-input-field section__form-input-field--checkbox hidden" type="checkbox"
                    name="times[]" id="time--150000">
                </div>
                <div class="section__form-time-item">
                  <label class="section__form-time-item-label" for="time--150000">08:55</label>
                  <input class="section__form-input-field section__form-input-field--checkbox hidden" type="checkbox"
                    name="times[]" id="time--150000">
                </div>
              </div>
            </div>
            <div class="section__form-time-items-group">
              <div class="section__form-time-items-group-header">
                <input class="section__form-input-field section__form-input-field--checkbox" type="checkbox">
                <label class="section__form-time-item-group-label">
                  09:00
                </label>
              </div>
              <div class="section__form-time-items">
                <div class="section__form-time-item section__form-time-item--enabled">
                  <label class="section__form-time-item-label" for="time--120000">09:00</label>
                  <input class="section__form-input-field section__form-input-field--checkbox hidden" type="checkbox"
                    name="times[]" id="time--120000">
                </div>
                <div class="section__form-time-item section__form-time-item--locked">
                  <label class="section__form-time-item-label" for="time--130000">09:05</label>
                  <input class="section__form-input-field section__form-input-field--checkbox hidden" type="checkbox"
                    name="times[]" id="time--130000">
                </div>
                <div class="section__form-time-item">
                  <label class="section__form-time-item-label" for="time--140000">09:10</label>
                  <input class="section__form-input-field section__form-input-field--checkbox hidden" type="checkbox"
                    name="times[]" id="time--140000">
                </div>
                <div class="section__form-time-item">
                  <label class="section__form-time-item-label" for="time--150000">09:15</label>
                  <input class="section__form-input-field section__form-input-field--checkbox hidden" type="checkbox"
                    name="times[]" id="time--150000">
                </div>
                <div class="section__form-time-item">
                  <label class="section__form-time-item-label" for="time--150000">09:20</label>
                  <input class="section__form-input-field section__form-input-field--checkbox hidden" type="checkbox"
                    name="times[]" id="time--150000">
                </div>
                <div class="section__form-time-item">
                  <label class="section__form-time-item-label" for="time--150000">09:25</label>
                  <input class="section__form-input-field section__form-input-field--checkbox hidden" type="checkbox"
                    name="times[]" id="time--150000">
                </div>
                <div class="section__form-time-item">
                  <label class="section__form-time-item-label" for="time--150000">09:30</label>
                  <input class="section__form-input-field section__form-input-field--checkbox hidden" type="checkbox"
                    name="times[]" id="time--150000">
                </div>
                <div class="section__form-time-item">
                  <label class="section__form-time-item-label" for="time--150000">09:35</label>
                  <input class="section__form-input-field section__form-input-field--checkbox hidden" type="checkbox"
                    name="times[]" id="time--150000">
                </div>
                <div class="section__form-time-item">
                  <label class="section__form-time-item-label" for="time--150000">09:40</label>
                  <input class="section__form-input-field section__form-input-field--checkbox hidden" type="checkbox"
                    name="times[]" id="time--150000">
                </div>
                <div class="section__form-time-item">
                  <label class="section__form-time-item-label" for="time--150000">09:45</label>
                  <input class="section__form-input-field section__form-input-field--checkbox hidden" type="checkbox"
                    name="times[]" id="time--150000">
                </div>
                <div class="section__form-time-item">
                  <label class="section__form-time-item-label" for="time--150000">09:50</label>
                  <input class="section__form-input-field section__form-input-field--checkbox hidden" type="checkbox"
                    name="times[]" id="time--150000">
                </div>
                <div class="section__form-time-item">
                  <label class="section__form-time-item-label" for="time--150000">09:55</label>
                  <input class="section__form-input-field section__form-input-field--checkbox hidden" type="checkbox"
                    name="times[]" id="time--150000">
                </div>
              </div>
            </div> -->
          </div>
        </div>
        <div class="section__form-options">
          <button class="section__button section__button--primary section__button--submit-dates-and-times-form">Save changes</button>
        </div>
      </form>
    </section>
  </main>
  <div class="modals">
    <div class="modal modal--appointment-details">
      <div class="modal__content">
        <div class="modal__header">
          <h1 class="modal__heading">Appointment information</h1>
          <div class="modal__header-options">
            <i class="modal__header-option modal__header-option--close-modal ti ti-x" title="Close"></i>
          </div>
        </div>
        <div class="modal__main-content">
          <div class="modal__appointment-data-items">
            <div class="modal__appointment-data-item modal__appointment-data-item--full-name">
              <label class="modal__appointment-data-item-label">
                <i class="modal__appointment-data-item-icon ti ti-user"></i>
                <span class="modal__appointment-data-item-name">Full name</span>
              </label>
              <span class="modal__appointment-data-item-value">John Doe</span>
            </div>
            <div class="modal__appointment-data-item modal__appointment-data-item--email">
              <label class="modal__appointment-data-item-label">
                <i class="modal__appointment-data-item-icon ti ti-mail"></i>
                <span class="modal__appointment-data-item-name">Email</span>
              </label>
              <span class="modal__appointment-data-item-value">johndoe@example.com</span>
            </div>
            <div class="modal__appointment-data-item modal__appointment-data-item--course">
              <label class="modal__appointment-data-item-label">
                <i class="modal__appointment-data-item-icon ti ti-school"></i>
                <span class="modal__appointment-data-item-name">Course</span>
              </label>
              <span class="modal__appointment-data-item-value">ESO (Morning)</span>
            </div>
            <div class="modal__appointment-data-item modal__appointment-data-item--category">
              <label class="modal__appointment-data-item-label">
                <i class="modal__appointment-data-item-icon ti ti-category"></i>
                <span class="modal__appointment-data-item-name">Category</span>
              </label>
              <span class="modal__appointment-data-item-value">Others</span>
            </div>
            <div class="modal__appointment-data-item modal__appointment-data-item--date">
              <label class="modal__appointment-data-item-label">
                <i class="modal__appointment-data-item-icon ti ti-calendar-week"></i>
                <span class="modal__appointment-data-item-name">Date</span>
              </label>
              <span class="modal__appointment-data-item-value">00/00/0000</span>
            </div>
            <div class="modal__appointment-data-item modal__appointment-data-item--time">
              <label class="modal__appointment-data-item-label">
                <i class="modal__appointment-data-item-icon ti ti-clock"></i>
                <span class="modal__appointment-data-item-name">Time</span>
              </label>
              <span class="modal__appointment-data-item-value">00:00h</span>
            </div>
            <div class="modal__appointment-data-item modal__appointment-data-item--observations">
              <label class="modal__appointment-data-item-label">
                <i class="modal__appointment-data-item-icon ti ti-note"></i>
                <span class="modal__appointment-data-item-name">Observations</span>
              </label>
              <span
                class="modal__appointment-data-item-value modal__appointment-data-item-value--large-text modal__appointment-data-item-value--empty">
                No comments.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="loader active">
    <div class="loader__circle"></div>
    <h1 class="loader__heading">Loading content</h1>
  </div>
</body>

</html>