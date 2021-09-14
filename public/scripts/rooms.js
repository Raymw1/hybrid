const modalOverlay = document.querySelector(".modal-overlay");
const modal = document.querySelector(".modal-content");
const modalRoom = document.querySelector(".modal-content span.modalRoom");
const rooms = document.querySelectorAll(".room");
let desks = null;
rooms.forEach((room) => {
  room.addEventListener("click", () => {
    rooms.forEach((room) => {
      room.classList.remove("active");
    });
    const modalDesks = modal.querySelector(".desks");
    const modalButton = modal.querySelector("button");
    if (modalDesks) modal.removeChild(modalDesks);
    if (modalButton) modal.removeChild(modalButton);
    desks = room.querySelector(".desks").cloneNode(true);
    modal.append(desks);
    // modal.append(button);
    modalRoom.innerText = room.dataset.id;
    modal.insertAdjacentHTML(
      "beforeend",
      `<button type="submit" form="desksForm" onclick="Validate.allFields(event)" class="button">Confirmar<img src="/assets/images/next.svg" alt=""></button>`
    );
    desks = document.querySelectorAll(".modal-content .desks .desk");
    const input = document.querySelector("input[type=hidden]");
    desks.forEach((desk) => {
      desk.addEventListener("click", () => {
        if (!desk.classList.contains("occuped")) {
          desks.forEach((desk) => {
            desk.classList.remove("active");
          });
          input.value = desk.dataset.id;
          modalRoom.innerText = desk.dataset.roomid;
          desk.classList.add("active");
        }
      });
    });
    modalOverlay.classList.add("active");
  });
});
