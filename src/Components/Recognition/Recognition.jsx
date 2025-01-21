import getCitiesData, {initialIsCapital} from "../../service/city-api-service";
import getSpotifyMusic from "../../service/spotify-api-service";
import getWeatherData from "../../service/weather-api-service";
import {ContactAPIService} from "../../service/user-api-service";
import {MailApiService} from "../../service/mail-api-service";

import {useState} from "react";

function Recognition() {
    const [response, setResponse] = useState('');

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

    const triggerWeather = ["temps", "demain", "hier", "meteo", "matin", "apres-midi", "prevision", "temperature"];
    const triggerSong = ["musique", "jouer", "spotify", "lancer", "playlist", "album"];
    const triggerMail = ["mail", "ecrire", "envoyer", "rediger"];
    const triggerMailObject = ["objet", "sujet", "titre"];
    const triggerMailBody = ["corps", "contenu", "interieur"];

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

    async function FoundContactByName(name) {
        try {
            const responsecontacts = await ContactAPIService.FetchConctactByName(name);
            const datacontacts = responsecontacts.data;
            return datacontacts;
        } catch (err) {
            console.log(err);
            return null
        }
    }

    async function sendAnEmailToContact(objectMail) {
        try {
            const responsecontacts = await MailApiService.sendMail(objectMail);
            return responsecontacts;
        } catch (err) {
            console.log(err);
            return null
        }
    }

    async function SelectService(obj, text){

        let lenghtOfKeyWeather = obj.keyWeather.length;
        let lenghtOfKeySong = obj.keySong.length;
        let lenghtOfKeyMail = obj.keyMail.length;

        if(lenghtOfKeyWeather > lenghtOfKeySong && lenghtOfKeyWeather > lenghtOfKeyMail) {
            console.log("Service Weather");
           let res = await getCitiesData(text);
           let weather = await getWeatherData(res);
           setResponse(`Il fait ${weather.temperature} degrès à ${weather.name} et il fait ${weather.weather}`);
           Speak(`Il fait ${weather.temperature} degrès à ${weather.name} et il fait ${weather.weather}` );
        } else if (lenghtOfKeySong > lenghtOfKeyWeather && lenghtOfKeySong > lenghtOfKeyMail){
            console.log("Service Song");
            let res = await getSpotifyMusic(text);
            if (res != null) {
                // open external_url in new tab
                window.open(res.external_urls.spotify, '_blank');
                setResponse(`Votre musique ${res.name} est prête à être écoutée`);
            }
        } else if (lenghtOfKeyMail > lenghtOfKeyWeather && lenghtOfKeyMail > lenghtOfKeySong) {
            console.log("Service Mail");
            const listMailTo = initialIsCapital(text, 3)
            console.log(listMailTo);
            if (listMailTo.length === 0){
                console.log("err pas de destinataire....");
                return;
            }

            let contactData = {}
            for( let index in listMailTo) {
                let result = await FoundContactByName(listMailTo[index]);
                console.log(result);
                if(result !== null) {
                    contactData = result;
                    break;
                }
            }

            if(contactData.mail) {
                let queryArr = text.split(" ");
                let indexTriggerObject = 0
                let indexTriggerBody = 0
                queryArr.forEach((word, index) => {
                    word = word.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    if(indexTriggerObject === 0 && triggerMailObject.includes(word)){
                        console.log(word);
                        indexTriggerObject = index;
                    }

                    if (indexTriggerBody === 0 && triggerMailBody.includes(word)){
                        console.log(word);
                        indexTriggerBody = index;
                    }
                })

                if (indexTriggerBody === 0 || indexTriggerBody === 0) {
                    console.log("err pas d'objet ou de corps...");
                    return;
                }

                let mailData = {
                    "emailto":contactData.mail,
                    "subject":queryArr.slice(indexTriggerObject+1,indexTriggerBody).join(" "),
                    "otherProperty":queryArr.slice(indexTriggerBody+1).join(" ")
                }
                // call service
                sendAnEmailToContact(mailData);

                setResponse(`Votre mail a été envoyé à ${contactData.name}`);
            } else {
                console.log("Err destinataire non present dans la liste de contacts ");
            }

        } else {
            Speak("Veuillez reformuler votre demande s'il vous plaît");
            setResponse("Veuillez reformuler votre demande s'il vous plaît");
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
                setResponse("Veuillez reformuler votre demande s'il vous plaît");
            }
        }
    }
    return (
        <>
            <div className="bg-white px-6 py-24 sm:py-16 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">Bienvenue sur Yssistant</h2>
                    <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                        Que puis-je faire pour vous ?
                    </p>
                </div>
            </div>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl text-center">
                    <button
                        type="button"
                        onClick={RecognitionFunc}
                        className="rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Appuie pour parler
                    </button>
                </div>
            </div>
            <div className="bg-white sm:py-16">
                <div className="mx-auto max-w-2xl text-center">
                    <div className="border rounded p-4 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                        {response != null && response !== '' ? response  : "Je suis à votre écoute"}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Recognition;