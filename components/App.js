import { main } from "./Main.js";
import { busket } from "./Busket.js";
import { product } from "./Product.js";
import { getCookie, setCookie } from "./common.js";

export class App {
  constructor() {
    this.prodcuts = []; // Общий массив со всеми продуктами
    this.busketCount = document.querySelector(".bukset__counter"); // нода счетчика продуктов в корзине
    this.busketPrice = document.querySelector(".busket__total-price"); // нода счетчика их общей стоимости
    this.sumCount; // число товаров в корзине
    this.toBusketButtons;
    this.regularCount; // значение между + и -
    if (getCookie("busket")) {
      this.busket = JSON.parse(getCookie("busket"));
      this.busketCount.innerHTML = this.busket.map(
        (v) => (this.sumCount += v.count)
      );
    } else {
      this.busket = []; // общий массив со всеми товарами в корзине
    }
  }
  create() {
    this.totalCostBusket = document.createElement("div");
    this.totalCostBusket.classList.add("total");
    this.app = document.createElement("section");
    this.app.classList.add("app");
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("wrapper");
    this.app__inner = document.createElement("div");
    this.app__inner.classList.add("app__inner");
  }

  render() {
    this.app__inner.appendChild(main);
    this.app__inner.appendChild(busket);
    this.app__inner.appendChild(product);
    this.wrapper.appendChild(this.app__inner);
    this.app.appendChild(this.wrapper);
    document.body.appendChild(this.app);
  }

  async getFakeAPI() {
    if (!localStorage.getItem("FakeProducts")) {
      await fetch("https://fakestoreapi.com/products").then((res) =>
        res.json().then((json) => {
          localStorage.setItem("FakeProducts", JSON.stringify(json));
          this.prodcuts = [...this.prodcuts, ...json];
        })
      );
    } else {
      this.prodcuts = JSON.parse(localStorage.getItem("FakeProducts"));
    }
  }

  getMain() {
    main.innerHTML = ``;
    this.prodcuts.forEach((e) => {
      main.innerHTML += `
        <div id="${e.id}" class="main__item">
          <a id="${e.id}" href="#product/${e.id}"><i class="fas fa-info"></i></a>
          <img src="${e.image}" alt="" />
          <h4 class="item__title">${e.title}</h4>
          <h5 class="item__price">${e.price} $</h5>
          <div class="item__about">
            <h6>
              rating:
              <p>${e.rating.rate}</p>
            </h6>
            <h6>
              count:
              <p>${e.rating.count}</p>
            </h6>

              <button id="${e.id}" class="to__busket-add">Add to busket</button>
              <div class="to__busket-regular hide">
                <button id="${e.id}" class="to__busket-minus"><i class="fas fa-minus"></i></button>
                <input type="number" value="1" name="" id="${e.id}">
                <button id="${e.id}" class="to__busket-plus"><i class="fas fa-plus"></i></button>
            </div>
          </div>
        </div>
                `;
    });
    this.setEventToAddButton();
    this.setEventToPlusButtons();
    this.setEvenToMinusButtons();
  }

  getBusket() {
    if (getCookie("busket")) {
      busket.innerHTML = ``;
      this.busket.map((v) => {
        this.vp = this.prodcuts[v.id - 1];
        busket.innerHTML += `
          <div id="${this.vp.id}" class="busket__item">
            <button id="${this.vp.id}" class="remove">
              <i class="fas fa-times"></i>
            </button>
            <img src="${this.vp.image}" alt="" />
            <h4 class="title">${this.vp.title}</h4>
            <h5 class="price">${this.vp.price} $</h5>
            <input type="number" class="quanity" value="${v.count}">
            <h5 class="sub__total">${this.vp.price * v.count} $</h5>
          </div>
                  `;
      });
      this.totalCostBusket.innerHTML = `
      <h5>Total Cost: ${(+Math.abs(this.sumPrice)).toFixed(2)} $</h5>
      `;
      busket.appendChild(this.totalCostBusket);
      this.setEventToRemoveButton();
    }
  }

  getProduct(item) {
    product.innerHTML = `
      <div id="${item.id}" class="product__item">
        <h4 class="title">${item.title}</h4>
        <img src="${item.image}" alt="" />
        <div class="more">
          <p class="description">${item.description}</p>
          <h5 class="price">${item.price} $</h5>
          <div class="about">
            <h6>
              rating:
              <p>${item.rating.rate}</p>
            </h6>
            <h6>
              count:
              <p>${item.rating.count}</p>
            </h6>
          </div>
        </div>
      </div>
        `;
  }

  hashChange() {
    if (location.hash === "#cart") {
      main.classList.add("hide");
      product.classList.add("hide");
      busket.classList.toggle("hide");
      this.getBusket();
    } else if (
      location.hash === `#product/${location.hash.split(`product/`)[1]}`
    ) {
      busket.classList.add("hide");
      main.classList.add("hide");
      product.classList.remove("hide");
      this.item = this.prodcuts.find(
        (item) => item.id == location.hash.split(`product/`)[1]
      );
      this.getProduct(this.item);
    } else {
      busket.classList.add("hide");
      product.classList.add("hide");
      main.classList.remove("hide");
    }
  }

  setEventHashChange() {
    window.addEventListener("hashchange", () => this.hashChange());
    // window.addEventListener('beforeunload', (this.hashChange)) // event перед загрузкой?
  }
  setEventToAddButton() {
    this.toBusketButtons = main.querySelectorAll(".to__busket-add");
    this.toBusketButtons.forEach((el) => {
      el.addEventListener("click", (e) => {
        this.busket = [...this.busket, { id: +el.id, count: 1 }];
        el.classList.add("hide");
        el.nextElementSibling.classList.remove("hide");
        this.busketCount.innerHTML = ++this.sumCount;
        this.busketPrice.innerHTML =
          (this.sumPrice += this.prodcuts[el.id - 1].price).toFixed(2) + ` $`;
        setCookie("busket", this.busket);
      });
    });
  }
  setEventToPlusButtons() {
    main.querySelectorAll(".to__busket-plus").forEach((el) => {
      el.addEventListener("click", (e) => {
        ++el.previousElementSibling.value;
        this.busketCount.innerHTML = ++this.sumCount;
        this.busket.map((v) => (v.id == el.id ? ++v.count : v));
        this.busketPrice.innerHTML =
          (this.sumPrice += this.prodcuts[el.id - 1].price).toFixed(2) + ` $`;
        setCookie("busket", this.busket);
      });
    });
  }
  setEvenToMinusButtons() {
    main.querySelectorAll(".to__busket-minus").forEach((el) => {
      el.addEventListener("click", (e) => {
        if (el.nextElementSibling.value > 1) {
          --el.nextElementSibling.value;
          this.busket.map((v) => (v.id == el.id ? --v.count : v));
        } else {
          el.parentElement.classList.add("hide");
          el.parentElement.previousElementSibling.classList.remove("hide");
          this.busket = this.busket.filter((v) => v.id != el.id);
        }
        this.busketCount.innerHTML = --this.sumCount;
        this.busketPrice.innerHTML =
          Math.abs((this.sumPrice -= this.prodcuts[el.id - 1].price)).toFixed(
            2
          ) + ` $`;
      });
    });
  }
  setEventToRemoveButton() {
    this.removeButton = busket.querySelectorAll(".remove").forEach((el) => {
      el.addEventListener("click", (e) => {
        this.busket = this.busket.filter((v) => el.id != v.id);
        this.toBusketButtons.forEach((toBusket) => {
          if (toBusket.id === el.id) {
            toBusket.classList.remove("hide");
            toBusket.nextElementSibling.classList.add("hide");
            toBusket.nextElementSibling.querySelector("input").value = 1;
            return;
          }
        });
        this.elCount = el.parentElement.querySelector(".quanity").value;
        this.busketCount.innerHTML = this.sumCount -= this.elCount;
        this.busketPrice.innerHTML =
          Math.abs(
            (this.sumPrice -=
              this.prodcuts[el.id - 1].price * this.elCount).toFixed(2)
          ) + ` $`;
        this.getBusket();
        setCookie("busket", this.busket);
      });
    });
  }

  getBusketCount() {
    this.sumCount = 0;
    this.busket.map((v) => (this.sumCount += v.count));
    this.busketCount.innerHTML = this.sumCount;
  }

  getBusketTotalPrice() {
    this.sumPrice = 0;
    this.busket.map(
      (v) => (this.sumPrice += v.count * this.prodcuts[v.id - 1].price)
    );
    this.busketPrice.innerHTML = this.sumPrice.toFixed(2) + ` $`;
  }

  async init() {
    this.create();
    this.render();
    await this.getFakeAPI();
    this.setEventHashChange();
    this.getMain();
    this.getBusket();
    this.getBusketCount();
    this.getBusketTotalPrice();
  }
}

export default new App().init();
