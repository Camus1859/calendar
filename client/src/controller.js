import {
  refreshShowToday,
  dropDownMonth,
  removeOldEventsContent,
  updateMonth,
  yearEntered,
  showAllEvents,
  prepareToCreateEvent,
  showHolidaysWhenMonthSelected,
} from "./ui.js";

const prevNextBtns = document.querySelectorAll(".update-month");
const todayBtn = document.getElementById("today");
const dropDownMonths = document.querySelector("select");
const yearEnteredValue = document.getElementById("year-input");
const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");
const submitBtn = document.getElementById("submit-event");
const monthSelector = document.getElementById("month-selector");

todayBtn.addEventListener("click", refreshShowToday);
prevNextBtns.forEach((button) => button.addEventListener("click", updateMonth));
dropDownMonths.addEventListener("change", dropDownMonth);
yearEnteredValue.addEventListener("keyup", yearEntered);
trigger.addEventListener("click", toggleModal);
trigger.addEventListener("click", removeOldEventsContent);
trigger.addEventListener("click", prepareToCreateEvent);

monthSelector.addEventListener("click", showHolidaysWhenMonthSelected);

closeButton.addEventListener("click", toggleModal);
submitBtn.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
const displayAllEvents = document.getElementById("container-all-events");
displayAllEvents.addEventListener("click", showAllEvents);

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

const disAllowSelectingDateBeforeToday = () => {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("event-date").setAttribute("min", today);
};
disAllowSelectingDateBeforeToday();
