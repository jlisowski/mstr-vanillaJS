export class OrderPage extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const template = document.getElementById("order-form-template");
    const content = template.content.cloneNode(true);
    this.appendChild(content);
  }
}

customElements.define("order-page", OrderPage);