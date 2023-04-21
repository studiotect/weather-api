var lat = 45
var lon = 93
var citySearch = document.querySelector("#query")
var queryBtn = document.querySelector("#queryBtn")
var date;

queryBtn.addEventListener("click", function(event){
  event.preventDefault();
  var city = citySearch.value
  var element = document.getElementById("query");
  element.value="";
  fetchTodayWeather(city);
  fetchAPI(city);
})

async function fetchTodayWeather(city){
  var api = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=1403f67aa3a08844258fc3b9dff6ff41&units=imperial";
  var response = await fetch(api);
  var data = await response.json();
  date = (moment(data.dt,"X").format("MM/DD/YYYY"))
  console.log(date)
  var h3El = document.getElementById("Day"+1)
  h3El.textContent = (moment(data.dt,"X").format("MM/DD/YYYY"))
}

async function fetchAPI(city){
  var api = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=1403f67aa3a08844258fc3b9dff6ff41&units=imperial";
  var response = await fetch(api);
  var data = await response.json();
  console.log(data);
  let dayCounter = 2;
  for (let i = 0; i < data.list.length; i=i+8) {
    console.log(data.list[i].main.temp)
    var h3El = document.getElementById("Day"+dayCounter)
    h3El.textContent = (moment(data.list[i].dt,"X").format("MM/DD/YYYY"))
    console.log(h3El)
    dayCounter++
  }
  
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
