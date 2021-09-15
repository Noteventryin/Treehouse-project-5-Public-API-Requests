//Fetch function request 12 employee info from randomuser.me
const api = "https://randomuser.me/api/?results=12&nat=ca";
let employee = [];

fetch(api)
  .then((res) => res.json())
  .then(profile =>profile.results)
  .then(generateinfo)
  .catch(error => console.log("Something went wrong!",error))

//Create searchbar and add to the DOM dynamically.
function createsearchbar(){
    const searchbar = document.querySelector(".search-container");
    const element = 
    `<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`;
        searchbar.insertAdjacentHTML('beforeend',element);
}
createsearchbar();
//Display employee gallery.
const gallery = document.getElementById("gallery");
function generateinfo() {
    
    searchbarHTML = 
    `<div class="card">
        <div class="card-img-container">
                <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">first last</h3>
                <p class="card-text">email</p>
                 <p class="card-text cap">city, state</p>
            </div>
    </div>`;
            gallery.insertAdjacentHTML('beforeend', searchbarHTML);
}
generateinfo();
//Display modal.
const body = document.querySelector("body");
function displaymodal(){

    addDiv = `<div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
            <h3 id="name" class="modal-name cap">name</h3>
            <p class="modal-text">email</p>
            <p class="modal-text cap">city</p>
            <hr>
            <p class="modal-text">(555) 555-5555</p>
            <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
            <p class="modal-text">Birthday: 10/21/2015</p>
        </div>
    </div>`;
          body.insertAdjacentHTML('beforeend', addDiv);
}
displaymodal();