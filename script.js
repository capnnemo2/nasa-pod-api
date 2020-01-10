'use strict';

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const hd = $('#hd-option').val();
        const date = $('#query-date').val();
        $('#results').empty();
        getPic(hd,date);
    })
}

function getPic(option, date) {
    const apiKey = `api_key=ScCaXLNhcegqriYbj4e6k17PlE8IGC9XVVm3eMFt`
    const url = `https://api.nasa.gov/planetary/apod`;
    const searchURL = url + '?' + `hd=` + option + '&' + `date=` + date + `&` + apiKey;
    console.log(searchURL);


    fetch(searchURL)
    .then(response => {
        if(response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayPic(responseJson))
    .catch(err => {
        $('#s-err-msg').text(`Zeus is cranky. Try again later.`);
    });
}

function displayPic(responseJson) {
    $('#results').removeClass('hidden');
    console.log(responseJson.explanation);
    console.log(responseJson.hdurl);
    $('#results').append(`<p>${responseJson.explanation}</p>`);
    $('#results').append(`<img src=${responseJson.hdurl} class="sweet-pic">`);
}




$(watchForm);