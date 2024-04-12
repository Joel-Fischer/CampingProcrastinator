# CampingProcrastinator
Camping Trip Planner for group project 1

API Keys: 
Uit6YhyGq62iQh0X7UgpMxBqF7fbThcpnnLFEfBS
d8T0DNoiiFSQE4ampgcBTk0NuekdlQMlTWSS0BJP



Items needed to build out for index.html:
    static elements (title, prompts, etc.)
    state dropdown using 2 letter abbreviations (needed 2 letter state code query parameter for fetching list of parks)
    state selection confirmation button 
    park dropdown (disabled until populated)
    date picker
    park & date confirmation button 

    css styling for index elements 


items needed to build out javascript for index:
    event listener and error checking for state confirmation button
    check local storage if list of parks for state exists
    fetch to NPS api to grab list of parks in state 
    save list of parks in local storage 
    populate park dropdown with list of parks 

    event listener and error checking for park & date confirmation button 
    pass state code, park code, & date 
    switch to results.html

items needed to build out for results.html:
    title / name of park
    background image 
    back button 
    url to official park website 
    paragraph for park description / general info
    button for opening park alerts modal 
    button for opening campground information modal 
    button for opening parking information modal 
    card for displaying weather forcast 

    css styling for results elements 

items needed to build out javascript for results:
    initialization function
    error checking for determining if park info exists in local storage and loading it 
    multiple fetch requests grabbing all the park info (park, camp, parking)
    fetch alert info every page load 
    fetch weather forcast
    save park info to local storage if it doesn't exist 

    populate page elements with their relevant infomation (title, background, description, url, weather forcast, modals)
    
    event listener for alert modal 
    event listener for campgrounds modal
    event listener for parking modal 
    event listener for back button 

Items I'm still unsure about: 
    how I want to format the data we are saving to local storage since we are making multiple fetch calls per park 
    whether to put the date picker on the index or results page 
    can we pass data in a function call when switching pages or do we need to use local storage 