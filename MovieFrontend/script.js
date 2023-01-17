const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c4c92cd4db5d4d31c5a19f78a99e1696&page=1';
const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const APISEARCH = "https://api.themoviedb.org/3/search/movie?&api_key=c4c92cd4db5d4d31c5a19f78a99e1696&query=";

const section = document.getElementById('sect');
const form = document.getElementById('form');
const search = document.getElementById('query');

const prev = document.querySelector('#prev');
prev.onclick = prevPage;
const next = document.querySelector('#next');
next.onclick = nextPage;

const nomore = document.querySelector('#nomore');
const load = document.querySelector('#load');

let currentPage = 1;
let currentUrl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c4c92cd4db5d4d31c5a19f78a99e1696';

fetchMovies(currentUrl + '&page=' + currentPage);

function fetchMovies(url) {
    loading();
    let idx = url.indexOf('&page=');
    let tmp = "", tmpidx = idx + 6;

    while(isNum(url[tmpidx])) {
        tmp += url[tmpidx];
        tmpidx++;
    }

    currentPage = parseInt(tmp);
    currentUrl = url.substring(0, idx);

    fetch(url).then(response => response.json())
    .then(function(data){
        let i = 0;
        data.results.forEach(e => {
            i++;
            const cardDiv = document.createElement('div');
            cardDiv.setAttribute('class', 'card');

            const rowDiv = document.createElement('div');
            rowDiv.setAttribute('class', 'row');

            const colDiv = document.createElement('div');
            colDiv.setAttribute('class', 'col');

            const img = document.createElement('img');
            img.setAttribute('class', 'thumbnail');
            img.setAttribute('id', 'image');

            const title = document.createElement('h3');
            title.setAttribute('id', 'title');

            const center = document.createElement('center');

            if (e.title.length > 25) title.innerHTML = `${e.title.substring(0, 25) + '...'}`;
            else title.innerHTML = `${e.title}`;

            title.innerHTML += `<br><br><br><a class="reviewop" href="movie.html?id=${e.id}&title=${e.title}">See Reviews 📝</a>`;
            img.src = IMGPATH + e.poster_path;

            //append (insert)
            center.appendChild(img);
            cardDiv.appendChild(center);
            cardDiv.appendChild(title);
            colDiv.appendChild(cardDiv);
            rowDiv.appendChild(colDiv);
            section.appendChild(rowDiv);
        });

        resetState();
        if (i <= 0) {
            next.style.display = 'none';
            nomore.style.display = 'block';
        } else {
            let leftover = 4 - (i%4);
            if (leftover === 4) leftover = 0;
            while (leftover--) {
                const cardDiv = document.createElement('div');
                cardDiv.setAttribute('class', 'moviecard');

                const rowDiv = document.createElement('div');
                rowDiv.setAttribute('class', 'row');

                const colDiv = document.createElement('div');
                colDiv.setAttribute('class', 'col');

                const img = document.createElement('img');
                img.setAttribute('class', 'thumbnail');
                img.setAttribute('id', 'image');

                const title = document.createElement('h3');
                title.setAttribute('id', 'title');

                const center = document.createElement('center');

                const invis = "This is an invisible string just to improve positioning";
                if (invis.length > 25) title.innerHTML = `${invis.substring(0, 25) + '...'}`;
                else title.innerHTML = `${invis}`;
                title.innerHTML += `<br><br><br><h3 class="reviewop">See Reviews 📝</h3>`;
                
                center.appendChild(img);
                cardDiv.appendChild(center);
                cardDiv.appendChild(title);
                colDiv.appendChild(cardDiv);
                rowDiv.appendChild(colDiv);
                rowDiv.style.visibility = 'hidden';
                section.appendChild(rowDiv);
            }
        }
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    section.innerHTML = '';
    
    const searchVal = search.value;

    if (searchVal) {
        fetchMovies(APISEARCH + searchVal + '&page=1');
        search.value = '';
    } else {
        fetchMovies(APILINK);
    }
});

function prevPage() {
    section.innerHTML = '';
    fetchMovies(currentUrl + '&page=' + (currentPage - 1));
}

function nextPage() {
    section.innerHTML = '';
    fetchMovies(currentUrl + '&page=' + (currentPage + 1));
}

function resetState() {
    next.style.display = 'inline-block';

    if (currentPage === 1) prev.style.display = 'none';
    else prev.style.display = 'inline-block';

    nomore.style.display = 'none';
    load.style.display = 'none';
}

function loading() {
    load.style.display = 'block';
    next.style.display = 'none';
    prev.style.display = 'none';
}

function isNum(char) {
    return /^\d+$/.test(char);
}