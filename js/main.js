const main = document.getElementById("main");
const templateSlide = document.getElementById("template-slide").content;

let data = [];
let nSlide = 0;

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

async function fetchData() {
  const res = await fetch("js/data.json");
  const newData = await res.json();
  data = newData;
  renderSlide(nSlide);
}

async function renderSlide(n) {
  main.innerHTML = "";
  const clone = templateSlide.cloneNode(true);
  clone
    .querySelector("#image")
    .setAttribute("src", `images/${data[n].img.src}`);
  clone.querySelector("#image").setAttribute("alt", data[n].img.alt);
  clone.querySelector("p").textContent = data[n].text;
  clone.querySelector("h1").textContent = data[n].name;
  clone.querySelector("span").textContent = data[n].job;
  main.append(clone);
  document.getElementById("prev").addEventListener("click", changeSlide);
  document.getElementById("next").addEventListener("click", changeSlide);
}

function changeSlide(e) {
  if (e.target.id === "prev") {
    nSlide--;
  } else if (e.target.id === "next") {
    nSlide++;
  }
  if (nSlide === -1) {
    nSlide = data.length - 1;
  }
  if (nSlide === data.length) {
    nSlide = 0;
  }
  renderSlide(nSlide);
}
