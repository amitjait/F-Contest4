
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

        search.onclick = searchedHistory;

        searches.appendChild(search);

    }
}

createHistory();

function newSearch(){
    window.location.href = window.location.origin;
}

function clearSearch(){
    localStorage.clear();
    window.location.href = window.location.href;
}

function searchedHistory(e){

    localStorage.setItem('currId', e.target.id);

    window.location.href = window.location.origin +"/Searched";
}