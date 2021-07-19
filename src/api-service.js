const BASE_URL = `https://restcountries.eu/rest/v2`;



function fetchCountries(name) {
    return fetch(`${BASE_URL}/name/${name}`)
   .then(res => { 
       return  res.json();
    });
   
} 
export default {fetchCountries};