export class Nav {
  create() {
    this.element = document.createElement("nav");
    this.element.classList.add("nav");
    this.element.innerHTML = `
    <a href=""><i class="fas fa-mug-hot"></i></a>
        <ul>
          <li><a href="#">Shop</a></li>
          <li><a href="#">Contacts</a></li>
          <li><a href="#">About</a></li>
        </ul>
        <div class="busket">
        <a href="#cart">
        <i class="fas fa-shopping-basket">
          <div class="bukset__counter">0</div>
          </i>
        </a>
        <div class="busket__total-price">$</div>
      </div>      
        `;
    return this.element;
  }

  init() {
    return this.create();
  }
}

const nav = new Nav().init();
export { nav };
