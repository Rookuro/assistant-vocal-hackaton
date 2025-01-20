import {useState} from "react";
import {ContactAPIService} from "../../service/user-api-service";

export function NewContactForm(props) {
    const [contact, setContact] = useState([]);

    const onChange = (e) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        ContactAPIService.addContact(contact)
            .then((res) => {
            })
            .catch((err) => console.log(err));
    };

    return (<div>
        <form onSubmit={onSubmit}>
            <label htmlFor="name">
                Nom/Prénom
            </label>
            <input
                type="text"
                name="name"
                onChange={onChange}
                required
            />
            <label htmlFor="mail">
                EMail
            </label>
            <input
                type="text"
                name="mail"
                onChange={onChange}
                required
            />
        </form>
    </div>);
}