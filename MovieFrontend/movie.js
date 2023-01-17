const Url = new URL(location.href);
const movieId = Url.searchParams.get("id");
const movieTitle = Url.searchParams.get("title");

const REVIEWLINK = 'http://localhost:8000/api/v1/reviews/';

const section = document.getElementById('sect');
const empty = document.getElementById('empty');

const rtitle = document.getElementById('rtitle');
rtitle.innerText = movieTitle;

fetchReviews(REVIEWLINK);

function fetchReviews(url) {
    fetch(url + "movie/" + movieId).then(response => response.json())
    .then(function(data){
        empty.style.display = 'none';
        let i = 0;

        const addDiv = document.createElement('div');
        addDiv.innerHTML = `
            <div class="row">
                <div class="col">
                    <div class="card" id="newcard">
                        Post New Review
                        <p>
                            <strong>Review : </strong>
                            <p> </p>
                            <input type="text" id="addedReview">
                        </p>
                        <br>
                        <p>
                            <strong>By : </strong>
                            <p> </p>
                            <input type="text" id="addedUser">
                        </p>
                        <br>
                        <p>
                            <a href="#newcard" onclick="saveReview('addedReview', 'addedUser')" class="reviewctrl">Post ✅</a>
                        </p>
                    </div>
                </div>
            </div>
        `;
        section.appendChild(addDiv);

        data.forEach(r => {
            i++;
            const cardDiv = document.createElement('div');
            cardDiv.innerHTML = `
                <div class="row">
                    <div class="col">
                        <div class="card" id="${r._id}">
                            <p><strong>Review : </strong>${r.review}</p>
                            <p><strong>By : </strong>${r.user}</p>
                            <br>
                            <p>
                                <a href="#${r._id}" onclick="editReview('${r._id}', '${r.user}', '${r.review}')" class="reviewctrl">Edit ✏️</a>
                                <a href="#${r._id}" onclick="deleteReview('${r._id}')" class="reviewctrl">Delete ❌</a>
                            </p>
                        </div>
                    </div>
                </div>
            `;
            section.appendChild(cardDiv);
        });

        if(!i) empty.style.display = 'inline-block';
    });
}

function editReview(id, user, review) {
    const rCard = document.getElementById(id);
    const reviewInputId = "review" + id;
    const userInputId = "user" + id;

    rCard.innerHTML = `
        <p>
            <strong>Review : </strong>
            <p> </p>
            <input type="text" id="${reviewInputId}" value="${review}">
        </p>
        <br>
        <p>
            <strong>By : </strong>
            <p> </p>
            <input type="text" id="${userInputId}" value="${user}">
        </p>
        <br>
        <p>
            <a href="#${id}" onclick="saveReview('${reviewInputId}', '${userInputId}', '${id}')" class="reviewctrl">Save 💾</a>
        </p>
    `
}

// ="" default value klo ga dikasi nilai masukan
function saveReview(reviewInputId, userInputId, id="") {
    const review = document.getElementById(reviewInputId).value;
    const user = document.getElementById(userInputId).value;

    if (id) {
        //Fetch defaultnya GET, jd kl mw yg lain hrs diedit
        fetch(REVIEWLINK + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"user": user, "review": review})
        }).then(res => {
            res.json();
            location.reload();
        });
    } else {
        fetch(REVIEWLINK + "new", {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"movieId": movieId, "user": user, "review": review})
        }).then(res => {
            res.json();
            location.reload();
        });
    }
    empty.style.display = 'none';
}

function deleteReview(id) {
    fetch (REVIEWLINK + id, {
        method: 'DELETE'
    }).then(res => {
        res.json();
        location.reload();
    })
}