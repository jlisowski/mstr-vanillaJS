import { getProductById } from "../services/Menu.js";

export class DetailsPage extends HTMLElement {
  constructor() {
    super();
  
    //create shadow dom for component
    this.root = this.attachShadow({ mode: "open" });

    //generate css styles element for component
    const styles = document.createElement("style");
    this.root.appendChild(styles);

    //fetch css stylesheet for component
    async function loadCSS() {
      const request = await fetch('/components/DetailsPage.css');
      styles.textContent = await request.text();
    }
    loadCSS();
  }

  connectedCallback() {
    //append template clone to shadow dom
    const template = document.getElementById("details-page-template");
    const content = template.content.cloneNode(true);
    this.appendChild(content);
    
    this.renderData();
  }

  async renderData() {
    if (this.dataset.productId) {
      this.product = await getProductById(this.dataset.productId);
      this.root.querySelector("h2").textContent = this.product.name;
      this.root.querySelector("img").src = `/data/images/${this.product.image}`;
      this.root.querySelector(".description").textContent = this.product.description;
      this.root.querySelector(".price").textContent = `$ ${this.product.price.toFixed(2)} ea`
      this.root.querySelector("button").addEventListener("click", ()=> {
          // TODO addToCart(this.product.id); 
          app.router.go('/order');
      });
      event.preventDefault();
    } else {
      alert("Invalid Product ID");
    }
  }


}

customElements.define("details-page", DetailsPage);