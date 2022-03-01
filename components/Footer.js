class Footer {
  create() {
    this.element = document.createElement("footer");
    this.element.classList.add("footer");
    this.element.innerHTML = `
        <a href=""><i class="fas fa-mug-hot"></i></a>

        <div class="social">
          <a href="#" class="social__item">
            <i class="fas fa-map-marker-alt"></i>
            <p>59 Street, NY city, Rose Town, 05 Rive House</p>
          </a>
  
          <a href="#" class="social__item">
            <i class="fas fa-phone-alt"></i>
            <p>+123 456 7890</p>
          </a>
  
          <a href="#" class="social__item">
            <i class="fas fa-envelope"></i>
            <p>info@example.com</p>
          </a>
        </div>
        `;
  }

  render() {
    document.body.appendChild(this.element)
  }

  init() {
    this.create();
    this.render();
  }
}

export default new Footer().init();
