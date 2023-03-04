
// function to create HTML in history page after fetching data from local storage
function createHistory(){
    let searches = document.getElementById('searched');

    for(let i=1; i<=localStorage.length; i++){
        let book = JSON.parse(localStorage.getItem(i));
        console.log(book["Date"], book["Input"]);

        let search = document.createElement('div');
        search.setAttribute('class', 'search');

        let inp = document.createElement('div');
        inp.setAttribute('class', 'input');
        inp.innerHTML = `${i}. ${book["Input"]}`;

        let dateTime = document.createElement('div');
        dateTime.setAttribute('class', 'dateTime');
        dateTime.innerHTML = book["Date"];

        search.append(inp, dateTime);
        search.setAttribute('id', i);

        // adding onclick functioin to history block
        search.onclick = searchedHistory;

        searches.appendChild(search);

    }
}

createHistory();

// funnction to go back origin page after clearing the history
function newSearch(){
    window.location.href = window.location.origin;
}

//  clear search history function
function clearSearch(){
    localStorage.clear();
    window.location.href = window.location.href;
}

// funcction to go for searched page

function searchedHistory(e){

    localStorage.setItem('currId', e.target.id);

    window.location.href = window.location.origin +"/Searched";
}


// condition for displaying New Search and Clear search buttn

if(localStorage.length == 0){
    document.getElementById('newSearch').style.display = "block";
    document.getElementById('clearSearch').style.display = "none";
}else{
    document.getElementById('newSearch').style.display = "none";
    document.getElementById('clearSearch').style.display = "block";
}