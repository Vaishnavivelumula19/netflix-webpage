// API key
const api_key = "api_key=b25bc9bbf946ee5164c5f0e1be5f29f2";
// Base URL of the site
const base_url = "https://api.themoviedb.org/3";
const banner_url = "https://image.tmdb.org/t/p/original";
const img_url = "https://image.tmdb.org/t/p/w500";

// Requests for movies data
const requests = {
    fetchTrending: `${base_url}/trending/all/week?${api_key}&language=en-US`,
    fetchNetflixOriginals: `${base_url}/discover/tv?${api_key}&with_networks=213`,
    fetchActionMovies: `${base_url}/discover/movie?${api_key}&with_genres=28`,
    fetchComedyMovies: `${base_url}/discover/movie?${api_key}&with_genres=35`,
    fetchHorrorMovies: `${base_url}/discover/movie?${api_key}&with_genres=27`,
    fetchRomanceMovies: `${base_url}/discover/movie?${api_key}&with_genres=10749`,
    fetchDocumentaries: `${base_url}/discover/movie?${api_key}&with_genres=99`,
};

// Used to truncate the string
function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

// Banner
fetch(requests.fetchNetflixOriginals)
    .then((res) => res.json())
    .then((data) => {
        console.log(data.results);
        // Every refresh the movie will be changed
        const setMovie = data.results[Math.floor(Math.random() * data.results.length - 1)];

        var banner = document.getElementById("banner");
        var banner_title = document.getElementById("banner__title");
        var banner__desc = document.getElementById("banner__description");

        banner.style.backgroundImage = "url(" + banner_url + setMovie.backdrop_path + ")";
        banner_title.innerText = setMovie.name;
        banner__desc.innerText = truncate(setMovie.overview, 150);
    });

// Movies rows
function createRow(title, posters) {
    const headrow = document.getElementById("headrow");
    const row = document.createElement("div");
    row.className = "row";
    headrow.appendChild(row);

    const rowTitle = document.createElement("h2");
    rowTitle.className = "row__title";
    rowTitle.innerText = title;
    row.appendChild(rowTitle);

    const rowPosters = document.createElement("div");
    rowPosters.className = "row__posters";
    row.appendChild(rowPosters);

    posters.forEach((movie) => {
        const poster = document.createElement("img");
        poster.className = "row__poster";
        var movieId = movie.id;
        poster.id = movieId;
        poster.src = img_url + movie.backdrop_path;
        rowPosters.appendChild(poster);
    });
}

// Fetch and create rows for different categories
fetch(requests.fetchNetflixOriginals)
    .then((res) => res.json())
    .then((data) => {
        createRow("NETFLIX ORIGINALS", data.results);
    });

fetch(requests.fetchTrending)
    .then((res) => res.json())
    .then((data) => {
        createRow("Top Rated", data.results);
    });

fetch(requests.fetchActionMovies)
    .then((res) => res.json())
    .then((data) => {
        createRow("Action Movies", data.results);
    });

fetch(requests.fetchComedyMovies)
    .then((res) => res.json())
    .then((data) => {
        createRow("Comedy Movies", data.results);
    });

fetch(requests.fetchHorrorMovies)
    .then((res) => res.json())
    .then((data) => {
        createRow("Horror Movies", data.results);
    });

fetch(requests.fetchRomanceMovies)
    .then((res) => res.json())
    .then((data) => {
        createRow("Romance Movies", data.results);
    });

fetch(requests.fetchDocumentaries)
    .then((res) => res.json())
    .then((data) => {
        createRow("Documentaries", data.results);
    });
