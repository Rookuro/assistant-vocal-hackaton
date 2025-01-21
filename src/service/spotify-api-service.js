import axios from "axios";

async function getSpotifyMusic(query) {
        try {
            var SPOTIFY_CLIENT_ID = "856715e76c9b4b3d89ab7e83c342859d"
            var SPOTIFY_CLIENT_SECRET = "d5d6a2ec54c6487a8145f914da6fe533"

            // get words after musique in query
            query = query.split('musique')[1].trim();

            // get token
            const response = await axios.post(
                `https://accounts.spotify.com/api/token`,
                `grant_type=client_credentials&client_id=${SPOTIFY_CLIENT_ID}&client_secret=${SPOTIFY_CLIENT_SECRET}`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );
            if (response.status !== 200) {
                console.error('Error while getting token');
                return null;
            }
            const token = response.data.access_token;

            // get music
            const music = await axios.get(
                `https://api.spotify.com/v1/search?q=${query}&type=track`,
                {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }
            );
            console.log(music);
            if (music.status !== 200) {
                console.error('Error while getting music');
                return null;
            }
            // select first track
            return music.data.tracks.items[0];


        } catch (error) {
            console.error(error);
            return null;
        }
}

export default getSpotifyMusic;