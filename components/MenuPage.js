export class MenuPage extends HTMLElement {
  constructor() {
    super();
    // create a shadow dom
    this.root = this.attachShadow({ mode: 'open' });

    // create css style element in the shadow dom
    const styles = document.createElement('style');
    this.root.appendChild(styles);

    // function to fetch css and apply to the shadow dom's style element
    async function loadCSS() {
      const request = await fetch('/components/MenuPage.css');
      const css = await request.text();
      styles.textContent = css;
    }

    //call the css loader
    loadCSS();
  }

  connectedCallback() {
    // create template
    const template = document.getElementById("menu-page-template");
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    // event listener to detect changes to menu element
    window.addEventListener("appmenuchange", () => { this.render() });

    //initial render
    this.render();
  }

  render() {
    const menuElement = this.root.querySelector('#menu');
    if (app.store.menu) {
      //clear menu content
      menuElement.innerHTML = '';
      //create a list element for every category
      for (let category of app.store.menu) {
        const liCategory = document.createElement("li");
        liCategory.innerHTML = `
          <h3>${category.name}</h3>
          <ul class='category'>
          </ul>
        `;
        //insert the current category element into the menu
        menuElement.appendChild(liCategory);
        //create a list item for each product in the category
        category.products.forEach(product => {
          const item = document.createElement("product-item");
          item.dataset.product = JSON.stringify(product);
          liCategory.querySelector("ul").appendChild(item);
        });
      }
    } else {
      //show a temporary loading message if the menu data is awaiting fetch
      menuElement.innerHTML = "Loading..."
    }
  }

}

customElements.define("menu-page", MenuPage);