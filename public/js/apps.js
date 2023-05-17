console.log("inside apps.js")

// fetch('https://puzzle.mead.io/puzzle')
// .then((res) => {
//     res.json().then((data) => {
//         console.log(data)
//     })
// })

getWeatherDetails = (addr) => {
    fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/'+ addr +'.json?access_token=pk.eyJ1IjoicmlkYWgtaCIsImEiOiJjbGhwcnI5NzkwOXNlM3FxdHNlZnZtOTJ1In0.PITXy7YNtQX5TyqZmF0Q3A&limit=1')
    .then((res) => {
        res.json()
        .then((data) => {
            if(data.error){
                console.log(data.error)
            } else {
                
                const center = data.features[0].center
            
                document.querySelector('p').innerHTML = center;
                // fetch("http://api.weatherstack.com/current?access_key=3c97f386d7b8b4e163458e044d950468&query="+center[0]+","+center[1]+"&units=f")
                // .then((r) => {
                //     r.json()
                //     .then((d) => {
                //         console.log(d)
                //     })
                // })
            }
        })
    })
}

const weatherForm = document.querySelector('form');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = document.querySelector('input').value;
    //console.log(address)
    getWeatherDetails(address)
})