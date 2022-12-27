import { useState } from "react"
import { useMutation } from "@apollo/client"

import { GET_PROJECT } from "../queries/projectQueries"
import { UPDATE_PROJECT } from "../mutations/ProjectMutations";

export default function EditProjectForm({ project }) {
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [status, setStatus] = useState(project.status === 'Not Started' ? 'new' : project.status === 'In Progress' ? 'progress' : 'completed');

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: { id: project.id, name, description, status },
        refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }]
    });

    const onSubmit = () => {
        if(!name || !description || !status) return alert("Please fill out all fields");
    
        updateProject(project.id ,name, description, status)
    }

    return (
        <div className="mt-5">
            <h3>Update Project Details</h3>

            <div>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" id='name' value={name} onChange={(evt) => setName(evt.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" id='description' value={description} onChange={(evt) => setDescription(evt.target.value)}></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select className="form-select" id="status" value={status} onChange={(evt) => setStatus(evt.target.value)}>
                        <option value="new">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <button onClick={onSubmit} className="btn btn-primary">Submit</button>
            </div>
        </div>
    )
}