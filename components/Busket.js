class Busket {
  create() {
    this.element = document.createElement("div");
    this.element.classList.add("app__busket");
    this.element.classList.add('hide')
    return this.element;
  }

  init() {
    return this.create();
  }
}

const busket = new Busket().init();
export { busket };
