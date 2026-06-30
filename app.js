// It's better to wait for DOMContentLoaded before manipulation 
import Store from "./services/Store.js";
import API from "./services/API.js";
import { loadData } from "./services/Menu.js";

window.app = {
  store: Store,
};

// It's better to wait for DOMContentLoaded before DOM manipulation
window.addEventListener("DOMContentLoaded", () => {
  loadData();
});