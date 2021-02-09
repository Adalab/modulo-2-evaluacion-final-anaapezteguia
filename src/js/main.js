'use strict'
//inicializo variables globales
const formElement = document.querySelector('.js-form');
const inputElement = document.querySelector('.js-seriesInput');
const searchBtnElement = document.querySelector('.js-searchBtn');
const resetBtnElement = document.querySelector('.js-resetBtn');
const ulResultsElement = document.querySelector('.js-searchList');

//arrays de pelis vacíos
let seriesArray = [];
let favSeries = [];

//llamada a API para coger series
function getSeries() {
    const search = inputElement.value;
    fetch(`http://api.tvmaze.com/search/shows?q=${search}`)
 
      .then(response => response.json())
        .then(data => {
            for (const series of data) {
                seriesArray.push(series.show);
            }
            paintSearchResults();
        //guardaremos en LOCAL STORAGE
        });
}
searchBtnElement.addEventListener ('click', getSeries);

//local storage
// function setInLocalStorage() {
//     const stringSeries = JSON.stringify(favSeries);
//     localStorage.setItem('favSeries', stringSeries);
//   }


// favoritos
function isFavoriteSerie(serie) {
    // compruebo si la paleta que recibo por parámetro está en los favoritos
    const favoriteFound = favSeries.find(favorite => {
      // la dificultad de esta función interna del find es saber que tengo que comparar
      // yo consolearía console.log(favorite, palette) para ver los datos que debo comparar
      return favorite.id === serie.id;
    });
    // find devuelve undefined si no lo encuentra
    // retorno si está o no está en favoritos
    if (favoriteFound === undefined) {
      return false;
    } else {
      return true;
    }
  }
  
// pintar series
function paintSearchResults() {
    let htmlCode = '';
    const defaultImg = 'https://via.placeholder.com/210x295/dcbcc6/666666/?text=DEFAULT IMAGE';
    // pintando HTML
    // si me queda tiempo, PARA NOTA, pintarlo con DOM
    htmlCode += `<li class="searchList__li">`;//poner clase favorita
    for (const serie of seriesArray) {
        //aplico la clase favorita
        let isFavoriteClass;
        if (isFavoriteSerie(serie)) {
          isFavoriteClass = 'favorite';
        } else {
          isFavoriteClass = '';
        }
        const seriesName = serie.name;
        // const seriesId = serie.id;
        const fav = '⭑';
        const serieImgsObj = serie.image; //objeto con las imágenes
        // si no existe img medium, saca la default img y si no la suya
        let myImg = serieImgsObj === null ? defaultImg : serieImgsObj.medium;
        htmlCode += '<div class="searchList__container">';
        htmlCode += `<img class="${isFavoriteClass} favImg js-seriesImg" src="${myImg}" alt="${seriesName}" title="${seriesName}" size="210x295">`;
        htmlCode += `<h3 class="searchList__title ${isFavoriteClass} title js-seriesTitle">${seriesName} ${fav}`;
        // htmlCode += `ID:<span>${seriesId}</span></h3>`;
        htmlCode += '</div></li>';
    }
    ulResultsElement.innerHTML = htmlCode;
    // escuchar eventos
}


// prevenir envío form
function handleForm(ev) {
    ev.preventDefault();
}
formElement.addEventListener('submit', handleForm);

//quitar antes de subir
searchBtnElement.click()