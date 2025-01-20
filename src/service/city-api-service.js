import axios from "axios";

function initialIsCapital( word ){
    return word[0] !== word[0].toLowerCase();
}

function getCitiesFromText(text) {
    let cities = [];
    let words = text.split(' ');
    words.forEach(word => {
        if (initialIsCapital(word) && word.length > 3) {
            cities.push(word);
        }
    });
    return cities;
}

async function getCitiesData(str) {

    let cities = getCitiesFromText(str)

    let coordinates = {
        lat: 0,
        lon: 0,
        name: '',
    };

    for (const city of cities) {
        // use axios to call api
        const response = await axios.get(
                `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=cyril1313`
            )
        ;

        console.log(response.data);
        if (response.data.geonames.length === 0) {
            console.log('City not found');
            continue;
        }
        coordinates.lat = response.data.geonames[0].lat;
       coordinates.lon = response.data.geonames[0].lng;
       coordinates.name = response.data.geonames[0].name;
        break;
    }

    return coordinates;
}

export default getCitiesData;