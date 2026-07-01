const Store = {
  menu: null,
  cart: []
}

//proxy used to trap changes to our Store state variable and dispatch events
const proxiedStore = new Proxy(Store, {
  set(target, property, value) {
    target[property] = value;
    if (property == "menu") {
      window.dispatchEvent(new Event("appmenuchange"))
    }
    if (property == "cart") {
      window.dispatchEvent(new Event("appcartchange"))
    }
    return true;
  }
})


export default proxiedStore;