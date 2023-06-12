// api call and function to get the data from the api

const api_url_one = "http://localhost/probearbeit_kuaguim/api/staff/read.php";
const api_url_two = "http://localhost/probearbeit_kuaguim/api/history/read.php";

const cards = document.getElementsByClassName('card');
const overlay = document.getElementById('history');
let overlayCard = document.getElementById('overlay_card');
const close = document.getElementsByClassName('close');

// console.log('Cards', cards);
// Defining async function
async function get_api(url) { 

    // Storing response
    const response = await fetch(url);

    // Storing response data in form of JSON
    var data = await response.json();
    // console.log(data);
    if(response){
        hideloader();
    }
    
    /* show(data);
    return data; */
    if (url == api_url_one) {
      show(data);
      return data;
  }    else if (url == api_url_two) {
        showHistory(data);
        return data;
    }
    // show(data);
}
// Calling that async function
get_api(api_url_two);
// get_api(api_url_one);



// Function to hide the loader
function hideloader() {
    document.getElementById('loading').style.display = 'none';
}
// Create a new title element
const titleElement = document.createElement('h1');

// Set the content of the title
titleElement.textContent = 'Mitarbaiter Wochenstunden';

// Set any desired attributes of the title (optional)
titleElement.setAttribute('class', 'title');

// Get the first child element of the body
const firstChild = document.body.firstChild;

// Insert the title element before the first child
document.body.insertBefore(titleElement, firstChild);


// Function to define innerHTML for HTML Card List
function show(data) {
    // console.log(data);
    let card = `<div class="container">`;

// Loop to access all data
console.log('Perial');
// for (var i = 0; i < data.length; i++) {
for (let e of data) {
  // console.log(e);
    //data[i].addEventListener('click', function() {
      card += `<div class="card" id="${e.staffId}">
      <div class="card-header"  data-index="${e.staffId}">
        <div class="card-title"> 
          <div class="icon_card-title"></div>
            <div class="card-title_value"> 
              <h5> Name </h5>
            <div class="value"> ${e.firstName}  ${e.lastName} </div>
          </div>
        </div>
      </div>
      <div class="card-body">
          <div class="row">

              <div class="col-md-6 start_date"> 
                <div cclass="icon_start_date"></div>
                <div class="start_date_value"> 
                  <h5> Start Date</h5> 
                  <div class="value">${e.startDate}</div>
                </div>
              </div>
              <div class="col-md-6 end_date"> 
                <div cclass="icon_end_date"></div>
                <div class="end_date_value"> 
                  <h5> End Date </h5> 
                  <div class="value">${(e.endDate !='0000-00-00' && e.endDate != null) ? e.endDate : 'No end date'}</div>
                </div>
              </div>
              <div class="col-md-6 weeklyHours"> 
                <div cclass="icon_weeklyHours"></div>
                <div class="weeklyHours_value"> 
                  <h5> Weekly Hours </h5> 
                  <div class="value">${e.weeklyHours}</div>
                </div>
              </div>
              <div class="col-md-6 update_date"> 
                <div cclass="icon_update_date"></div>
                <div class="update_date_value"> 
                  <h5> Update Date</h5> 
                  <div class="value">${(e.updateDate).substr(0,10)}</div>
                </div>
              </div>
              </div>
      </div>
      </div>`;
    // });
}

// Setting innerHTML as card variable
document.getElementById("card_list").innerHTML = card;
}

// Get all the cards in the DOM
const ards = document.getElementsByClassName('card');

//show overlay card for history details
function showHistory(data) {
  // console.log(data);
  
  // Convert the card string into a DOM element
  
  let api_one = get_api(api_url_one);
  // Attach event listeners to each card
  
  api_one.then((result) => {
      for (let i = 0; i < result.length; i++) {
          cards[i].addEventListener('click', function(event) {
                          
              const clickedCard = event.target.getAttribute('data-index');
              const ev = event.target;
              console.log('Clicked card:', cards[i]);
              // Check if the staff hours has been updated
              const exists = data.some((obj) => obj.staffId === parseInt(clickedCard));
              if (!exists) {
                  // Extracting all textContent values
                  handleSingleCardClick(clickedCard);                
              }else {
                handleCardClick(clickedCard)
              }              
          });
      }
      
    }).catch((error) => {
      // Handle any errors that occurred during the Promise execution
      console.error(error);
    });
  
}

if (overlayCard == null)  {
    document.addEventListener('click', function(event) {
    console.log('Clicked on the screen else', event.target);
    let firstChild = overlay.firstChild;
    
    const displayValue = window.getComputedStyle(overlay).getPropertyValue('display');

    console.log('display in showHistory  :',displayValue);
    console.log('firstChild in showHistory  :',firstChild);
    let element = document.getElementById('overlay_card');
    if (displayValue === 'none') {
      element.style.display = 'block';
    } 
     
    /* if(displayValue === 'block'){
      element.style.display = 'none';
    } */
    if(displayValue === 'block' && element != null){
      element.style.display = 'none';
    }
    if (displayValue === 'none' && element != null) {
      element.style.display = 'block';
    }
    if(element &&  firstChild == null){
      // element = document.getElementById('overlay_card');
      firstChild = overlay.firstChild;
      overlay.removeChild(firstChild);
      // element.style.display = 'none';
    } 
    
  });
}

// No history change fiels card
function handleSingleCardClick(id) {
  let api_one = get_api(api_url_one);
  api_one.then((result) => {
    const matchingObjects = result.filter((obj) => obj.staffId === parseInt(id));
    if (matchingObjects.length > 0) {
      // Extract relevant information from matching objects
      const cardInfo = matchingObjects.map((obj) => ({
        weeklyHours: obj.weeklyHours,
        startDate: obj.startDate,
      }));
      // Create and populate overlay modal
      createSignleOverlayModal(cardInfo);
    }
  });
}

// Attach click event listener to each card element
function handleCardClick(id) {
  
    // Find matching objects in the second array
    
    let api_two = get_api(api_url_two);
    api_two.then((result) => {
      const matchingObjects = result.filter((obj) => obj.staffId === parseInt(id));
  
      if (matchingObjects.length > 0) {
        // Extract relevant information from matching objects
        const cardInfo = matchingObjects.map((obj) => ({
          newValue: obj.newValue,
          oldValue: obj.oldValue,
          validFrom: obj.validFrom,
        }));
        // Create and populate overlay modal
        createOverlayModal(cardInfo);
        
        
      }
    });
   
}
// signle overlay card
function createSignleOverlayModal(cardInfo) {
  // Create overlay modal element
  console.log("Single OverlayCard", overlayCard);
  let card = `<div id="overlay_card">
                <div id="overlay_details">
                <div class="title_hour"> HOURS SETTINGS <span class="close"></span> 
                </div>`;
  // Create card elements inside the modal
  let validFromElement = ``;
  cardInfo.forEach((info) => {
    // Create and populate elements with relevant information
    validFromElement += `
          <div class="row_hour_single"> Hour Setting : ${info.weeklyHours}</div>
          <div class="row_date_single"> Date Setting : ${info.startDate} </div>
          `;
  });

  card += validFromElement;
  card += `</div>
            </div>`;

  document.getElementById("history").innerHTML = card;
}
  // Function to create overlay modal
  function createOverlayModal(cardInfo) {
    // Create overlay modal element
    console.log("OverlayCard many", overlayCard)
    let card = `<div id="overlay_card">
                <div id="overlay_details">
                <div class="title_hour"> HOURS SETTINGS <span class="close"></span> 
                </div>`;

    let validFromElement = ``;
    // Create card elements inside the modal
    cardInfo.forEach((info) => {
      // Create and populate elements with relevant information
      validFromElement += `
          <div class="details_title">
            <div class="col-md-6 row_valid"> 
              <div cclass="icon_row_valid"></div>
              <div class="row_valid_value"> Valid From: ${info.validFrom}</div>
            </div>
            <div class="row details">
              <div class="col-md-6 row_hour"> 
                <div cclass="icon_row_hour"></div>
                <div class="row_hour_value"> New Value: ${info.newValue}</div>
              </div>
              <div class="col-md-6 row_date"> 
                <div cclass="icon_row_date"></div>
                <div class="row_date_value"> Old Value: ${info.oldValue}</div>
              </div>
            </div>
          </div>
          `; 
    });
    card += validFromElement;
    card += `</div>
            </div>`;
    document.getElementById("history").innerHTML = card;
}

// Handle the form for creating a new staff member
const openForm = document.getElementById("add_new_staff_member");
openForm.addEventListener("click", function() {
  window.location.href = "http://localhost:5500/views/form.html";
});
