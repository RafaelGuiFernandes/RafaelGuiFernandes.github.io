// RAWG API KEY
const API_KEY = '304bd6ce76e5423baf9905d7c8f28b0c';
// FUNCTIONS DECLARATION
function getApiDataMain(){
    // GET platforms
    try{
        fetch(`https://api.rawg.io/api/platforms?key=${API_KEY}&page_size=6`)
        .then(response => response.json())
        .then(data => {
            console.log(data.results);
            let platform = ''
            for (let i = 0 ; i < 6 ; i++)
            {
                let array = data.results[i]
                platform =
                `<div class="col-sm-6 col-md-4 card-platform">
                    <div class="card">
                        <img src="${array.image_background}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${array.name}</h5>
                            <a href="#" class="btn btn-primary">Mais Detalhes</a>
                        </div>
                    </div>
                </div>`
                document.getElementById('platforms-cards').innerHTML += platform
            }
        })
    }catch(error){
        console.log(error);
    }
    // GET Carousel games
    try{
        fetch(`https://api.rawg.io/api/games?key=${API_KEY}&dates=2019-09-01,2019-09-30&platforms=18,1,7&page_size=3`)
        .then(response => response.json())
        .then(data => {
            let carousel = ''
            let arrayP = '' // platforms
            let arrayG = '' // genres
            let ip = 0 
            let ig = 0
            for (let i = 0 ; i < 3 ; i++)
            {
                let array = data.results[i] // principal
                // platforms
                while(ip < array.platforms.length){
                    arrayP += `${array.platforms[ip].platform.name}, `
                    ip++
                }
                // genre
                while(ig < 3){
                    arrayG += `${array.genres[ig].name}, `
                    ig++
                }
                if(i == 0) // active
                {
                    carousel =
                    `<div class="carousel-item active">
                        <div class="carousel-img">
                            <img src="${array.background_image}">
                        </div>
                        <p><span class="carousel-title">${array.name}</span> <br>Release Date: ${array.released} <br>Metacritic: ${array.metacritic} <br>
                        Genres: ${arrayG} <br>Platforms: ${arrayP}</p>
                    </div>`
                }
                else{
                carousel =
                `<div class="carousel-item">
                    <div class="carousel-img">
                        <img src="${array.background_image}">
                    </div>
                    <p><span class="carousel-title">${array.name}</span> <br>Release Date: ${array.released} <br>Metacritic: ${array.metacritic} <br>
                    Genres: ${arrayG} <br>Platforms: ${arrayP}</p>
                </div>`
                }

                document.getElementById('carousel-inner').innerHTML += carousel
            }
        })
    }catch(error){
        console.log(error);
    }
    // GET Games Cards
    try{
        fetch(`https://api.rawg.io/api/games?key=${API_KEY}&dates=2019-09-01,2019-09-30&platforms=18,1,7&page_size=12`)
        .then(response => response.json())
        .then(data => {
            let card = ''
            let arrayP = '' // platforms
            let arrayG = '' // genres
            let ip = 0 
            let ig = 0
            for (let i = 0 ; i < 12 ; i++)
            {
                let array = data.results[i]
                while(ip < array.platforms.length){
                    arrayP += `${array.platforms[ip].platform.name}, `
                    ip++
                }
                while(ig < 3){
                    arrayG += `${array.genres[ig].name}, `
                    ig++
                }
                card =
                `<div class="col-sm-6 col-md-4 card-game">
                    <div class="card">
                        <div class="card-img">
                            <img src="${array.background_image}">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${array.name}</h5>
                            <p>
                                Release Date: ${array.released}<br>
                                Metacritic: ${array.metacritic}<br>
                                Genre: ${arrayG}<br>
                                Platforms: ${arrayP}<br>
                            </p>
                            <a href="detalhes.html?id=${array.id}" class="btn btn-primary">Mais Detalhes</a>
                        </div>
                    </div>
                </div>`
                document.getElementById('release-cards').innerHTML += card
            }
        })
    }catch(error){
        console.log(error);
    }
}
// show game details
function exibe_game(id) {
    let idx = id
    fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}&dates=2019-09-01,2019-09-30&platforms=18,1,7`)
    .then(response => response.json())
    .then(data => {
        // Detalhes Nome / Descricao 
        document.getElementById('detalhes').innerHTML = `<h1>${data.name}</h1><p>${data.description}</p>`
        // genres
        let genres = ''
        for(let i = 0 ; i < data.genres.length ; i++ )
        {
            genres += `${data.genres[i].name}, `
        }
        // platforms
        let platforms = ''
        for(let i = 0 ; i < data.platforms.length ; i++ )
        {
            platforms += `${data.platforms[i].platform.name}, `
        }
        // publishers
        let publishers = ''
        for(let i = 0 ; i < data.publishers.length ; i++ )
        {
            publishers += `${data.publishers[i].name}, `
        }
        // developers
        let developers = ''
        for(let i = 0 ; i < data.developers.length ; i++ )
        {
            developers += `${data.developers[i].name}, `
        }
        // stores
        let stores = ''
        for(let i = 0 ; i < data.stores.length ; i++ )
        {
            stores += `<a href="${data.stores[i].store.domain}">${data.stores[i].store.name}<a><br>`
        }
        // esrb rating
        let esrb = ``
        if(data.esrb_rating != null){
            esrb = `${data.esrb_rating.name}`
        }
        else {
            esrb = `Not Rated`
        }
        // metacritic
        let metacritic = ''
        if(data.metacritic >= 0 ) { 
            metacritic = `${data.metacritic}`
        }
        else { 
            metacritic = 'Not Rated' 
        }   
        // carousel
        fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY}&dates=2019-09-01,2019-09-30&platforms=18,1,7`)
        .then(response => response.json())
        .then(data => {
            images = data.results
            let carousel = ``

            for (let i = 0 ; (i < 3) && (i < images.length) ; i ++)
            {
                if(i == 0)
                {
                    carousel += `<div class="carousel-item active">
                                    <img src="${images[i].image}">
                                </div>` 
                }
                else{
                    carousel += `<div class="carousel-item">
                                    <img src="${images[i].image}">
                                </div>`                          
                }
            }
            console.log(carousel)
            // carousel images
            document.getElementById('carousel-inner1').innerHTML = carousel
        })
        // Detalhes info1
        document.getElementById('info1').innerHTML =
        `<p>
            Genre: ${genres}<br>
            Release Date: ${data.released}<br> 
            Platforms: ${platforms}<br>

        </p>`
        // Detalhes info2
        document.getElementById('info2').innerHTML =
        `<p>
            Publisher: ${publishers}<br>
            Developer: ${developers} <br>
            Age Rating: ${esrb} <br>
            Metacritic:: ${metacritic}<br>
        </p>`
        // Detalhes stores
        document.getElementById('stores').innerHTML =  `<p>Available on: <br>${stores}</p>`
    })
}
// show other games
function other_games(){
    fetch(`https://api.rawg.io/api/games?key=${API_KEY}&dates=2019-09-01,2019-09-30&platforms=18,1,7&page_size=18`)
    .then(response => response.json())
    .then(data => {
        let cards = ''
        let x = Math.floor(Math.random() * 10) + 3;
        for(let i = x - 3 ; i < x ; i ++) 
        {
            let array = data.results[i]
            // platforms
            let platforms = ''
            if( !array.platforms ){
                platforms = 'API Error'
            }
            else{
                for(let iP = 0 ; iP < array.platforms.length ; iP++ )
                {
                    platforms += `${array.platforms[iP].platform.name}, `
                }
            }
            // genres
            let genre = ''
            for(let iG = 0 ; iG < array.genres.length ; iG++ )
            {
                genre += `${array.genres[iG].name}, `
            }
            // create card
            cards += `<div class=" col-md-6 col-lg-4 Mcard-game">
                        <div class="card">
                        <img src="${array.background_image}">
                        <div class="card-body">
                            <h1 class="card-title">${array.name}</h1>
                            <p>
                                Metacritic: ${array.metacritic}<br>
                                Genre: ${genre}<br>
                                Platforms: ${platforms}<br>
                            </p>
                            <a href="detalhes.html?id=${array.id}" class="btn btn-primary">Mais Detalhes</a>
                        </div>
                        </div>
                    </div>`
        } // fim repetir

        document.getElementById('more_games').innerHTML = cards

    })

}
// show search result
function searchGame( text ) {
    fetch(`https://api.rawg.io/api/games?&key=${API_KEY}&dates=2007-09-01,2019-09-30&platforms=18,1,7&search={${text}}`)
    .then( response => response.json())
    .then( data => {
        const resultMsg = document.getElementById('search-title')
        let game = ''
        
        if(data.results.length <= 0)
        {
            resultMsg.innerText = `No Results found for "${text}"`
        }else{
            resultMsg.innerText = `Showing results for "${text}"`
            for(let i = 0 ; i < data.results.length ; i ++) 
            {
                let array = data.results[i]
                if(array.ratings_count > 75) // se game popular
                {
                // obter string com platforms
                let platforms = ''
                if( !array.platforms ){
                    platforms= 'API Error'
                }
                else{
    
                    for(let iP = 0 ; iP < array.platforms.length ; iP++ )
                    {
                        platforms += `${array.platforms[iP].platform.name}, `
                    }
                }
    
                // obter string com genres
                let genre = ''
                for(let iG = 0 ; iG < array.genres.length ; iG++ )
                {
                    genre += `${array.genres[iG].name}, `
                }
    
                
    
                game += `<div class=" col-md-6 col-lg-4 card-game">
                            <div class="card">
                            <img src="${array.background_image}">
                            <div class="card-body">
                                <h1 class="card-title">${array.name}</h1>
                                <p>
                                    Metacritic: ${array.metacritic}<br>
                                    Genre: ${genre}<br>
                                    Platforms: ${platforms}<br>
                                </p>
                                <a href="detalhes.html?id=${array.id}" class="btn btn-primary">Mais Detalhes</a>
                            </div>
                            </div>
                        </div>`
                }
            }
            // append cards
            document.getElementById('search-result').innerHTML = game
        }
    })
}
// submit user search input
function submitSearch(event){
    event.preventDefault();
    const text = document.getElementById('search_text').value
    if( text != null){
        location.href = `search.html?name=${text}`;
    }
}
// ON APP START
document.addEventListener("DOMContentLoaded" , () => {
    // listen for search submit
    document.getElementById('srcf').addEventListener('submit' , submitSearch);
});