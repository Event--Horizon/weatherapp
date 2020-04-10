console.log("Client Side JS File Loaded");

const weatherform = document.querySelector("form");
const search = document.querySelector("input");
const msgOne = document.querySelector("#msgOne");
const msgTwo = document.querySelector("#msgTwo");

weatherform.addEventListener("submit", e => {
  e.preventDefault();

  msgOne.textContent = "Loading.....";
  msgTwo.textContent = "";
  const location = search.value;
  fetch("/weather?address=" + location).then(response => {
    response.json().then(data => {
      if (data.error) {
        msgOne.textContent = data.error;
        msgTwo.textContent = "";
      } else {
        msgOne.textContent = data.location;
        msgTwo.textContent = data.forecast;
      }
    });
  });
});
