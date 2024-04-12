let parkInfo = {};

function init(){
    const npsSelector = JSON.parse(localStorage.getItem('npsSelector'))
    const stateInfo = JSON.parse(localStorage.getItem(`nps${npsSelector.state}`))
    // console.log(npsSelector)
    // console.log(stateInfo)
    // console.log(stateInfo.total)

    for (let i = 0; i < stateInfo.total; i++){

        // console.log(stateInfo.data[i])
        if(stateInfo.data[i].parkCode == npsSelector.park){
            parkInfo = stateInfo.data[i]
        }
    }

    console.log(parkInfo)
}

init();
