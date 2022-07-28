let str = "";
let dayWithTask = [];

class Calendar {
  // prettier-ignore
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December",];

  constructor(date, box) {
    this.date = new Date(date);
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth();
    this.day = this.date.getDate();
    // this.container = box;
    console.log(this.date);
  }

  renderCalendar() {
    const markup = `

    <div class="calendar">
    <div class="calendar__year">
    <p class="year"></p>
    </div>
    <div class="calendar__month">
    <button class="prev-month">&larr;</button>
    <p class="month">month</p>
    <button class="next-month">&rarr;</button>
    </div>
    <div class="calendar__day">
    <li class="week-day">M</li>
    <li class="week-day">T</li>
    <li class="week-day">W</li>
    <li class="week-day">T</li>
    <li class="week-day">F</li>
    <li class="week-day">S</li>
    <li class="week-day">S</li>
    
    <!-- <div class="day--box">29</div> -->
    </div>
    </div>
    `;

    // overlay.classList.remove("hidden");
    // overlay.addEventListener("click", this.close);
    const container = document.querySelector(".container__calendar");
    container.insertAdjacentHTML("afterbegin", markup);
  }

  renderDays() {
    const calendarYear = document.querySelector(".year");
    const calendarMonth = document.querySelector(".month");
    const calendarDay = document.querySelector(".calendar__day");
    this.date.setDate(1);

    // getDay() = weekday index: 0 = sunday 1 = monday

    // Get first weekday of current month
    let firstDayIndex = this.date.getDay();
    if (firstDayIndex === 0) firstDayIndex = 7;

    // Get last weekday of current month
    let lastDayIndex = new Date(this.year, this.month + 1, 0).getDay();
    if (lastDayIndex === 0) lastDayIndex = 7;

    // Get number of days in previous month
    const prevLastDay = new Date(this.year, this.month, 0).getDate();

    // Get number of days in current month
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

    // Calculate number of days to be displayed on end of calendar
    const nextDays = 7 - lastDayIndex;

    calendarYear.textContent = this.year;
    calendarMonth.textContent = this.months[this.month];

    const weekdayEl = document.querySelectorAll(".week-day");

    // Render days before the start of current month
    let daysN = firstDayIndex - 1;
    let d = 0;
    while (daysN > 0) {
      weekdayEl[weekdayEl.length - 1].insertAdjacentHTML(
        "afterend",
        `<div class="day--box prev-next">${prevLastDay - d}</div>`
      );
      daysN--;
      d++;
    }

    // Render days of current month
    d = 1;
    while (d <= daysInMonth) {
      calendarDay.insertAdjacentHTML(
        "beforeend",
        `<div class="day--box day--box-current">${d}</div>`
      );
      d++;
    }

    // Render current day and add event listener
    document.querySelectorAll(".day--box-current").forEach((x) => {
      if (x.textContent == this.day) x.classList.add("today", "selected");
      x.addEventListener("click", this.daySelect.bind(this));
    });

    // Create basic string for current day
    const startBox = document.querySelector(".start-date-box");
    startBox.textContent = `${document.querySelector(".today").textContent} ${
      calendarMonth.textContent
    } ${calendarYear.textContent}`;

    // Render days after current month
    const dayBox = document.querySelectorAll(".day--box");
    d = 1;
    while (d <= nextDays) {
      dayBox[dayBox.length - 1].parentElement.insertAdjacentHTML(
        "beforeend",
        `<div class="day--box prev-next">${d}</div>`
      );
      d++;
    }
  }

  daySelect(e) {
    const calendarYear = document.querySelector(".calendar__year");
    const calendarMonth = document.querySelector(".month");
    const startDate = document.querySelector(".start-date-box");

    document.querySelectorAll(".day--box-current").forEach((el) => {
      el.classList.remove("selected");
    });
    e.target.classList.add("selected");
    this.updateDays();

    const startBox = document.querySelector(".start-date-box");
    startBox.textContent = `${
      document.querySelector(".selected").textContent
    } ${calendarMonth.textContent} ${calendarYear.textContent}`;
  }

  addListeners() {
    const prevMonthBtn = document.querySelector(".prev-month");
    const nextMonthBtn = document.querySelector(".next-month");
    prevMonthBtn.addEventListener("click", this.prevMonth.bind(this));
    nextMonthBtn.addEventListener("click", this.nextMonth.bind(this));
  }

  updateDays() {
    dayWithTask = [];
    window.projects.forEach((project) => {
      project.items.forEach((listItem) => {
        dayWithTask.push({ item: listItem, project: project.name });
      });
      this.createlist();
    });
  }

  createlist() {
    document
      .querySelectorAll(".list__container--calendar")
      .forEach((el) => el.remove());

    const year = document.querySelector(".year");
    const month = document.querySelector(".month");

    dayWithTask.reverse();
    document.querySelectorAll(".day--box-current").forEach((el, i) => {
      el.classList.remove("busy");

      dayWithTask.forEach((listItem) => {
        if (
          el.innerHTML === listItem.item.startDate.split(" ")[0] &&
          month.innerHTML === listItem.item.startDate.split(" ")[1] &&
          year.innerHTML === listItem.item.startDate.split(" ")[2]
        ) {
          el.classList.add("busy");
          if (el.classList.contains("selected")) {
            const markup = `
              <div class="list__container--calendar">
                <div class="project__name--calendar">
                  <p> ${listItem.project} </p>
                </div>

                <div data-id="${listItem.item.id}" class="list__element--calendar">
                  <div class="list__element--content">
                  <p class="list__text">${listItem.item.text}</p>
                  </div>
                </div>
              </div>
                `;
            document
              .querySelector(".container__list--calendar")
              .insertAdjacentHTML("afterbegin", markup);
          }
        }
      });
    });
  }

  clear() {
    document.querySelectorAll(".day--box").forEach((el) => {
      el.remove();
    });
  }

  close() {
    const calendar = document.querySelector(".calendar");
    calendar.remove();

    const overlay = document.querySelector(".overlay");
    overlay.classList.add("hidden");
  }

  prevMonth(e) {
    this.clear();
    if (this.month === 0) {
      this.year--;
      this.date.setFullYear(this.year);
      this.month = 11;
      this.date.setMonth(this.month);
    } else {
      this.month--;
      this.date.setMonth(this.month);
    }
    this.renderDays();
    this.updateDays();
  }

  nextMonth(e) {
    this.clear();
    if (this.month === 11) {
      this.year++;
      this.date.setFullYear(this.year);
      this.month = 0;
      this.date.setMonth(this.month);
    } else {
      this.month++;
      this.date.setMonth(this.month);
    }
    this.renderDays();
    this.updateDays();
  }

  init(container) {
    this.renderCalendar();
    this.renderDays();
    this.addListeners();
    this.updateDays();
  }
}
