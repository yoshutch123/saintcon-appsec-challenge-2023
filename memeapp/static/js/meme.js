function shareMeme(memeId) {
    const username = document.querySelector("#username").value;

    fetch(`/memes/${memeId}/shares`, {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"username": username}),
    }).then(p => document.querySelector("#message").classList.remove("d-none"));
}

function getComments(memeId) {
    const commentsDiv = document.querySelector("#comments");
    commentsDiv.innerHTML = "";
    fetch(`/memes/${memeId}/comments`, {
        method: "GET",
        mode: "cors",
        credentials: "same-origin"
    }).then(p => p.json()).then((j) => {
        for (const comment of j['comments']) {
            let div = document.createElement("div");
            let h = document.createElement("h3");
            let p = document.createElement("p");
            div.classList.add("m-5");
            div.classList.add("p-5");
            div.classList.add("border");
            h.innerHTML = `${comment["title"]} - <small class="text-muted"><a href="/users/${comment["author"]["id"]}">${comment["author"]["username"]}</a></small>`;
            p.innerHTML = comment["body"];
            div.appendChild(h);
            div.appendChild(p);
            commentsDiv.appendChild(div);
        }
    });
}

function submitComment(memeId) {
    const title = document.querySelector("#title").value;
    const body = document.querySelector("#body").value;

    fetch(`/memes/${memeId}/comments`, {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"title": title, "body":body}),
    }).then(p => getComments());
}

// getComments();