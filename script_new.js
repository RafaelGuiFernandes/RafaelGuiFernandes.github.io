// function create Game Card
// Param -  image, title, release date, metacritic , genres , platforms , id
card = (image, name , released , metacritic , genres , platforms,id) => {
    
    let str = `<div class="col-sm-6 col-md-4 card-game">
                    <div class="card">
                        <img src="${image}">
                        <div class="card-body">
                            <h5 class="card-title">${name}</h5>
                            <p>
                                Release Date: ${released}<br>
                                Metacritic: ${metacritic}<br>
                                Genre: ${genres}<br>
                                Platforms: ${platforms}<br>
                            </p>
                            <a href="detalhes.html?id=${id}" class="btn btn-primary">Mais Detalhes</a>
                        </div>
                    </div>
                </div>`;

    return str;
}

// Function create Platform Card
// Param image, title 
platform = (image, name) => {

    let str =   `<div class="col-sm-6 col-md-4 card-plataforma">
                    <div class="card">
                        <img src="${image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${name}</h5>
                            <a href="#" class="btn btn-primary">Mais Detalhes</a>
                        </div>
                    </div>
                </div>`;
    
    return str;
}

// Function create carousel Card
// Param image , name , released , metacritic , genres , platforms
carousel = (image , name , released , metacritic , genres , platforms, active) => {

    let str = ''
    if(active == true){

        str =  `<div class="carousel-item active">
                    <img src="${image}">
                    <p><span class="carousel-title">${name}</span> <br>Release Date: ${released} <br>Metacritic: ${metacritic} <br>
                    Genres: ${genres} <br>Platforms: ${platforms}</p>
                </div>`

    }else{
        str =`<div class="carousel-item">
                <img src="${image}">
                <p><span class="carousel-title">${name}</span> <br>Release Date: ${released} <br>Metacritic: ${metacritic} <br>
                Genres: ${genres} <br>Platforms: ${platforms}</p>
            </div>`
    }

}