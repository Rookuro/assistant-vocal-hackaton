import {useEffect, useState} from "react";
import {ContactAPIService} from "../../service/user-api-service";
import {ContactLastItem} from "../ContactListItem/ContactLastItem";

export function ContactList() {
    const [records, setRecords] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const responsecontacts = await ContactAPIService.fetchContacts();
                const datacontacts = responsecontacts.data;
                setRecords(datacontacts);
            } catch (err) {
                console.log(err);
            }
        }

        fetchData();
    }, []);
    return(
        <div>
            {records.map((item) => (
                <ContactLastItem
                    key={item.id}
                    name={item.name}
                    mail={item.mail}
                />
            ))}
        </div>
    );
}