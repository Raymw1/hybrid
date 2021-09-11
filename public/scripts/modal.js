const Modal = {
  modalOverlay: document.querySelector(".modal-overlay"),
  open(event) {
    this.modalOverlay.classList.add("active");
    event.preventDefault();
  },
  close(event) {
    event.preventDefault();
    this.modalOverlay.classList.remove("active");
  },
};
