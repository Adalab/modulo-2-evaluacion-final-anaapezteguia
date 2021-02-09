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

//llamada a API para coger pelis
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


// pintar series
function paintSearchResults() {
    let htmlCode = '';
    const defaultImg = 'https://via.placeholder.com/210x295/ffffff/666666/?';
    const defaultAlt = 'Imagen no disponible';
    htmlCode += '<li class="searchList__li js-movie">';
    for (const serie of seriesArray) {
        const seriesName = serie.name;
        const seriesId = serie.id;
        const serieImgsObj = serie.image;
        let myImg = '';
        for (const serieImg in serieImgsObj) {
            if (serieImg === 'medium'){
                myImg = serieImgsObj[serieImg];
                htmlCode += `<img class="js-movieImg" src="${myImg}" alt="${seriesName}" title="${seriesName}" size="210x295">`;
            } else if (serieImg === null){
                myImg = defaultImg;
                htmlCode += `<img class="js-movieImg" src="${myImg}" alt="${defaultAlt}" title="${defaultAlt}"  size="210x295">`;
            }
        }
        htmlCode += `<h3 class="searchList__title js-movieTitle">${seriesName} · ID:`;
        htmlCode += `<span>${seriesId}</span></h3>`;
        htmlCode += '</li>';
    }
    ulResultsElement.innerHTML = htmlCode;
}


// // prevenir envío form
function handleForm(ev) {
    ev.preventDefault();
}
formElement.addEventListener('submit', handleForm);