    
    // main function to sarch and add searched results in currrent window and local staorage
    async function search(){

        let input = document.getElementById('input').value;

        // check for input null 

        if(input == ""){
            alert("Enter valid name!");
            return;
        }

        // getting API url from URL function for fetch data  
        let api = url();
        

        // try and catch for error handling 
        try {

            // fecthing data from API call 
            let response = await fetch(api);

            // checking if status is false
            if(!response.ok){
                console.log(response.ok);
                throw `Status Code : ${response.status}`;
            }

            // getting data object by response json
            let data = await response.json();

            //  creating a date stamp for searched date 
            // and addng this to current data for future use
            let date = dateTime();

            data["Date"] = date;
            data["Input"] = input;
            

            // now creating HTML for fecthed data in search page 
            createMovieHtml(data);
            
            // adding a message box for search confirmation 
            let message = document.getElementById('message');
            message.innerHTML = `Book Result for ${input}`;
            message.style.display = "block";

            // adding data in localstorage with ID
            let id = localStorage.length+1;
            localStorage.setItem(id, JSON.stringify(data));

        } catch (error) {
            alert("Enter a valid name");
            console.log("Error", error);
            return;
        }
        
    }


    // URL function to make URL for API fecthing 
    function url(){
        let input = document.getElementById('input').value;

        if(input == ""){
            alert("Enter Author name or Movie name to Search!");
            return;
        }


        // merged input with "+" between multiple searched words 
        let searched = mergedInput(input);

        return `https://www.googleapis.com/books/v1/volumes?q=${searched}`;
    }

    // merged input function  
    function mergedInput(input){
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


    //  Function to generate HTML content in search page after searching 
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
            

            let auth = "";
            book['authors'].map((author)=>{
                auth += `${author}, `;
            })

            authors.innerHTML = "Author : "+auth;
            console.log(auth);

            let pd = document.createElement('p');
            pd.innerHTML = `Published Date : ${book['publishedDate']}`;

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

// date and time function to create Date stamp
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

    // condition to visible History button in searh page 
    if(localStorage.length > 0){
        document.getElementById('history').style.display = "block";
    }else{
        document.getElementById('history').style.display = "none";
    }

    function history(){
        window.location.href = "History";
    }


    // condtion for searched result page 
    // if user has searched before on the next time it will be redirect to history page 
    if(localStorage.length > 0){
        window.location.href = "History";
    }

