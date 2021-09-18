//Fetch function request 12 employee info from randomuser.me
const api = "https://randomuser.me/api/?results=12&nat=ca";
let employeelist = [];

fetch(api)
  .then(res => res.json())
  .then(profile =>profile.results)
  .then(generateinfo)
  .catch(error => console.log(error))

//Display employee gallery.Create and add basic information to html. 
const gallery = document.querySelector('#gallery');
function generateinfo(Data) {
    employeelist = Data
    Data.forEach((e,index) =>{
        const name = e.name
        const email = e.email
        const city = e.location.city
        const state = e.location.state
        const picture = e.picture.large
        searchbarHTML = 
        `<div class="card" data-index=${index}>
            <div class="card-img-container">
                    <img class="card-img" src="${picture}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${name.first} ${name.last}</h3>
                    <p class="card-text">${email}</p>
                    <p class="card-text cap">${city}, ${state}</p>
                </div>
        </div>`;
                gallery.insertAdjacentHTML('beforeend', searchbarHTML);
    })
}

//Regex DOB.
function formatdob(dob) {
    const year = dob.date.slice(0,4);
    const month = dob.date.slice(5,7)
    const day = dob.date.slice(8,10);

    return `${day}.${month}.${year}`;
}
//Display modal.
const body = document.querySelector("body");
let Index = 0;
function displaymodal(index){
    const {name, email, location, cell, dob, picture} = employeelist[index];
    let DOB = formatdob(dob);
    const regexCell = /^\D(\d{3})\D(\d{3})\D(\d{4})\D$/
    const cellFormat = cell.replace(regexCell, '($1) $2-$3')

    addDiv = 
    `<div class="modal-container" data-index="${index}">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
                <p class="modal-text">${email}</p>
                <p class="modal-text cap">${location.city}</p>
                <hr>
                <p class="modal-text">${cellFormat}</p>
                <p class="modal-text">${location.street.number} ${location.street.name}, ${location.city}, ${location.state} ${location.postcode}</p>
                <p class="modal-text">Birthday: ${DOB}</p>
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>`;
    //Add the modal HTML inside of body.
    body.insertAdjacentHTML('beforeend', addDiv);
    //remove current modal container when clicking the close button.
    const closebtn = document.getElementById('modal-close-btn');
    const modalcontainer = document.querySelector('.modal-container');
        closebtn.addEventListener('click', () => {
        modalcontainer.remove();
        })
    //Set up next, previous and container buttons.("Exceeds #2")
    const btnPrev = document.getElementById('modal-prev');
    const btnNext = document.getElementById('modal-next');
    const btnmodal = document.querySelector('.modal-btn-container');

        btnmodal.addEventListener('click', (e) => {
            if (e.target == btnNext && Index < employeelist.length - 1) {
                Index++
            } else if (e.target == btnNext && Index == employeelist.length - 1) {
                Index = 0
            } else if (e.target == btnPrev && Index > 0) {
                Index--
            }else if (e.target == btnPrev && Index == 0) {
                Index = employeelist.length -1
            }
            document.body.removeChild(document.body.lastElementChild);
            //Another way to remove the last modal 'document.querySelector('.modal-container').remove();'
            displaymodal(Index);
        })
}
//Click employee image to show the profile modal.
gallery.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    const index = card.getAttribute('data-index');
    Index = index
    displaymodal(Index);
})
//Create searchbar and add to the DOM dynamically.
const searchbar = document.querySelector(".search-container");
function createsearchbar(){
    const element = 
    `<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`;
        searchbar.insertAdjacentHTML('beforeend',element);
}
createsearchbar();
//Search partial infomation to filter the directory by name.("Exceeds #1")
const submitbtn = document.getElementById('search-submit');

searchbar.addEventListener('keyup', e => {
    e.preventDefault();
    searchInput = document.getElementById('search-input').value.toLowerCase();
  
    for(let i = 0; i < gallery.children.length; i++) {
        let showpage = gallery.children[i].children[1].children[0].textContent.toLowerCase();
        if(showpage.includes(searchInput)) {
          gallery.children[i].setAttribute('style', 'display: flex')
        } else if(!(showpage.includes(searchInput))) {
          gallery.children[i].setAttribute('style', 'display: none')
        }
      
    }
});
