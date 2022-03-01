class Head {
  create() {
    document.head.innerHTML = `
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>
<link rel="stylesheet" href="css/style.css">
`;
  }
  init() {
    this.create();
  }
}

export default new Head().init();
