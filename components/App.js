import { main } from "./Main.js";
import { busket } from "./Busket.js";
import { product } from "./Product.js";
import { getCookie, setCookie } from "./common.js";
import { displayMain, displayBusket, displayProduct } from "./Display.js";
import { hashChange, getDinHash } from "./RemoteHash.js";

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
    this.remoteConfig = [];
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

  setRemoteConfig() {
    this.remoteConfig = [
      {
        div: main,
        hash: "",
        display: displayMain,
      },
      {
        div: busket,
        hash: "#cart",
        display: displayBusket,
      },
      {
        div: product,
        hash: getDinHash('product'),
        display: displayProduct,
      },
    ];
  }

  setEventHashChange() {
    window.addEventListener("hashchange", () =>  {
      this.setRemoteConfig();
      hashChange(this.remoteConfig, this)
    });
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
        displayBusket(busket, this);
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
    this.setRemoteConfig()
    this.setEventHashChange();
    displayMain(main, this);
    if (getCookie("busket")) {
      displayBusket(busket, this);
    }
    this.getBusketCount();
    this.getBusketTotalPrice();
  }
}

export default new App().init();
