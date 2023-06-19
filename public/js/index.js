//FUNCTION TO MAKE AN HTTP GET REQUEST
function getData(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            callback(data)
        }
    };
    xhr.send();
}

//FUNCTION TO POPULATE MOVIE TITLES
function populateMovieTitles(movies) {
    var moviesContainer = document.querySelector('.movies_title_container');

    movies.forEach(function(movie) {
        var movieItem = document.createElement('div');
        movieItem.className = 'movies_item';
        movieItem.textContent = movie.title;
        movieItem.addEventListener('click', function() {
            showMovieDetails(movie);
        });
        moviesContainer.appendChild(movieItem);
    });
}

//FUNCTION TO SHOW MOVIE DETAILS
function showMovieDetails(movie){
    var titleElement = document.querySelector('.title');
    var releaseDateElement = document.querySelector('.release_date');
    var descriptionElement = document.querySelector('.description');

    titleElement.textContent = movie.title;
    descriptionElement.textContent = movie.opening_crawl;
    releaseDateElement.textContent = formatReleaseDate(movie.release_date);
}

//FUNCTION TO FORMAT RELEASE DATE A mm/dd/yyyy
function formatReleaseDate(dateString){
    var date = new Date(dateString);
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    var year = date.getFullYear();
    return month + '/' + day + '/' + year; 
}

//API ENDPOINT
var apiUrl = 'https://swapi.py4e.com/api/films/';

//FETCH MOVIE DATA
getData(apiUrl, function(data){
    var movies = data.results;
    var loadingElement = document.querySelector('.loading');
    loadingElement.style.display = 'none';
    populateMovieTitles(movies);
});
