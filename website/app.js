
/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Variables for URL and my personal API key
const base_URL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const api_Key = '&appid=8e085e068d9c5d93fdaf75c56006144b';

// Event listener for click of generate button 
document.getElementById('generate').addEventListener('click', generateDATA);

//calling Function by  event listener 
function generateDATA(e) {
  e.preventDefault();
  //collect input values
  const NZip = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;

  fetchWeather(base_URL, NZip, api_Key)
    .then (function (userDATA) {
      postData('/add', { date: newDate, temp: userDATA.main.temp, content })
    }).then(function (newData) {
      // updating data 
      updateDATA()
    })
}

// Function to GET Web API Data
const fetchWeather = async (base_URL, NZip, api_Key) => {
  const res = await fetch(base_URL + NZip + api_Key);
  try {
    const userDATA = await res.json();
    return userDATA;
  } catch (error) {
    console.log("error", error);
  }
}

// Function to POST data 
const postData = async (url = '', data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content
    })
  });

  try {
    const newData = await req.json();
    console.log(newData);
    return newData;
  }
  catch (error) {
    console.log("error", error);
  }
};


const updateDATA = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json()
    
    // updating the  data of the new entry 
    document.getElementById('date').innerHTML = `Date: ${allData.date}`;
    document.getElementById('temp').innerHTML = `Temprature: ${allData.temp}`;
    document.getElementById('content').innerHTML = `I'm feeling: ${allData.content}`;
  }
  catch (error) {
    console.log("error", error);
  }
};
