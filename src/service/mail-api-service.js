import axios from "axios";

const BASE_URL = "http://localhost:3000/";

export class MailApiService {

    static async sendMail(mail) {
        const response = await axios.post(`${BASE_URL}mail/send/`, mail);
        return response;
    }

}