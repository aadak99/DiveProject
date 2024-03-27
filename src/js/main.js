import * as bootstrap from 'bootstrap'

var map = L.map('map').setView([28, -83.57], 6)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
//const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

const diveSites = [];
class diveSite {
    constructor(siteName, lat, long, desc){
        this.siteName = siteName;
        this.lat = lat;
        this.long = long;
        this.desc = desc;
    }
}

const rainBow = new diveSite("Rainbow River", 29.04750, -82.45820, "Rainbow River Dive Tour Crystal clear fresh springs water with 200 ft of visibility. Beautiful year round Florida weather Fish, Turtles, and sometimes Otters. The deepest depth of the river is 25 ft.");
const abyss = new diveSite("Christ of the Abyss", 25.07627, -80.17530, "Located at Key Largo Dry Rocks, this popular site features the famous nine-foot statue of Jesus donate by the Cressi family, popular dive-gear manufacturers. Sand channels in the coral feature moray eels, crabs, grouper and, if you're lucky, eagle rays!");
const destinjetties = new diveSite("Destin Jetties", 30.38580, -86.50607, "The Destin Jetties is a wonderful dive site. Located in Destin, Florida. The water is accessible from shore. Scuba divers can see various underwater statues placed on the ocean floor that are covered with corals and tropical fish. There is also the chance to spot sting rays, grouper, octopus, and many other tropical fish. Depths range from 30 feet to 60 feet.");
const bluespringpark = new diveSite("Blue Springs State Park", 28.94505, -81.33924, "Blue Springs is an amazing crystal clear spring in Central Florida with a Cave going down to 117ft. The run is about 10ft deep and is full of life from Manatees to fresh water turtles and lots of fish.");
const blueheron = new diveSite("Blue Heron Bridge", 26.78362, -80.04295, "The number 1 shore dive in the USA. With everything from Seahorses to Eagle Rays. This shore dive is the best there is for all levels of diver with a max depth of 30ft. A Photographers paradise with Nudibranchs, Moray Eels, Bumblebee shrimp, Mantis shrimp, Octopus, Manatees and turtles!");
const standrewsjetties = new diveSite("St. Andrews Jetties", 30.12477, -85.73299, "Saint Andrews Jetties at St. Andrews State Park near Panama City Beach, Florida, is a wonderful dive site. There are picnic tables available to assemble scuba kits and plan dives. The water is accessible from shore.  Divers have a chance to spot sting rays, octopus, grouper, and many other tropical fish. Occasionally manatees, eagle rays and goliath grouper can be encountered.");
const cptmike = new diveSite("Captain Mike's", 26.89945, -80.03416, "Captain Mike’s” dive site is one of the most spectacular local reefs Jupiter Dive Center has to offer. It is a high ledge averaging between 15 and 20 feet in height from the sand. Divers start the dive on top of the ledge at about 75 feet over a fish-filled aquarium. As the current carries divers north to a bend in the ledge, they are often met by curious Reef sharks.");
const wrecktrek = new diveSite("Wreck Trek", 26.95604, -80.02313, "The Zion Train dive site is a series of three wrecks that are home to some fantastic big animals. As divers approach the Zion Train, a small freighter listing to its port side with its bow broken off by a hurricane, the resident Goliath groupers slowly try to find an out-of-the-way corner in which to hide. The wreck, being wide open, allows divers to get a good up-close look at the Goliaths even as they try to hide. In late summer, when Goliath groupers aggregate; there may be as many as six or seven of these giant fish on the Zion Train alone.");
const spanishrosks = new diveSite("Spanish Rosks", 27.48741, -82.71289, "A reef off of Anna Maria Island, fun dive, or some spearfishing. Be prepared for a long surface swim.");
const bluegrotto = new diveSite("Blue Grotto", 29.38814, -82.48657, "The Blue Grotto is a freshwater spring and cavern located in Williston, Florida. The water is crystal clear and 22°C/°72 F year-round. There are three areas to explore: an open water basin, upper cavern and lower cavern. At 9 metres/30 feet, there is a diving bell filled with air pumped from the surface. Divers may also encounter Virgil, a friendly softshell turtle who lives in the grotto. Divers with training and experience in deep diving can explore the lower cavern. A dive torch is recommended.");

diveSites.push(rainBow, abyss, destinjetties, bluespringpark, blueheron, standrewsjetties, cptmike, wrecktrek, spanishrosks, bluegrotto);
drawMap();

function drawMap() {
    for (const spot of diveSites){
        let marker = L.marker([spot.lat, spot.long, spot.siteName]).addTo(map).on('click', function(e) {
            fetchWeather(this.getLatLng().lat, this.getLatLng().lng);
            displayInfo(spot);
        });
        marker.bindPopup(`<b>${spot.siteName}</b><br>`).openPopup();
        //${spot.desc}
    }
}

async function fetchWeather(lat, lng) {
    const apiKey = process.env.OPEN_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=imperial`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      displayWeather(data);
    } catch (error) {
      console.error(error);
    }
   }

function displayWeather(weatherData) {
    const newDesc = document.getElementById('weather-description');
    newDesc.textContent = `${weatherData.weather[0].description}`;

    const wIcon = document.getElementById('weather-icon');
    if(wIcon.hasChildNodes()){
        wIcon.removeChild(wIcon.firstChild);
    }
    const newImg = document.createElement('img');
    newImg.src = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    wIcon.appendChild(newImg);

    const newTemp = document.getElementById('weather-temp');
    newTemp.textContent = `${weatherData.main.temp}\u00B0`;
}

function displayInfo(siteData) {
    const siteName = document.getElementById('site-name');
    siteName.textContent = siteData.siteName;

    const siteDesc = document.getElementById('site-desc');
    siteDesc.textContent = siteData.desc;
}