//Fetch function request 12 employee info from randomuser.me
const api = "https://randomuser.me/api/?results=12&nat=ca";
let employeelist = [];

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
//Display employee gallery.Create and add basic information to html. 
const gallery = document.getElementById("gallery");
function generateinfo() {
    employeelist.forEach((e,index) =>{
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
                    <h3 id="name" class="card-name cap">>${name.first} ${name.last}</h3>
                    <p class="card-text">${email}</p>
                    <p class="card-text cap">${city}, ${state}</p>
                </div>
        </div>`;
                gallery.insertAdjacentHTML('beforeend', searchbarHTML);
    })
}
generateinfo();
//Regex cell and dob.
//Display modal.
const body = document.querySelector("body");
function displaymodal(employee,index){
    const picture = employee.picture.large;
    const name = `${employee.name.first} ${employee.name.last}`;
    const email = employee.email;
    const city = employee.location.city;
    const state = employee.location.state;
    const address = `${employee.location.street.number} ${employee.location.street.name}, ${city}, ${state}, ${employee.location.postcode}`;
    const regexCell = /^\D*(\d{3})\D*(\d{3})\D*(\d{4})\D*$/
    let cellFormat = (employee.cell).replace(regexCell, '($1) $2-$3')
    const regexDate = /(\d{4})-(\d{2})-(\d{2}).*/
    let dobFormat = (employee.dob.date).replace(regexDate, '$2/$3/$1')
    addDiv = 
    `<div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src=${picture} alt="profile picture">
                <h3 id="name" class="modal-name cap">${name}</h3>
                <p class="modal-text">${email}</p>
                <p class="modal-text cap">${address}</p>
                <hr>
                <p class="modal-text">${cellFormat}</p>
                <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                <p class="modal-text">Birthday: ${dobFormat}</p>
        </div>
    </div>`;
          body.insertAdjacentHTML('beforeend', addDiv);
}
displaymodal();
//Click 'x' to close the modal page.