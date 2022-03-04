export const displayMain = (div, CN) => {
  div.innerHTML = ``;
  CN.prodcuts.forEach((e) => {
    div.innerHTML += `
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
  CN.setEventToAddButton();
  CN.setEventToPlusButtons();
  CN.setEvenToMinusButtons();
};

export const displayBusket = (div, CN) => {
  div.innerHTML = ``;
  CN.busket.map((v) => {
    CN.vp = CN.prodcuts[v.id - 1];
    div.innerHTML += `
          <div id="${CN.vp.id}" class="busket__item">
            <button id="${CN.vp.id}" class="remove">
              <i class="fas fa-times"></i>
            </button>
            <img src="${CN.vp.image}" alt="" />
            <h4 class="title">${CN.vp.title}</h4>
            <h5 class="price">${CN.vp.price} $</h5>
            <input type="number" class="quanity" value="${v.count}">
            <h5 class="sub__total">${(CN.vp.price * v.count).toFixed(2)} $</h5>
          </div>
                  `;
  });
  CN.totalCostBusket.innerHTML = `
      <h5>Total Cost: ${(+Math.abs(CN.sumPrice)).toFixed(2)} $</h5>
      `;
  div.appendChild(CN.totalCostBusket);
  CN.setEventToRemoveButton();
};

export const displayProduct = (div, CN) => {
  let item = CN.prodcuts.find(
    (v) => v.id == location.hash.split(`product/`)[1]
  );
  div.innerHTML = `
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
};
