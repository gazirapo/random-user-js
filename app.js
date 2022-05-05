const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const dblBtn = document.getElementById("double");
const showerBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

getRandomUser();
getRandomUser();
getRandomUser();

let data = [];

// fetch random user and add money

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api/");
  const data = await res.json();
  const user = data.results[0];

  const newUser = {
    name: ` ${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// double money

function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

// filter only millionaires

function showMillionaries() {
  data = data.filter((user) => user.money > 1000000);

  updateDOM();
}
// add new obj to data array

function addData(obj) {
  data.push(obj);

  updateDOM();
}

// sort by richest

function sortByRichest() {
  data.sort((a, b) => {
    return a.money - b.money;
  });
  updateDOM();
}

// calculate entire Wealt

function calcWealt() {
  const calc = data.reduce((acc, user) => (acc += user.money), 0);
  const wealthElement = document.createElement("div");
  wealthElement.innerHTML = `<h3>Total Wealth:<strong>${formatMoney(
    calc
  )}</strong> </h3>`;
  main.appendChild(wealthElement);
}

// update dom

function updateDOM(providedData = data) {
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong> ${item.name} </strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// format number as money

function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"); // 12,345.67
}

//  event listener

addUserBtn.addEventListener("click", getRandomUser);
dblBtn.addEventListener("click", doubleMoney);
showerBtn.addEventListener("click", showMillionaries);
sortBtn.addEventListener("click", sortByRichest);
calculateWealthBtn.addEventListener("click", calcWealt);

// bonus / reload the page

// const rel = document.querySelector(".app-logo");
// rel.addEventListener("click", function () {
//   location.reload();
// });
