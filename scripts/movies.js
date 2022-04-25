// Implement debouncing for network request
// On clicking book now store the selected movie in localstorage as key "movie"
// so that you can retrive it on checkout.html page

let wallet_balance = JSON.parse(localStorage.getItem("amount"))
wallet.innerText = wallet_balance;

document.getElementById("search").addEventListener("input", function(){
    debounce(main, 500)
});
let id;

async function show(){
    try{
        let query = document.getElementById("search").value;
        let res = await fetch(`https://www.omdbapi.com/?apikey=2096ac23&s=${query}`)
        let data = await res.json();
        return data.Search;
    }
    catch(err){
        console.log(err);
    }
}

let movies = document.getElementById("movies")

function append(data) {
    movies.innerText = null;

    data.forEach(function(el){
        let cards = document.createElement("div")
        movies.append(cards)

        let imgBox =  document.createElement("div")
        imgBox.setAttribute("class", "imgBox")
        let poster = document.createElement("img")
        poster.src = el.Poster;

        let title = document.createElement("p")
        title.innerText = el.Title;

        let book = document.createElement("button")
        book.innerText = "Book Now"
        book.setAttribute("class", "book_now")
        book.addEventListener("click", function(){
            bookNow(el)
        })

        imgBox.append(poster)
        cards.append(imgBox, title, book)
    })
}

function bookNow(el){
    window.location.href = "checkout.html"
    localStorage.setItem("movie", JSON.stringify(el))
}

async function main(){
    let data = await show();
    if(data == undefined){
        return false;
    }
    append(data)
}

function debounce(func, delay){
    if(id){
        clearTimeout(id)
    }
    id = setTimeout(function(){
        func();
    },delay)
}