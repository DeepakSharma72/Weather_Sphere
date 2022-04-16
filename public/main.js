const appid = "2533bb290f6ef8aa350c0a57249c00f6";
let cityname = "";
let jsondata;
const mesgbar = document.getElementById("msgbar");

let days = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];

let iheavyrain = document.getElementById("heavyrain");
let isunny = document.getElementById("sunny");
let icloudy = document.getElementById("cloudy");
let isuncloud = document.getElementById("suncloud");
let ihazzy = document.getElementById("hazy");

let date = new Date();

document.getElementById("daynameid").innerHTML = `${days[date.getDay()]}`;
document.getElementById("datenameid").innerHTML = `${date.getDate()}, ${date.toLocaleString('default', { month: 'long' })}`



document.getElementById("sub-btn").addEventListener("click", () => {
    cityname = document.getElementById("cityname-bar").value;
    console.log(cityname);
    getDetails();
});

async function getDetails() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${appid}`;
    let rowdata = await fetch(url);
    jsondata = await rowdata.json();
    console.log(jsondata)
    setDetails();
}

function setDetails() {
    if (jsondata.cod == "200") {
        mesgbar.innerText = "";
        cityname = cityname.toUpperCase();
        document.getElementById("citynameid").innerHTML = `${cityname}, ${jsondata.sys.country}`
        let temp = (jsondata.main.temp - 273).toFixed(2);
        document.getElementById("temp-block-id").innerHTML = `${temp}`;

        let wtcod = jsondata.weather[0].main;
        if (wtcod == "Clear") {
            isuncloud.classList.add("hide-utility");
            iheavyrain.classList.add("hide-utility");
            ihazzy.classList.add("hide-utility");
            icloudy.classList.add("hide-utility");
            isunny.classList.remove("hide-utility");
        }
        else if (wtcod == "Haze") {
            isuncloud.classList.add("hide-utility");
            iheavyrain.classList.add("hide-utility");
            ihazzy.classList.remove("hide-utility");
            icloudy.classList.add("hide-utility");
            isunny.classList.add("hide-utility");
        }
        else if (wtcod == "Rainy") {

            isuncloud.classList.add("hide-utility");
            iheavyrain.classList.remove("hide-utility");
            ihazzy.classList.add("hide-utility");
            icloudy.classList.add("hide-utility");
            isunny.classList.add("hide-utility");
        }
        else if (wtcod == "Cloudy") {
            isuncloud.classList.remove("hide-utility");
            iheavyrain.classList.add("hide-utility");
            ihazzy.classList.add("hide-utility");
            icloudy.classList.add("hide-utility");
            isunny.classList.add("hide-utility");
        }
        else {
            isuncloud.classList.add("hide-utility");
            iheavyrain.classList.add("hide-utility");
            ihazzy.classList.add("hide-utility");
            icloudy.classList.remove("hide-utility");
            isunny.classList.add("hide-utility");
        }
    }
    else {
        mesgbar.innerText = "Enter the Right Cityname";
        isuncloud.classList.add("hide-utility");
        iheavyrain.classList.add("hide-utility");
        ihazzy.classList.add("hide-utility");
        icloudy.classList.add("hide-utility");
        isunny.classList.add("hide-utility");
        document.getElementById("citynameid").innerHTML = "";
        document.getElementById("temp-block-id").innerHTML = "0.00";
    }
}


