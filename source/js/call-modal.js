import { initModal } from "./modal.js";
import { resetForms } from "./feedback.js";

const call = document.querySelector('.call');

const callModal = initModal(call, null, resetForms);
