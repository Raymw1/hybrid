const rooms = document.querySelectorAll("div.deleteRoom");
const modalOverlay = document.querySelector(".modal-overlay");
const spanRoom = document.querySelector("span.roomId");
const spanUnity = document.querySelector("span.unity");
const input = document.querySelector("input[name='id']");
rooms.forEach((room) => {
  room.addEventListener("click", () => {
    input.value = room.dataset.id;
    spanRoom.innerText = room.dataset.room;
    spanUnity.innerText = room.dataset.unity;
    modalOverlay.classList.add("active");
  });
});
