export const hashChange = (arr, CN) => {
  arr.map((v) => v.div.classList.add("hide"));
  arr.find((arg) => {
    if (arg.hash === window.location.hash) {
      window.scrollTo(0, 0)
      arg.div.classList.remove("hide");
      arg.display(arg.div, CN)
    }
  });
};

export const getDinHash = (before) => {
    return `#${before}/${window.location.hash.split(`${before}/`)[1]}`
}
