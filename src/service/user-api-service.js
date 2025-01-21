import axios from "axios";

const BASE_URL = "http://localhost:3000/";

export class ContactAPIService {
    static async fetchContacts() {
        const response = await axios.get(`${BASE_URL}contacts/`);
        return response;
    }

    static async addContact(contact) {
        const response = await axios.post(`${BASE_URL}contacts/`, contact);
        return response;
    }

    static async FetchConctactByName(name) {
        const response = await axios.get(`${BASE_URL}contacts/${name}`);
        return response;
    }

}