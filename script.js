    async function search(){

        let input = document.getElementById('input').value;

        if(input == ""){
            alert("Enter valid name!");
            return;
        }
        let api = url();
        
        try {

            let response = await fetch(api);

            if(!response.ok){
                console.log(response.ok);
                throw `Status Code : ${response.status}`;
            }

            let data = await response.json();

            let date = dateTime();

            data["Date"] = date;
            data["Input"] = input;
            console.log(data);
            
            createMovieHtml(data);
            
            let message = document.getElementById('message');
            message.innerHTML = `Book Result for ${input}`;
            message.style.display = "block";

            localStorage.setItem(localStorage.length+1, JSON.stringify(data));

        } catch (error) {
            alert("Enter a valid name");
            console.log("Error", error);
            return;
        }
        
    }

    function url(){
        let input = document.getElementById('input').value;

        if(input == ""){
            alert("Enter Author name or Movie name to Search!");
            return;
        }

        let searched = splitInput(input);

        return `https://www.googleapis.com/books/v1/volumes?q=${searched}`;
    }

    function splitInput(input){
        let inputMerged = "";

        let curr = "";
        let isSpace = false;
        for(let i=0; i<input.length; i++){
            let c = input.charAt(i);
            if(c == " " && !isSpace){
                inputMerged += curr + '+';
                curr = "";
                isSpace = true;
            }else if(c != " "){
                isSpace = false;
                curr += c;
            }
        }

        return inputMerged+curr;
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


    function dateTime(){
        let d = new Date();
        let date = "Searched On: ";

        date += d.getDate() < 10 ? ("0"+d.getDate()+"/") : (d.getDate()+"/");
        date += d.getMonth()+1 < 10 ? ("0"+(d.getMonth()+1)+"/") : (d.getMonth()+"/");
        date += d.getFullYear()+" ";

        date += d.getHours() > 12 ? (d.getHours()%12)+":" : (d.getHours())+":" ;
        date += d.getMinutes() < 10 ? ("0"+d.getMinutes()) : d.getMinutes();

        date += d.getHours() > 12 ? "PM" : "AM";

        return date;

    }

    if(localStorage.length > 0){
        document.getElementById('history').style.display = "block";
    }else{
        document.getElementById('history').style.display = "none";
    }

    function history(){
        window.location.href = "History";
    }


    if(localStorage.length > 0){
        window.location.href = "History";
    }