import axios from "axios";


const baseUrl = '/api/persons'


const getAllPeople = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const createPerson = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const updatePerson = (newObject, id) => {
    let stringId = id.toString();

    const request = axios.put(`${baseUrl}/${stringId}`, newObject)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}



export default {
    getAllPeople,
    createPerson,
    updatePerson,
    deletePerson
}