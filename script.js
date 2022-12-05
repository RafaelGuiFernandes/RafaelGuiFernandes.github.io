
// --------------------------------  GET API plataformas

function getApiDataMain(){

    $.ajax({
        url: 'https://api.rawg.io/api/platforms?key=304bd6ce76e5423baf9905d7c8f28b0c',
        success: function (data){
            let plataforma = ''
            
            for (let i = 0 ; i < 6 ; i++)
            {
                
                let array = data.results[i]
                plataforma +=
                `<div class="col-sm-6 col-md-4 card-plataforma">
                    <div class="card">
                        <img src="${array.image_background}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${array.name}</h5>
                            <a href="#" class="btn btn-primary">Mais Detalhes</a>
                        </div>
                    </div>
                </div>`

            } // fim repetir

            document.getElementById('plataformas-cards').innerHTML = plataforma
        }
    })

    // -------------------------------- GET API Games Carousel

    $.ajax({
        url: 'https://api.rawg.io/api/games?key=304bd6ce76e5423baf9905d7c8f28b0c&dates=2019-09-01,2019-09-30&platforms=18,1,7',
        success: function (data){
            let carousel = ''
            let arrayP = '' // arranjo de plataformas
            let arrayG = '' // arranjo Generos
            let ip = 0 
            let ig = 0
            //let x = Math.floor(Math.random() * 51) // jogo aleatorio entre os 50 primeiros
            for (let i = 0 ; i < 3 ; i++)
            {
                let array = data.results[i] // principal
                
                while(ip < array.platforms.length){
                    arrayP += `${array.platforms[ip].platform.name}, `
                    ip++
                }

                while(ig < 3){
                    arrayG += `${array.genres[ig].name}, `
                    ig++
                }

                if(i == 0) // criar active
                {
                    carousel +=
                    `<div class="carousel-item active">
                        <img src="${array.background_image}">
                        <p><span class="carousel-title">${array.name}</span> <br>Release Date: ${array.released} <br>Metacritic: ${array.metacritic} <br>
                        Genres: ${arrayG} <br>Platforms: ${arrayP}</p>
                    </div>`
                }
                else{
                carousel +=
                `<div class="carousel-item">
                    <img src="${array.background_image}">
                    <p><span class="carousel-title">${array.name}</span> <br>Release Date: ${array.released} <br>Metacritic: ${array.metacritic} <br>
                    Genres: ${arrayG} <br>Platforms: ${arrayP}</p>
                </div>`
                }

            } // fim repetir
            
            document.getElementById('carousel-inner').innerHTML = carousel
        }
    })



    // -------------------------------- GET API Games Cards

    $.ajax({
        url: 'https://api.rawg.io/api/games?key=304bd6ce76e5423baf9905d7c8f28b0c&dates=2019-09-01,2019-09-30&platforms=18,1,7',
        success: function (data){
            let game = ''
            let arrayP = '' // arranjo de plataformas
            let arrayG = '' // arranjo Generos
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

                game +=
                `<div class="col-sm-6 col-md-4 card-game">
                    <div class="card">
                    <img src="${array.background_image}">
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
                
            } // fim repetir
            document.getElementById('lancamentos-cards').innerHTML = game
        }
    })

} // fim function getApiDataMain()

// funcao para mostrar detalhes de determinado game
// param id do game 
function exibe_game(id) {
    let idx = id
    $.ajax({
        url: `https://api.rawg.io/api/games/${id}?key=304bd6ce76e5423baf9905d7c8f28b0c&dates=2019-09-01,2019-09-30&platforms=18,1,7`,
        success: function (data){

            let background_image = `<img src="${data.background_image}" alt="">`

            // Detalhes Nome / Descricao 
            document.getElementById('detalhes').innerHTML = `<h1>${data.name}</h1>
                                                              <p>${data.description}</p>`

            // obter string com genres
            let genres = ''
            for(let i = 0 ; i < data.genres.length ; i++ )
            {
                genres += `${data.genres[i].name}, `
            }

            // obter string com plataformas
            let platforms = ''
            for(let i = 0 ; i < data.platforms.length ; i++ )
            {
                platforms += `${data.platforms[i].platform.name}, `
            }

            // obter string com publishers
            let publishers = ''
            for(let i = 0 ; i < data.publishers.length ; i++ )
            {
                publishers += `${data.publishers[i].name}, `
            }

            // obter string com developers
            let developers = ''
            for(let i = 0 ; i < data.developers.length ; i++ )
            {
                developers += `${data.developers[i].name}, `
            }

            // obter string com stores
            let stores = ''
            for(let i = 0 ; i < data.stores.length ; i++ )
            {
                stores += `<a href="${data.stores[i].store.domain}">${data.stores[i].store.name}<a><br>`
            }

            // obter string com esrb rating
            let esrb = ``
            if(data.esrb_rating != null){
                esrb = `${data.esrb_rating.name}`
            }
            else {
                esrb = `Not Rated`
            }
            
            // obter string com metacritic
            let metacritics = ''
            if(data.metacritic >= 0 )
            { 
                metacritics = `${data.metacritic}`
            }
            else
            {
                metacritics = 'Not Rated'
            }

            // obter string com imagens do carousel

            $.ajax({
                url: `https://api.rawg.io/api/games/${id}/screenshots?key=304bd6ce76e5423baf9905d7c8f28b0c&dates=2019-09-01,2019-09-30&platforms=18,1,7`,
                success: function (data){
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

                }
            })

            // Background image
            document.getElementById('background').innerHTML = `<img src="${data.background_image}" alt="...">`
            
            // Detalhes info1
            document.getElementById('info1').innerHTML =`<p>
                                                        Genre: ${genres}<br>
                                                        Release Date: ${data.released}<br> 
                                                        Platforms: ${platforms}<br>

                                                        </p>`

            // Detalhes info2
            document.getElementById('info2').innerHTML =`<p>
                                                        Publisher: ${publishers}<br>
                                                        Developer: ${developers} <br>
                                                        Age Rating: ${esrb} <br>
                                                        Meta Score: ${metacritics}<br>
                                                        </p>`

            // Detalhes stores
            document.getElementById('stores').innerHTML =  `<p>Available on: <br>${stores}</p>`
                                                   

        } // fim success function
    }) // fim ajax
} // fim function exibe_game()

// funcao para exibir outros games na pagina de detalhes
function other_games(){
    $.ajax({
        url: 'https://api.rawg.io/api/games?key=304bd6ce76e5423baf9905d7c8f28b0c&dates=2019-09-01,2019-09-30&platforms=18,1,7',
        success: function (data){
        let cards = ''
        let x = Math.floor(Math.random() * 10) + 3; // numero aleatorio entre 3 e 17

        for(let i = x - 3 ; i < x ; i ++) 
        {
            let array = data.results[i]
            

            // obter string com plataformas
            console.log('deu erro com esse' + array.id)
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

            // obter string com generos
            let genre = ''
            for(let iG = 0 ; iG < array.genres.length ; iG++ )
            {
                genre += `${array.genres[iG].name}, `
            }

            

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

        }// fim success function
    }) // fim ajax
} // fim function


// -------------------------------------- Search ---------------------------------
function steste(text1)
{
    console.log(text1)
}

function search_game( text ) {
    console.log(text)
    $.ajax({
        url: `https://api.rawg.io/api/games?&key=304bd6ce76e5423baf9905d7c8f28b0c&dates=2007-09-01,2019-09-30&platforms=18,1,7&search={${text}}`,
        success: function (data){
            
            let game = ''

            for(let i = 0 ; i < data.results.length ; i ++) 
            {
                let array = data.results[i]
                if(array.ratings_count > 75) // se game popular
                {
                // obter string com plataformas
                console.log('deu erro com esse' + array.id)
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
    
                // obter string com generos
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
            } // fim repetir

            if(game == '')
            {
                game = `<h1> No Results for '${text}' </h1>`
            }
            document.getElementById('search-result').innerHTML = game

            

        } // fim function
    }) // fim ajax
} // fim function search games

document.getElementById('sbtn').onclick = function(){
    let text = ''
    text = document.getElementById('search_text').value
    if( text != null){
        location.href = `search.html?name=${text}`;
    }

}




