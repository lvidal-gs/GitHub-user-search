function searchRepositories() {
    const user = document.getElementById('busca').value;
    const url = `https://api.github.com/users/${user}/repos?page=1&per_page=10000`;

    fetch(url).then(response=> {
        return response.json();
    }).then(response=> {
        clearScreen();
        renderUserInfo();
        repositoriesList(response);
    })
}


function repositoriesList(response){
    for(let i in response){
        const repos = document.querySelector('.repos');
        const nameRepo = response[i].name;
        const imgUrl = response[i].language;
        const linkRepo = response[i].html_url;

        const repo = `
            <div class="repo">
                <div>
                    <h3 class="title-repo">${nameRepo}</h3>
                    <a class="link-repo" target="blank" href="${linkRepo}">Go to repository</a>
                </div>
                <img src="./images/${imgUrl}.png" class="lang" width="30%">
            </div>
        `

        repos.innerHTML += repo
    }
}

function renderUserInfo(response){
    const user = document.getElementById('busca').value;

    fetch(`https://api.github.com/users/${user}/repos?page=1&per_page=10000`).then(response => {
        return response.json();
    }).then(response => {
        const content = document.querySelector('.user')
        const userPhoto = response[0].owner.avatar_url;
        const userName = response[0].owner.login;
        const reposCount = response.length;

        content.innerHTML = `
            <img src="${userPhoto}">
            <h1>${userName}</h1>
            <p>${reposCount} repositories found</p>
        `
    })
}

function clearScreen() {
    const user = document.querySelector('.user');
    const repos = document.querySelector('.repos');

    user.innerHTML = '';
    repos.innerHTML = '';
}