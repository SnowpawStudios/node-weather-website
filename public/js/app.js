const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('.message1');
const messageTwo = document.querySelector('.message2');
const weatherIcon = document.querySelector('.weather-icon');
const weatherDesc = document.querySelector('.weather-desc');
const windSpeed = document.querySelector('.wind-speed');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = search.value
    messageOne.textContent = 'Loading ...';
    messageTwo.textContent = '';
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error);
            messageOne.textContent = data.error;
        }else{
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
            weatherIcon.src = data.weatherIcon;
            weatherDesc.textContent= data.weatherDescription;
            windSpeed.textContent= `Wind speed: ${data.windSpeed}`;
            
        }
        
    });
});
});