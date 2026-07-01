// It's better to wait for DOMContentLoaded before manipulation 
import proxiedStore from "./services/Store.js";
import API from "./services/API.js";
import { loadData } from "./services/Menu.js";
import Router from "./services/Router.js";

// Link web components
import { MenuPage } from "./components/MenuPage.js";
import { DetailsPage } from "./components/DetailsPage.js";
import { OrderPage } from "./components/OrderPage.js";
import { ProductItem } from "./components/ProductItem.js";

window.app = {
  store: proxiedStore,
  router: Router,
};

// It's better to wait for DOMContentLoaded before DOM manipulation
window.addEventListener("DOMContentLoaded", () => {
  loadData();
  Router.init();
});