import countryEl from "./templates/country.hbs";
import cartList from "./templates/card-list.hbs";
import { alert, defaultModules } from "@pnotify/core";
import * as PNotifyMobile from "@pnotify/mobile";

defaultModules.set(PNotifyMobile, {});

import "@pnotify/core/dist/BrightTheme.css";
import API from "./api-service.js";
import { existsOne } from "htmlparser2/node_modules/domutils";
import { data } from "browserslist";

const debounce = require("lodash.debounce");

const cardConteine = document.querySelector(".card-conteiner");
const searchForm = document.querySelector(".form");
const input = document.querySelector(".search-input");

input.addEventListener(
  "input",
  debounce(() => {
    const query = input.value;
    //Clear content
    cardConteine.innerHTML = "";

    if (query.length < 2 || query.length >= 10 || !query) {
      alert("Пожалуйста, введите более конкретный запрос!");
      return "";
    }

    API.fetchCountries(query)
      .then(renderCountryCard)
      .catch((error) => console.log("ERROR", error));

  }, 500)
);

//Reset page
input.addEventListener("input", () => {
  if (input.value === "") {
    cardConteine.innerHTML = "";
    const alertPnotify = document.querySelector(".pnotify-closer");
    if (alertPnotify !== null) {
      alertPnotify.click();
    }
  }
});

function renderCountryCard(resp) {
  if (resp.status == "404" || !resp) {
    alert("Этой страны нет в списке!");
    return "";
  }

  cardConteine.innerHTML = processedCountries(resp);
}

function processedCountries(resp) {
  if (resp.length === 1) {
    return countryEl(resp);
  } else if (resp.length > 1 && resp.length < 10) {
    return cartList(resp);
  }

  return "";
}
