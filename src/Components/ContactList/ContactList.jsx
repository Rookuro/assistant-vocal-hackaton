import {useEffect, useState} from "react";
import {ContactAPIService} from "../../service/user-api-service";

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
        <ul className="divide-y divide-gray-100">
            {records.map((record) => (
                <li key={record.mail} className="flex justify-between py-5">
                    <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto">
                            <p className="text-sm/6 font-semibold text-gray-900">
                                {record.name}
                            </p>
                            <p className="mt-1 flex text-xs/5 text-gray-500">
                                <a href={`mailto:${record.mail}`} className="truncate hover:underline">
                                    {record.mail}
                                </a>
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex w-16">
                        <button type="button" className="hover:bg-gray-100 px-3 py-3 rounded-full">
                            <span className="sr-only">Delete</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}