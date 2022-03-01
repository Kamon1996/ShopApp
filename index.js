const loadModule = async () => {
  await import("./components/Head.js");
  await import("./components/Header.js");
  await import("./components/App.js");
  await import("./components/Footer.js");
};

loadModule();
