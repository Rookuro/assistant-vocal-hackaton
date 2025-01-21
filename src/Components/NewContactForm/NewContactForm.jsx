import {useState} from "react";
import {ContactAPIService} from "../service/user-api-service";

export function NewContactForm(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const refreshPage = () => {
        window.location.reload();
    }

    const onChangeName = (e) => {
        const { value } = e.target;
        setName(value);
    };

    const onChangeEmail = (e) => {
        const { value } = e.target;
        setEmail(value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const contact = {
            name: name,
            mail: email,
        };
        ContactAPIService.addContact(contact)
            .then((res) => {
                refreshPage();
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <form onSubmit={onSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                        Prénom
                    </label>
                    <div className="mt-2">
                        <input
                        id="name"
                        name="name"
                        type="text"
                        onChange={onChangeName}
                        required
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                        Adresse mail
                    </label>
                    <div className="mt-2">
                        <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        onChange={onChangeEmail}
                        autoComplete="email"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="rounded-full bg-indigo-600 px-8 py-2 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Ajouter
                    </button>
                </div>
            </form>
        </div>
    );
}
