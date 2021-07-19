import countryEl from "./templates/country.hbs";
import { alert, defaultModules } from "@pnotify/core";
import * as PNotifyMobile from "@pnotify/mobile";

defaultModules.set(PNotifyMobile, {});

import "@pnotify/core/dist/BrightTheme.css";
import API from "./api-service.js";

const debounce = require("lodash.debounce");

const cardConteine = document.querySelector(".card-conteiner");
const searchForm = document.querySelector(".form");
const input = document.querySelector(".search-input");

input.addEventListener(
  "input",
  debounce(() => {
    const searchQuery = input.value;
    if (searchQuery) {
      API.fetchCountries(searchQuery)
        .then(renderCountryCard)
        .catch(error => console.log('ERROR', error));
    }
  }, 500)
);

input.addEventListener("input", () => {
  if (input.value === "") {
    cardConteine.innerHTML = "";
    const alertPnotify = document.querySelector(".pnotify-closer");
    if (alertPnotify !== null) {
      alertPnotify.click();
    }
    //   searchForm.reset();
  }
});

function renderCountryCard(resp) {
  
  if (resp.status == "404") {
    cardConteine.innerHTML = "";
    throw alert({
      text: "Этой страны нет в списке!",
    });
    
  }
  const cauntryCard = countryEl(resp);
  cardConteine.innerHTML = cauntryCard;
}


