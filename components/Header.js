import { nav } from "./Nav.js";

class Header {
  create() {
    this.element = document.createElement("header");
    this.element.classList.add("header");
    this.element.appendChild(nav);
  }

  render() {
    document.body.appendChild(this.element)
  }

  init() {
      this.create();
      this.render();
  }
}

export default new Header().init();

