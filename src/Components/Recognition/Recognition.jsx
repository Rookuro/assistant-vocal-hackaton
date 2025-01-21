import getCitiesData from "../../service/city-api-service";
import getSpotifyMusic from "../../service/spotify-api-service";
import getWeatherData from "../../service/weather-api-service";

function Recognition() {

    let SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
    let SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList


    let recognition = new SpeechRecognition()
    let recognitionList = new SpeechGrammarList()
    recognition.grammars = recognitionList
    recognition.lang = 'fr-FR'
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    const synth = window.speechSynthesis;

    const triggerWeather = ["temps", "demain", "hier", "meteo", "matin", "après-midi", "prévision", "température"];
    const triggerSong = ["musique", "jouer", "spotify", "lancer", "playlist", "album"];
    const triggerMail = ["mail", "ecrire", "envoyer", "rediger"];

    function Speak(text){
        synth.speak(new SpeechSynthesisUtterance(text));
    }

    function Score(str) {
        let statQuery = {
            keyWeather: [],
            keyMail : [],
            keySong : [],
        }
        let listWords = str.split(" ");
        listWords.forEach(word => {
            word = word.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            if(triggerMail.includes(word)) {
                statQuery.keyMail.push(word);
            }

            if (triggerWeather.includes(word)) {
                statQuery.keyWeather.push(word);
            }

            if (triggerSong.includes(word)) {
                statQuery.keySong.push(word);
            }
        })

        return statQuery;
    }

    async function SelectService(obj, query){

        let lenghtOfKeyWeather = obj.keyWeather.length;
        let lenghtOfKeySong = obj.keySong.length;
        let lenghtOfKeyMail = obj.keyMail.length;

        if(lenghtOfKeyWeather > lenghtOfKeySong && lenghtOfKeyWeather > lenghtOfKeyMail) {
            console.log("Service Weather");
           let res = await getCitiesData(query);
           let weather = await getWeatherData(res);
           Speak(`Il fait ${weather.temperature} degrès à ${weather.name} et il fait ${weather.weather}` );
        } else if (lenghtOfKeySong > lenghtOfKeyWeather && lenghtOfKeySong > lenghtOfKeyMail){
            console.log("Service Song");
            let res = await getSpotifyMusic(query);
            if (res != null) {
                // open external_url in new tab
                window.open(res.external_urls.spotify, '_blank');
            }
        } else if (lenghtOfKeyMail > lenghtOfKeyWeather && lenghtOfKeyMail > lenghtOfKeySong) {
            console.log("Service Mail");
        } else {
            Speak("Veuillez reformuler votre demande s'il vous plaît");
        }
    }



    function RecognitionFunc() {
            recognition.start()
            recognition.onresult = (event) => {
                if (event.results[0][0].confidence > 0.7){
                    let query = event.results[0][0].transcript;
                    let confidence = Score(query);
                    SelectService(confidence, event.results[0][0].transcript);
                    console.log(confidence);
                    console.log(query);
                } else {
                    Speak("Veuillez reformuler votre demande s'il vous plaît");
                }
            }
    }
    return (
        <div className="App">
            <button onClick={RecognitionFunc}>Appuie pour parler</button>
            <button onClick={() => {
                Speak("Veuillez reformuler votre demande s'il vous plaît");
            }}>Avoir une réponse</button>
        </div>
    );
}

export default Recognition;