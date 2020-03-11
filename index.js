'use strict';

//Global Variable to how response outputs
let activityStorage= {
  activities : [
    {
    isDaytime: "both",  
    activity:"Sailing",
    temperature:0,
    probabilityOfPrecipitation:100,
    windSpeed:15,
    image:"img/sailing.jpg",
    imageico:"img/sailingico.jpg",
    activityTense: 'Sail.'
    }
    ,
    {
    isDaytime: true,
    activity:"Hiking",
    temperature:0,
    probabilityOfPrecipitation:100,
    windSpeed:100,
    image:"img/hiking.jpg",
    imageico: "img/hikingico.jpg",
    activityTense: 'hike.'
    }
    ,
    {
    isDaytime: true,
    activity:"Fishing",
    temperature:0,
    probabilityOfPrecipitation:60,
    windSpeed:10,
    image:"img/fishing.jpg",
    imageico: "img/fishingico.jpg",
    activityTense: 'fish.'
    }
    ,
    {
    isDaytime: true,
    activity:"Drone_Flying",
    temperature:100,
    probabilityOfPrecipitation:10,
    windSpeed:10,
    image:"img/drone.jpg",
    imageico:"img/droneico.jpg",
    activityTense: 'fly a drone.'
    }
    ,
    {
    isDaytime: true,
    activity:"Kite_Flying",
    temperature:32,
    probabilityOfPrecipitation:40,
    windSpeed:100,
    image:"img/kite.jpg",
    imageico:"img/kiteico.jpg",
    activityTense: 'fly a kite.'
    }
    ,
    {
    isDaytime: false,
    activity:"Star_Gazing",
    temperature:32,
    probabilityOfPrecipitation:75,
    windSpeed:100,
    image:"img/stars.jpg",
    imageico: "img/starsico.jpg",
    activityTense: 'gaze at the stars.'
    }
    ,
    {
    isDaytime: true,
    activity:"Baseball",
    temperature:45,
    probabilityOfPrecipitation:30,
    windSpeed:100,
    image:"img/baseball.jpg",
    imageico:"img/baseballico.jpg",
    activityTense: 'play baseball.'
    }
    ,
    {
    isDaytime: true,
    activity:"Rock_Climbing",
    temperature:40,
    probabilityOfPrecipitation:75,
    windSpeed:100,
    image:"img/rock.jpg",
    imageico:"img/rockico.jpg",
    activityTense: 'rock climb.'
    }
    ,
    {
    isDaytime: "both",
    activity:"Cycling",
    temperature:50,
    probabilityOfPrecipitation:80,
    windSpeed:5,
    image:"img/cycling.jpg",
    imageico:"img/cyclingico.jpg",
    activityTense: 'bike.'
    }
    ,
    {
    isDaytime: true,   
    activity:"Motorcycling",
    temperature:60,
    probabilityOfPrecipitation:60,
    windSpeed:10,
    image:"img/moto.jpg",
    imageico:"img/motoico.jpg",
    activityTense: 'go for a ride.'
    }
    ,
    {
    isDaytime: true, 
    activity:"Skateboarding",
    temperature:40,
    probabilityOfPrecipitation:30,
    windSpeed:5,
    image:"img/skatepage.jpg",
    imageico:"img/skateico.png",
    activityTense: 'go skate.'
    }
    ,
    {
    isDaytime: "both",
    activity:"Jogging",
    temperature:20,
    probabilityOfPrecipitation:80,
    windSpeed:10,
    image:"img/runpage.jpg",
    imageico:"img/runico.png",
    activityTense: 'go for a run.'
    }
    ,
    {
    isDaytime: "both",
    activity:"Basketball",
    temperature:40,
    probabilityOfPrecipitation:60,
    windSpeed:30,
    image:"img/hooppage.jpg",
    imageico:"img/hoopico.png",
    activityTense: 'go play basketball.'
    }
    ,
    {
    isDaytime: true, 
    activity:"Golf",
    temperature:50,
    probabilityOfPrecipitation:20,
    windSpeed:30,
    image:"img/golfpage.png",
    imageico:"img/golfico.png",
    activityTense: 'go golfing.'
    }
    ,
    {
    isDaytime: true,
    activity:"American_Football",
    temperature:10,
    probabilityOfPrecipitation:80,
    windSpeed:10,
    image:"img/footpage.png",
    imageico:"img/footico.png",
    activityTense: 'go play football.'
    }
    ,
    {
    isDaytime: "both",
    activity:"Tennis",
    temperature:55,
    probabilityOfPrecipitation:20,
    windSpeed:30,
    image:"img/tennpage.jpg",
    imageico:"img/tennico.png",
    activityTense: 'go play tennis.'
    }
    ,
    {
    isDaytime: true,
    activity:"Soccer",
    temperature:55,
    probabilityOfPrecipitation:20,
    windSpeed:10,
    image:"img/soccpage.png",
    imageico:"img/soccico.png",
    activityTense: 'go play soccer.'
    }
    ]
    , 
  ableActivities: [
    ]
    ,
  windRain: []

  }


let doableActivities=[];
let locationGlobal;
let forecastOverview;

//Test against weather properties
function canIDoIt(tempNum,windNum,timeOfDay,precipNum){
  
 
  let activitiesMaster= activityStorage.activities;
  
  
  
  for(let i = 0 ; i < activitiesMaster.length; i++)
  {
    if(tempNum >= activitiesMaster[i].temperature && precipNum <= activitiesMaster[i].probabilityOfPrecipitation && 
      windNum <= activitiesMaster[i].windSpeed && timeOfDay == activitiesMaster[i].isDaytime || activitiesMaster[i].isDaytime === "both" )
    {
      activityStorage.ableActivities.push(activitiesMaster[i]);
      
    }
    
  }  
  populateActivities(activityStorage.ableActivities);
  populateActivityDetails(activityStorage.ableActivities);
}

//Updates Dom with confirmation of being able to do something
function compareWeather(responseJson) {
  
  $(responseJson).ready(function () 
  {  
    let temp = Math.round((responseJson.properties.periods[0].temperature * 1.8) + 32) ;
    let wind = responseJson.properties.periods[0].windSpeed;
    let timeOfDay = responseJson.properties.periods[0].isDaytime
    
  
  canIDoIt(temp,activityStorage.windRain[1],timeOfDay,activityStorage.windRain[0]);
  })
}


function precipAndWind(precip,wind){

   
    activityStorage.windRain.push(precip);
    activityStorage.windRain.push(wind);
    
    
}


function getWeather() {
  const url = `https://api.weather.gov/points/41.1189,-73.3999/`
  fetch(url)
      .then(response => 
        {
          if (response.ok) 
          {
           return response.json();
          }
          throw new Error(response.statusText);
        })
      .then(
        responseJson => getPrecipOdds(responseJson.properties.forecastGridData)
       )
      .catch(err => {
          displayError(err.message);
       });
  fetch(url)
      .then(response => 
        {
          if (response.ok) 
          {
           return response.json();
          }
          throw new Error(response.statusText);
        })
      .then(
        responseJson => getforecastOverview(responseJson.properties.forecast)
       )
      .catch(err => {
          displayError(err.message);
       });        
       
} 

//Gets actual weather properties to examine
function getPrecipOdds(newUrl)  {
fetch(newUrl)
  .then(response => 
    {
      if (response.ok) 
        {
          return response.json();
        }
      throw new Error(response.statusText);
    })
  .then(responseJson => 
    precipAndWind(responseJson.properties.probabilityOfPrecipitation.values[0].value,responseJson.properties.windSpeed.values[0].value)
    )
  .catch(err => {
    displayError(err.message);
  });
}

function getforecastOverview(newUrl2)  {       
fetch(newUrl2)
  .then(response => 
    {
      if (response.ok) 
        {
          return response.json();
        }
      throw new Error(response.statusText);
    })
  .then(responseJson => 
    compareWeather(responseJson)
    )
  .catch(err => {
    displayError(err.message);
  });
  fetch(newUrl2)
  .then(response => 
    {
      if (response.ok) 
        {
          return response.json();
        }
      throw new Error(response.statusText);
    })
  .then(responseJson => 
    populateForecast(responseJson)
  )
  .catch(err => {
    displayError(err.message);
  });        
}

function populateForecast(forecastResponse){
 
  $('#section3').html(`<img src=${forecastResponse.properties.periods[0].icon}>
  <br>
  <br>
  <p class='details-f'> ${forecastResponse.properties.periods[0].name}
  <br><br>temperature: ${forecastResponse.properties.periods[0].temperature}F°
  <br><br>Wind Speed: ${forecastResponse.properties.periods[0].windSpeed}
  <br><br>wind Direction: ${forecastResponse.properties.periods[0].windDirection}
  <br><br>${forecastResponse.properties.periods[0].detailedForecast}
 </p>`)
  
}




function populateActivities(array){
  for(let i = 0; i < array.length; i++){
  $('#list').append(
  `
  <li id='item' class='item'>${array[i].activity}</li>
  `
  )
 
  } 
}

function populateActivityDetails(array){
  for(let i = 0; i < array.length; i++){

  $('#list2').append(
  `
  <li id=${array[i].activity} class=${array[i].activity}> ${array[i].activity}
  </li>
  
  `
    )
    
  } 
}
//MediaWiki API 

function wikipediaSearch(searchterm){
var url = "https://en.wikipedia.org/w/api.php"; 
  
var params = {
  action: "query",
  list: "search",
  srsearch: searchterm,
  format: "json"
  };
  
  url = url + "?origin=*";
  Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
  
  fetch(url)
   .then(function(response){return response.json();})
   .then(function(response) {
    $('#list2').append(
      `
      ${response.query.search[0].snippet}.....
      `
      )
   })
  .catch(function(error){console.log(error);});
   
}

function populatewikipedia(wikipediaResp){
  $("#list2").append(wikipediaResp.query.search[0].snippet)
  

  
}
   
 

/*

function activityPages(doableStuff){
  for(let i = 0; i < doableStuff.length; i++){
    let activityCorrected = doableStuff[i].activity.replace("_", " ")
   $(`.${doableStuff[i].activity}.activity`).on('click', e=>{

    let pageHtml = 
    `
    
    <section class="box">
    <h1>${activityCorrected}</h1>
  
    <img src=${doableStuff[i].image} class="activity-photo-big" >
      
    <br>
    <ul>
      <li class="wikipedia details"><span class='details'>Excerpt from Wiki:</span><br></li>
      <br>
      <li class="duck details"><a href='https://duckduckgo.com/?t=ffab&q=${doableStuff[i].activity}+${locationGlobal}&ia=places'> ${activityCorrected} nearby  </a></li>
    </ul>
    <section class="buttonBlock">
    <input class="back" type="button" value="Back">
    <input class="home" type="button" value="Start Over">
    <section class="buttonBlock">
    </section>
    
    `

    $('.container').html(pageHtml)
    wikiSearch(doableStuff[i].activity);

  })
   
  }
  backButton(doableStuff);
}

//Edits the DOM and recreates the activities listing



//MediaWiki API 

function wikiSearch(searchterm){
var url = "https://en.wikipedia.org/w/api.php"; 

var params = {
    action: "query",
    list: "search",
    srsearch: searchterm,
    format: "json"
};

url = url + "?origin=*";
Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

fetch(url)
    .then(function(response){return response.json();})
    .then(function(response) {
           $('.wikipedia').append(
            `
            ${response.query.search[0].snippet}.....
            <a href='https://en.wikipedia.org/wiki/${searchterm}'>continue here</a>

            `)
      })
    .catch(function(error){console.log(error);});
 
}


//Uses the user input of thier coordinates to find the weather grid area to report on.
function getWeather(coords) {
    const url = `https://api.weather.gov/points/${coords}/`
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        
        .then(
          responseJson => getGridData(responseJson.properties.forecastGridData),
         
        )
        .catch(err => {
            displayError(err.message);
        });
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        
        .then(
          responseJson => getforecastOverview(responseJson.properties.forecast),
         
        )
        .catch(err => {
            displayError(err.message);
        });        
         
} 

//Gets actual weather properties to examine
function getGridData(newURL) {
    const url = newURL;
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        
       
        .then(responseJson => 
         
         displayResults(responseJson)
        )
        .catch(err => {
            displayError(err.message);
        });
        
}

//Gets infor for forecast overview
function getforecastOverview(newURL) {
  const url = newURL;
  fetch(url)
      .then(response => {
          if (response.ok) {
              return response.json();
          }
          throw new Error(response.statusText);
      })
      
     
      .then(responseJson => 
       
        displayForecast(responseJson)
      )
      .catch(err => {
          displayError(err.message);
      });
      
}


//HTML for error scenario
function displayError(error) {
    console.log('displayError ran');
    $('.js-results').html(`<h3 class="error">Something went wrong: ${error}</h3>`)
    $('.loading').addClass('hidden');
    $('.js-results').removeClass('hidden')
}



//relays position object
function success(geoLocationPos){
  let user = geoLocationPos.coords;

  relayPosition(user)
}

//calls navigator and runs sucess function
function getPos(){
 $('.click').on('click', e =>{
  $('#js-form').html(`<input class="forecast" type="button" value=" Check your forecast">`)
  
  window.navigator.geolocation.getCurrentPosition(success)
  
  })
}

//sets coordinates to varibale
function relayPosition(user){

    let latt = user.latitude
    let long = user.longitude
   

    //the rest of the code in this function and display position isnt needed
    let coords = latt + "," + long;
    locationGlobal = coords;

    getWeather(coords)
}


//listens for input from user for a location query then passes value to coordinates conversion.
function locationQuery() {
  $('#js-form').submit(function(event) {
    event.preventDefault();
    
    let query = $('.location-query').val();
    locationGlobal= query;
    $('.location-query').val('');
    
    queryBasedCoords(query)

  });
}

//BING API fetch call to serach location entered by user.
function queryBasedCoords(query) {
  $('#js-form').html(`<input class="forecast" type="button" value=" Check your forecast">`)
  
  const url = `http://dev.virtualearth.net/REST/v1/Locations/${query}?maxResults=1&key=AonXLGNhvKvknSiJ_NL7Mi9R0_I2uy-wUaFmSeR7AdvlMVZ1fe3rRiFDqNcL1spi`
 
  fetch(url)
  .then(function(response){return response.json();})
  .then(function(response) {
        coordsFormat(response.resourceSets[0].resources[0].point.coordinates);
    })
  .catch(function(error){console.log(error);});

}

//converts coordinate Array from Bing API into usable string for National Weather Service API

function coordsFormat(bingArray){
  let newstring = bingArray.toString();
   
  getWeather(newstring);


}


//Invokes all functinons not invoked within others

function allfunctions(){
getPos();
homeButton();
locationQuery();
}




$(allfunctions);
*/

function displayError(error) {
  console.log('displayError ran: '+ error);
}





function allfunctions(){
  getWeather();
}
$(allfunctions);
