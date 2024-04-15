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

    buildPage(parkInfo)

    // fetches for additional infomation 
    getAlerts(npsSelector.park)
    getCampgrounds(npsSelector.park)
    getParkingLots(npsSelector.park)
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
                buildAlertModal(data)
            })
        } else {
            alert(`Error:${response.statusText}`);
          }
    })
}

// populate alerts modal with fetched infomation 
const buildAlertModal = function (alertInfo){

    // console.log(alertInfo)

    if(alertInfo.total === 0) {

        // Todo: there are no alerts

    } else {

        // Todo: populate alerts modal
        // Should include for each alert: category, title, description

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

    if(campgroundsInfo.total === 0){

        // There are no campgrounds 

    } else {
        
        // Todo: populate campgrounds modal
        // should include for each campground: name, description, directionsOverview, url

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

    if(parkingLotsInfo.total === 0) {

        // there are no parking lots 

    } else {

        // Todo: populate parking lots modal 
        // should include for each parking lot: name, description
    
    }
}

init();
