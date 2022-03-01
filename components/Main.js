export class Main {
  create() {
    this.element = document.createElement("div");
    this.element.classList.add("app__main");
    return this.element;
  }

  init() {
    return this.create();
  }
}

const main = new Main().init();
export { main };
