const searchBtn = document.querySelector(".searchButton");
const input = document.querySelector("input")
let city = document.querySelector(".displayCity")
let temp1 = document.querySelector(".temp1")
let wind1 = document.querySelector(".wind1")
let humid1 = document.querySelector(".humid1")
let uv1 = document.querySelector(".uv1")
let img1 = document.querySelector("#img1")
let currentDate2 = document.querySelector(".currentDate")
let cityDiv = document.querySelector(".citySearch")

let cities = JSON.parse(localStorage.getItem("cities")) || []
document.body.header

//create a button for every city in array
//use for loop to dynamically create buttons

for (let i = 0; i < cities.length; i++) {
    const element = cities[i];
    const button = document.createElement("button")
    button.textContent = element
    document.querySelector(".cityButtons").appendChild(button)
    button.addEventListener("click", function() {
        getCoordinates(this.textContent, "old")
    })
}

// let oneCallApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=559b47172060bb93cc41b5c64f4d6e9b`

//let getLatAndLonApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=559b47172060bb93cc41b5c64f4d6e9b`

function getCoordinates(city, status) {
    

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=559b47172060bb93cc41b5c64f4d6e9b`).then(response => response.json()).then(data => {
        if (status==="new") {
          cities.push(data.name)
    localStorage.setItem("cities", JSON.stringify(cities))     
        }
       
        
     
    oneCall(data.coord, data.name)
})
}

function oneCall(coord, name) {
    let lat = coord.lat;
    let lon = coord.lon;
    let cityNameValue = name

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=559b47172060bb93cc41b5c64f4d6e9b`).then(res => res.json()).then(data => {
        console.log(data)

        const CityEl = document.querySelector(".displayCity")
        const TemperatureEl = document.querySelector(".temp1")
        const wind_speedEl = document.querySelector(".wind1")
        const humidityEl = document.querySelector(".humid1")
        const uv1El = document.querySelector(".uv1")

        CityEl.textContent = cityNameValue
        TemperatureEl.textContent = `Temp: ${data.daily[0].temp.day}`
        wind_speedEl.textContent = `wind: ${data.daily[0].wind_speed}`
        humidityEl.textContent = `Humidity: ${data.daily[0].humidity}`
        uv1El.textContent = `Uv: ${data.daily[0].uvi}`

        document.querySelector(".fiveDayContainer").innerHTML = ""
        for (let i = 1; i < 6; i++) {
            const element = data.daily[i];

            var div = document.createElement('div');
            var currentCity = document.createElement('h1');
            var tempEl = document.createElement('p');
            var windEl = document.createElement('p');
            var humidEl = document.createElement('p');
            var uviEl = document.createElement('p');

            div.classList.add("weatherInfo")
            currentCity.classList.add("displayCity")
            tempEl.textContent = `Temp: ${element.temp.day}`
            windEl.textContent = `Wind: ${element.wind_speed}`
            humidEl.textContent = `Humidity ${element.humidity}`
            uviEl.textContent = `Uv ${element.uvi}`

            div.appendChild(currentCity)
            div.appendChild(tempEl)
            div.appendChild(windEl)
            div.appendChild(humidEl)
            div.appendChild(uviEl)

            document.querySelector(".fiveDayContainer").appendChild(div)
        }

        //add text content to the new elements
        //append new elements to the new div
        //append the div to the weatherMain container


    })
}

searchBtn.addEventListener("click", () => {
    let cityName = document.querySelector("#userInput").value;getCoordinates(cityName, "new")
})