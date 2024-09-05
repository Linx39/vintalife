import { controlModal } from "./modal.js";
import { resetForm } from "./feedback.js";

const callModal = document.querySelector('.call');

const {handleModal} = controlModal(callModal);
handleModal();
