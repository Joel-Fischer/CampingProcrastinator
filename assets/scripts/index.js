document.addEventListener('DOMContentLoaded', function() {
    // Handle state confirmation
    document.querySelector('#confirmState').addEventListener('click', function(event) {
        const state = document.querySelector('#campingDestination').value;

        fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${state}&api_key=d8T0DNoiiFSQE4ampgcBTk0NuekdlQMlTWSS0BJP`, {
            headers: {
                'Authorization': 'd8T0DNoiiFSQE4ampgcBTk0NuekdlQMlTWSS0BJP'
            }
        })
        .then(response => response.json())
        .then(data => { 
            const parkSelect = document.querySelector('#park');
            parkSelect.innerHTML = ''; // Clear the current options

            localStorage.setItem(`nps${state}`, JSON.stringify(data));

            if (data.data && data.data.length > 0) {
                for (const park of data.data) {
                    const option = document.createElement('option');
                    option.value = park.parkCode;
                    option.text = park.fullName;
                    parkSelect.appendChild(option);
                }
            }

            document.querySelector('#parkForm').style.display = 'block'; // Show the park form
        })
        .catch(error => console.error('Error:', error));
    });

    // Handle park confirmation
    document.querySelector('#confirmPark').addEventListener('click', function(event) {
        document.querySelector('#dateForm').style.display = 'block'; // Show the date form
    });

    // Handle date confirmation
    document.querySelector('#dateForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        const npsSelector = {
            state : document.querySelector('#campingDestination').value,
            park : document.querySelector('#park').value,
            date : document.querySelector('#campingDate').value
        };

        // const state = document.querySelector('#campingDestination').value;
        // const park = document.querySelector('#park').value;
        // const date = document.querySelector('#campingDate').value;

        // console.log(npsSelector)
        localStorage.setItem('npsSelector', JSON.stringify(npsSelector))

        fetch(`https://developer.nps.gov/api/v1/tours?stateCode=${npsSelector.state}&parkCode=${npsSelector.park}&date=${npsSelector.date}&api_key=d8T0DNoiiFSQE4ampgcBTk0NuekdlQMlTWSS0BJP`, {
            headers: {
                'Authorization': 'd8T0DNoiiFSQE4ampgcBTk0NuekdlQMlTWSS0BJP'
            }
        })
        .then(response => response.json())
        .then(data => { 
            // Redirect to the results page
            console.log()
            window.location.href = 'results.html';
        })
        .catch(error => console.error('Error:', error));
    });
});