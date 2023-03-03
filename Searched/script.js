
function createSearched(){
    let data = JSON.parse(localStorage.getItem(localStorage.getItem("currId")));
    console.log(data);
    currentSearch(data, localStorage.getItem("currId"));

    createMovieHtml(data);
}

function currentSearch(book, currID){
    let searches = document.getElementById('searched');

    let search = document.createElement('div');
    search.setAttribute('class', 'search');

    let inp = document.createElement('div');
    inp.setAttribute('class', 'input');
    inp.innerHTML = `${currID}. ${book["Input"]}`;

    let dateTime = document.createElement('div');
    dateTime.setAttribute('class', 'dateTime');

    dateTime.innerHTML = book["Date"];

    search.append(inp, dateTime);
    search.setAttribute('id', currID);

    // search.onclick = searchedHistory;

    searches.appendChild(search);
}

function createMovieHtml(data){

    let books = data["items"];

    let result = document.getElementById('resultBox');
    result.innerHTML ="";

    books.map((b) =>{
        let book = b['volumeInfo'];

        let movie = document.createElement('div');
        movie.setAttribute('class', "movie");

        let imgConta = document.createElement('div');
        imgConta.setAttribute('class','img-Container');

        let img = document.createElement('img');
        img.src = book['imageLinks']['thumbnail'];

        imgConta.appendChild(img);

        let info = document.createElement('div');
        info.setAttribute('class', 'info');
        
        let title = document.createElement('p');
        title.innerHTML = `Title : ${book['title']}`;

        let authors = document.createElement('p');
        authors.innerHTML = "Author";

        book['authors'].map((author)=>{
            author.innerHTML += `${author}`;
        })

        let pd = document.createElement('p');
        pd.innerHTML = `${book['publishedDate']}`;

        let rating = document.createElement('p');
        rating.innerHTML = `Average Rating : ${book['averageRating']}`;

        let lang = document.createElement('p');
        lang.innerHTML = `Language : ${book['language']}`;

        info.append(title, authors, pd, rating, lang);

        let btn = document.createElement('button');
        btn.setAttribute('id', "buyNow");
        btn.innerHTML = "Buy Now";

        

        movie.append(imgConta, info, btn);

        result.appendChild(movie);

    })

}

createSearched();