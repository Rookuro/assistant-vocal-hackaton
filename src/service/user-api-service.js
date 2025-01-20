import axios from "axios";

const BASE_URL = "http://localhost:3000/";

export class ContactAPIService {
    static async fetchContacts() {
        const response = await axios.get(`${BASE_URL}contacts/`);
        return response;
    }
}