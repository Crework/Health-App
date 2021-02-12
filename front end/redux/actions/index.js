import env from "../../env";

export const getAllJournals = (journals) => {
    return {
        type: "GET_ALL",
        payload: journals
    }
}

export const addNewJournal = (userId, content) => {
    return async (dispatch) => {
        const response = await fetch(`${env.url}/api/journals/${userId}/add-one`, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body : JSON.stringify({
                content
            })
        });
        const data = await response.json();
        dispatch({
            type: "ADD_NEW",
            payload: data
        })
    }
}

export const editJournal = (id, content) => {
    return async (dispatch) => {
        const response = await fetch(`${env.url}/api/journals/${id}/edit-one`, {
            method: "PUT",
            headers: {"Content-Type" : "application/json"},
            body : JSON.stringify({
                content
            })
        });
        const data = await response.json();
        dispatch({
            type: "EDIT",
            payload: data
        })
    }
}