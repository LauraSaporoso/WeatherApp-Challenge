// var
let cityInput = document.getElementById('city');
let btnSearch = document.getElementById('search-btn');
let result = document.getElementById('result');

// addEventListener click search button 
btnSearch.addEventListener('click', resultWeather);

// funzione risultato dopo click
function resultWeather() {

    let cityName = cityInput.value;

    console.log(cityName)
    if (cityName.length == 0){
        result.innerHTML = `<h3 class="msg-empty-input">Please enter a valid city name</h3>`;
    }
    else {
        // prendo url API, inserisco valori 
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric`;

        console.log(url);

        // pulisco search bar
        cityInput.value = "";

        // Fetch 
        fetch(url)
            .then(response => response.json())
            // console.log(response.json())) 
            .then((datiMeteo) => {
                   result.innerHTML = `
                   <div class="dati-meteo">
                   <h1>${datiMeteo.name}</h1>
                   <h3>${datiMeteo.weather[0].main}</h3>
                   <h3>${datiMeteo.weather[0].description}</h3>
                   
                   <img src= "https://openweathermap.org/img/wn/${datiMeteo.weather[0].icon}@2x.png"/>

                   <h2 class="temperatura">${datiMeteo.main.temp}°</h2>
                   <div class="max-min">
                   <h3 class="temperatura">Min ${datiMeteo.main.temp_min}°</h3>
                   <h3 class="temperatura">Max ${datiMeteo.main.temp_max}°</h3>
                    </div>
                   </div>`
                   // day long format
                   function getDayName(date = new Date(), locale = 'en-US') {
                    return date.toLocaleDateString(locale, {weekday: 'long'});
                  }
                    
                    let giorno = getDayName();
                    let hGiorno = document.createElement('h3');
                    hGiorno.style.textAlign = "center";
                    hGiorno.textContent = `${giorno}`;
                    result.appendChild(hGiorno);
                    
                    btnSearch.addEventListener('click', function() {
                       hGiorno.remove;
                    })
                })
            .catch(error => console.log("Errore"));
    }
}




/*  for long day - long method
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const dayLong = new Date();
    let day = weekday[dayLong.getDay()];
    document.getElementById("longDay").innerHTML = day;
*/
