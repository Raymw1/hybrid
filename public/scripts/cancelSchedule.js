const schedules = document.querySelectorAll("div.cancelSchedule");
const modalOverlay = document.querySelector(".modal-overlay");
const input = document.querySelector("input[name='id']");
const modalDesk = document.querySelector(".modal-content span.modalDesk");
const modalRoom = document.querySelector(".modal-content span.modalRoom");
const modalUnity = document.querySelector(".modal-content span.modalUnity");
const modalDate = document.querySelector(".modal-content span.modalDate");
schedules.forEach((schedule) => {
  schedule.addEventListener("click", () => {
    input.value = schedule.dataset.id;
    modalDesk.innerText = schedule.dataset.desk;
    modalDate.innerText = schedule.dataset.date;
    modalRoom.innerText = schedule.dataset.room;
    modalUnity.innerText = schedule.dataset.unity;
    modalOverlay.classList.add("active");
  });
});
