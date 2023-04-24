var lat = 45
var lon = 93
var citySearch = document.querySelector("#query")
var queryBtn = document.querySelector("#queryBtn")
var cityHistory = [];
var cityList = document.querySelector("#cities");

if (localStorage.getItem("location")){
  cityHistory = JSON.parse(localStorage.getItem("location"))
}

clickEvent();
function clickEvent(){
queryBtn.addEventListener("click", function(event){
  event.preventDefault();
  var city = citySearch.value
  var element = document.getElementById("query");
  element.value="";
  fetchTodayWeather(city);
  fetchAPI(city);

}
)}

loadCityHistory();
function loadCityHistory(){
  if (cityHistory.length > 0){
    var city = cityHistory[cityHistory.length-1]
    fetchTodayWeather(city);
    fetchAPI(city);
  } 
  cityList.textContent = ""
  for (let i = 0; i < cityHistory.length; i++) {
    var li = document.createElement("li")
    var button = document.createElement("button")
    button.style = "width: 175px" 
    button.textContent = cityHistory[i]
    li.appendChild(button)
    cityList.appendChild(li)
    button.addEventListener("click", function(){
      var city = this.textContent
      fetchTodayWeather(city);
      fetchAPI(city);
    })

  }
  
}


async function fetchTodayWeather(city){
  const api = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=1403f67aa3a08844258fc3b9dff6ff41&units=imperial";
  const response = await fetch(api);
  const data = await response.json();
  if (cityHistory.includes(data.name)=== false){
    cityHistory.push(data.name)
    localStorage.setItem("location", JSON.stringify(cityHistory))
    loadCityHistory();
  }
  date = (moment(data.dt,"X").format("MM/DD/YYYY"));
  console.log(data);
  let cityTitle = document.getElementById("city");
  console.log(data)
  cityTitle.textContent = city;
  let h3El = document.getElementById("Day"+1);
  h3El.textContent = (moment(data.dt,"X").format("MM/DD/YYYY"));
  let icon = data.weather[0].icon;
  getIcon(icon);
  getTodayTemp(data);
  getTodayWind(data);
  getTodayHumidity(data);
}
function getTodayTemp(data){
  let tempEl = document.getElementById("temp"+1);
  console.log(data)
  tempEl.textContent = data.main.temp;
}
function getTodayWind(data){
  let windEl = document.getElementById("wind"+1);
  windEl.textContent = data.wind.speed;
}
function getTodayHumidity(data){
  let humidityEl = document.getElementById("humidity"+1);
  humidityEl.textContent = data.main.humidity;
}
function getIcon(icon){
  console.log(icon);
  iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
  let imgEl = document.getElementById("icon"+1);
  imgEl.setAttribute('alt', "weather icon");
  imgEl.setAttribute('src', iconURL);
}


async function fetchAPI(city){
  var api = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=1403f67aa3a08844258fc3b9dff6ff41&units=imperial";
  var response = await fetch(api);
  var data = await response.json();
  console.log(data);
  let dayCounter = 2;
  for (let i = 0; i < data.list.length; i=i+8) {
    // console.log(data.list[i].main.temp)
    // console.log(data.list[i].main.humidity)
    var h3El = document.getElementById("Day"+dayCounter)
    h3El.textContent = (moment(data.list[i].dt,"X").format("MM/DD/YYYY"))
    get5dIcon(data, i, dayCounter);
    get5dTemp(data, i, dayCounter);
    get5dWind(data, i, dayCounter);
    get5dHumidity(data, i, dayCounter);
    console.log(h3El)
    dayCounter++
  }
  
}
function get5dTemp(data, i, dayCounter){
  let tempEl = document.getElementById("temp"+dayCounter);
  tempEl.textContent = data.list[i].main.temp;
}
function get5dWind(data, i, dayCounter){
  let windEl = document.getElementById("wind"+dayCounter);
  windEl.textContent = data.list[i].wind.speed;
}
function get5dHumidity(data, i, dayCounter){
  let humidityEl = document.getElementById("humidity"+dayCounter);
  humidityEl.textContent = data.list[i].main.humidity;
}
function get5dIcon(data, i, dayCounter){
  let icon = data.list[i].weather[0].icon;
  console.log(icon);
  iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
  let imgEl = document.getElementById("icon"+dayCounter);
  imgEl.setAttribute('alt', "weather icon");
  imgEl.setAttribute('src', iconURL);
}
  
/*
  I am loading the sample data via another script tag on the index.html page, so I have that data 
  available here as a global variable. It was named sample in the other file so we'll use that here.
*/


// This is the array of hour blocks: 8 per day, for a total of 40.
// const daysInForecast = sample.list 

/*
Each date object has a property called "dt", which is a Unix timestamp for the date and time 
of that object's data. The first one is 1681333200.
*/ 

// Create a new array to hold one day block per forecast day.
// const newForecastArr = [] 

// iterate over the 40 blocks, but we will do them 8 at a time, so that we get one per day.
// for( let i=0; i<40; i=i+8 ){
//   newForecastArr.push( sample.list[i])
// }

// We now have a new array with one record for each day!
// console.log(newForecastArr)


/* 
Want to see why arrow functions are cool? Combined with an array method you haven't learned 
yet, we can do all this work in one line of code. We will show you array.filter() later!
*/ 

// const newForecastArr2 = sample.list.filter( (_dayObj, idx) => idx % 8 === 0)
// console.log(newForecastArr2);
