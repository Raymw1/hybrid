const desks = document.querySelectorAll(".desk");
const input = document.querySelector("input[type=hidden]");
const modalDesk = document.querySelector(".modal-content span.modalDesk");
const modalRoom = document.querySelector(".modal-content span.modalRoom");
const buttonSchedule = document.querySelector("#desksForm .button");
desks.forEach((desk) => {
  desk.addEventListener("click", () => {
    if (!desk.classList.contains("occuped")) {
      desks.forEach((desk) => {
        desk.classList.remove("active");
      });
      buttonSchedule.style.opacity = 1;
      buttonSchedule.style.cursor = "pointer";
      buttonSchedule.setAttribute("onclick", "Modal.open()");
      input.value = desk.dataset.id;
      modalDesk.innerText = desk.dataset.position;
      modalRoom.innerText = desk.dataset.roomid;
      desk.classList.add("active");
    }
  });
});
