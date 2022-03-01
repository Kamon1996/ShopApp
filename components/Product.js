class Product {
    create() {
      this.element = document.createElement("div");
      this.element.classList.add("app__product");
      this.element.classList.add('hide');
      return this.element;
    }
  
    init() {
      return this.create();
    }
  }
  
  const product = new Product().init();
  export { product };
  