const alertsModalEl = document.querySelector('#alertsModalText');
const campgroundsModalEl = document.querySelector('#campgroundsModalText')
const parkingModalEl = document.querySelector('#parkingModalText')

// Initialization function 
function init(){

    // load user selections and fetched infomation from local storage
    const npsSelector = JSON.parse(localStorage.getItem('npsSelector'))
    const stateInfo = JSON.parse(localStorage.getItem(`nps${npsSelector.state}`))

    // create object for park information 
    let parkInfo = {};

    // loop through state object to grab only the user selected park 
    for (let i = 0; i < stateInfo.total; i++){
        if(stateInfo.data[i].parkCode == npsSelector.park){
            parkInfo = stateInfo.data[i]
        }
    }

    // Set the header text to the park's full name
    document.querySelector('.header-text').textContent = parkInfo.fullName;

    buildPage(parkInfo)

    // fetches for additional infomation 
    getAlerts(npsSelector.park)
    getCampgrounds(npsSelector.park)
    getParkingLots(npsSelector.park)
    displayWeatherForecast(parkInfo.latitude, parkInfo.longitude)
}

// build out html elements with park information 
const buildPage = function (parkInfo){
    // Todo: build out html elements with dynamic park info 
    // console.log(parkInfo)    

    // should include: fullName, description, directionsInfo, weatherInfo, url
    // could include: operatingHours, enteranceFees, images

    
}

// fetch for park alerts 
const getAlerts = function (parkCode){
    const apiUrl = `https://developer.nps.gov/api/v1/alerts?parkCode=${parkCode}&api_key=d8T0DNoiiFSQE4ampgcBTk0NuekdlQMlTWSS0BJP`

    fetch (apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function (data){
                localStorage.setItem
                buildAlertModal(data)
            })
        } else {
            alert(`Error:${response.statusText}`);
          }
    })
}

// populate alerts modal with fetched infomation 
const buildAlertModal = function (alertInfo){
    //console.log(alertInfo)

    // check if any alerts exist
    if(alertInfo.total == 0) {
        alertsModalEl.textContent = 'There are no alerts.'
    } else {

        // loop through each alert
        for (let i=0; i<alertInfo.total; i++){
            // create elements
            const titleEl = document.createElement('h1')
            const textEl = document.createElement('p')
            const thematicbreakEl = document.createElement('hr')

            // set text content for elements 
            titleEl.textContent = alertInfo.data[i].title
            textEl.textContent = alertInfo.data[i].description

            // append elements to modal 
            alertsModalEl.appendChild(titleEl)
            alertsModalEl.appendChild(textEl)
            alertsModalEl.appendChild(thematicbreakEl)
        }
    }
}

// fetch for camgrounds infomation 
const getCampgrounds = function (parkCode){
    const apiUrl = `https://developer.nps.gov/api/v1/campgrounds?parkCode=${parkCode}&api_key=d8T0DNoiiFSQE4ampgcBTk0NuekdlQMlTWSS0BJP`

    fetch (apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function (data){
                buildCampgrounds(data)
            })
        } else {
            alert(`Error:${response.statusText}`);
        }
    })
}

// populate campgrounds modal with fetched information 
const buildCampgrounds = function(campgroundsInfo){
    // console.log(campgroundsInfo)

    // check if any campgrounds exist 
    if(campgroundsInfo.total == 0){
        campgroundsModalEl.textContent = "There are no campgrounds."
    } else {

        // loop through each campground
        for(let i = 0; i < campgroundsInfo.total; i++){
            
            // create elements
            const nameEl = document.createElement('p')
            const descriptionEl = document.createElement('p')
            const directionsEl = document.createElement('p')
            const urlEl = document.createElement('p')
            const thematicbreakEl = document.createElement('hr')

            // set text for elements 
            nameEl.textContent = campgroundsInfo.data[i].name
            descriptionEl.textContent = campgroundsInfo.data[i].description
            directionsEl.textContent = campgroundsInfo.data[i].directionsOverview
            urlEl.textContent = campgroundsInfo.data[i].url

            // append elements to modal
            campgroundsModalEl.appendChild(nameEl)
            // campgroundsModalEl.appendChild(descriptionEl)
            campgroundsModalEl.appendChild(directionsEl)
            // campgroundsModalEl.appendChild(urlEl)
            campgroundsModalEl.appendChild(thematicbreakEl)
        }
    }
}

// fetch for parking information 
const getParkingLots = function (parkCode){
    const apiUrl = `https://developer.nps.gov/api/v1/parkinglots?parkCode=${parkCode}&api_key=d8T0DNoiiFSQE4ampgcBTk0NuekdlQMlTWSS0BJP`

    fetch (apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function (data){
                buildParkingLots(data)
            })
        } else {
            alert(`Error:${response.statusText}`);
        }
    })
} 

// populate parking lots modal with fetched information 
const buildParkingLots = function (parkingLotsInfo) {
    // console.log(parkingLotsInfo)

    // check if any parking lots exist 
    if(parkingLotsInfo.total == 0) {
        parkingModalEl.textContent = "There are no parking lots."
    } else {

        // loop through each parking lot
        for (let i = 0; i < parkingLotsInfo.total; i++){
        
            // create elements 
            const nameEl = document.createElement('p')
            const descriptionEl = document.createElement('p')
            const thematicbreakEl = document.createElement('hr')

            // set text for elements 
            nameEl.textContent = parkingLotsInfo.data[i].name
            descriptionEl.textContent = parkingLotsInfo.data[i].description

            // append elements to modal 
            parkingModalEl.appendChild(nameEl)
            parkingModalEl.appendChild(descriptionEl)
            parkingModalEl.appendChild(thematicbreakEl)
        }
    }
}function displayWeatherForecast(lat, lon) {
    var apiKey ='83d61eed31a0a84a3b429edf288391f6';
    var apiWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=83d61eed31a0a84a3b429edf288391f6`

    //Make API request to fetch forecast data
    $.ajax({
        url: apiWeatherUrl,
        data: {
            lat: lat,
            lon: lon,
            appid: apiKey,
            units: 'imperial'
        },
        success: function(response) {
            //Clear previous forecast content
            $('#weatherModal .modal-card-body').empty();

            //Extract and display forecast for each day
            var forecasts = response.list;
            forecasts.forEach(function(forecast) {
                var date = new Date(forecast.dt * 1000); //convert timestamp to date
                var dayOfWeek = date.toLocaleDateString('en-US', {weekday: 'long'});
                var temperature = forecast.main.temp;
                var weatherDescription = forecast.weather[0].description;

                //Append forecast data to modal body
                var forecastItem = `<div>${dayOfWeek}: ${temperature}°F, ${weatherDescription}</div>`;
                $('#weatherModal .modal-card-body').append(forecastItem);
            });

        },
        error: function(){
            //Handle error
            $('#weatherModal .modal-card-body').text('Failed to fetch weather data.');
        }
    });
}

//Event listerner for modal open button
function openModal() {

$('#openModal').click(function() {
    //Show modal
    $('#weatherModal').addClass('is-active');

    var lat = 0;
    var lon = 0;

    //display weather forecast
    displayWeatherForecast(lat, lon);

});

    //Event listeneer for modal close button
    $('#weatherModal .delete, #weatherModal .modal-background, #weatherModal .modal-card-foot .button').click(function() {
        //hide modal
        $('#weatherModal').removeClass('is-active');
    });
}


document.addEventListener('DOMContentLoaded', () => {
    
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
   }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      if(event.key === "Escape") {
        closeAllModals();
      }
    });
  });

  init();