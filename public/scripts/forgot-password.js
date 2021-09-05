const ModalPassword = {
  modalOverlay: document.querySelector(".modal-overlay"),
  open() {
    this.modalOverlay.classList.add("active");
  },
  close() {
    this.modalOverlay.classList.remove("active");
  },
};
