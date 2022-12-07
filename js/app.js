document.querySelector("main").style.display = "none"

async function fetchAPI(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=64cb193733bc43ce31038bb246256f06&units=metric&`)

    const weatherData = response.json()
    weatherData.then(value => getWeatherData(value))
}




function getWeatherData(data) {

    document.querySelector("main").style.display = "block";

    if (Number(data.cod) === 200) {

        document.querySelector(".temp-info").style.display = "block";
        document.querySelector(".other-weather-info").style.display = "block";

        if (document.querySelector(".error-msg")) document.querySelector(".error-msg").remove();


        document.querySelector("#date").innerHTML = String(new Date()).slice(0, 15)
        document.querySelector("#temp").innerHTML = data.main.temp
        document.querySelector("#status").innerHTML = data.weather[0].description
        document.querySelector("#feelLikeTemp").innerHTML = data.main.feels_like

        document.querySelector("#humidity").innerHTML = data.main.humidity + "%"
        document.querySelector("#windSpeed").innerHTML = (data.wind.speed * 3.6).toFixed(2) + " km/hr";
        document.querySelector("#visibility").innerHTML = data.visibility / 1000 + " KM";

    } else {
        // console.log(data.cod)

        document.querySelector(".temp-info").style.display = "none";
        document.querySelector(".other-weather-info").style.display = "none";

        if (!(document.querySelector(".error-msg"))) {
            
            const h1 = document.createElement("h1");
            h1.innerHTML = data.message;
            h1.style.textAlign = "center";
            h1.className = "error-msg"
            document.querySelector("#main-sec").appendChild(h1)

        }



        // document.querySelector("main").appendChild(h1);
    }

}



document.querySelector("form").addEventListener('submit', (e) => {
    let city = document.querySelector('#userInput').value;
    fetchAPI(city);
    e.preventDefault();
})