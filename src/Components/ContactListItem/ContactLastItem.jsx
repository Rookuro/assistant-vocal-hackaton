export function ContactLastItem({name, mail}) {
    return (<div>
        <tr className="w-full h-16 border-b">
            <td>{name}</td>
            <td>{mail}</td>
        </tr>
    </div>);
}