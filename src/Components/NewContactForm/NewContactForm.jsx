import {useState} from "react";
import {ContactAPIService} from "../../service/user-api-service";

export function NewContactForm(props) {
    const [contact, setContact] = useState({});
    const [isEmailValid, setIsEmailValid] = useState(true);

    function refreshPage() {
        window.location.reload(false);
    }

    const onChange = (e) => {
        const { name, value } = e.target;
        setContact({
            ...contact,
            [name]: value,
        });

        if (name === 'mail') {
            validateEmail(value);
        }
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(regex.test(email));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (isEmailValid) {
            ContactAPIService.addContact(contact)
                .then((res) => {
                    // Gérer la réponse
                })
                .catch((err) => console.log(err));
        } else {
            console.log('Adresse e-mail invalide');
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor="name">Prénom</label>
                <input
                    type="text"
                    name="name"
                    onChange={onChange}
                    required
                />
                <label htmlFor="mail">Email</label>
                <input
                    type="text"
                    name="mail"
                    onChange={onChange}
                    required
                />
                {!isEmailValid && <p style={{ color: 'red' }}>Adresse e-mail invalide</p>}
                <button
                    type="submit"
                    onClick={refreshPage}
                >
                    Ajouter
                </button>
            </form>
        </div>
    );
}
