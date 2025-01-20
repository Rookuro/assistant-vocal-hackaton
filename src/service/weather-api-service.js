import axios from "axios";

async function getWeatherData(city) {
        try {
            const lat = city.lat;
            const lon = city.lon;
            console.log(lat);
            console.log(lon);
            if (lat === 0 && lon === 0) {
                console.log('No coordinates found');
                return;
            }
            //get weather
            const weatherResponse = await axios.get(
               `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=cf36488efb56665f24f3b1b4c984d6ca&units=metric&lang=fr`);

            console.log(weatherResponse);

            return {
                name: weatherResponse.data.name,
                temperature: weatherResponse.data.main.temp,
                weather: weatherResponse.data.weather[0].description,
            }


        } catch (error) {
            console.error(error);
            return null;
        }
}

export default getWeatherData;