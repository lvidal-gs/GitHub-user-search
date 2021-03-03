function catchUser(user){
    user = document.getElementById('busca').value;
    return user;
}

function verifyIfUserExists(){
    const user = catchUser();
    const urlVerifier = `https://api.github.com/users/${user}`

    fetch(urlVerifier).then(response => {
        return response.json();
    }).then(response => {
        const login = response.login;
        if (login) {
            searchRepositories();
        } else {
            userDontExist();
        }
    })
}

function userDontExist(){
    clearScreen();
    const dontExist = document.querySelector('.user');
    dontExist.innerHTML = `
            <div class="user">
                <img id="errorPhoto" src="./images/dontExist.png">
                <h1 id="error">This user does not exist!</h1>
                <p style="font-size: 32px;">Please, try another user and search again</p>
            </div>
        `

        repos.innerHTML += repo

}

function searchRepositories(){
    const user = catchUser();
    const url = `https://api.github.com/users/${user}/repos?page=1&per_page=1000`;

    fetch(url).then(response => {
        return response.json();
    }).then(response => {
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

function renderUserInfo(){
    const user = catchUser();

    fetch(`https://api.github.com/users/${user}/repos?page=1&per_page=1000`).then(response => {
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