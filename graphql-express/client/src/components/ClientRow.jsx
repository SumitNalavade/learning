import { useMutation } from "@apollo/client";
import { FaTrash } from "react-icons/fa";

import { DELETE_CLIENT } from "../mutations/ClientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";

export default function ClientRow({ client }) {
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: { id: client.id },
        refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }]
    });

    return (
        <tr>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td>
                <button className="btn btn-danger btm-sm" onClick={deleteClient}>
                    <FaTrash />
                </button>
            </td>
        </tr>
    )
}