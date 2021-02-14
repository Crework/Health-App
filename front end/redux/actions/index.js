import Constants from 'expo-constants';

export const getAllJournals = (userId) => {
    return async (dispatch) => {
        console.log("inside dispatch");
        const response = await fetch(`${Constants.manifest.extra.URL}/api/journals/${userId}/get-all`);
        const data = await response.json();
        if(!data.error)
            dispatch({
                type: "GET_ALL",
                payload: data.journals
            })
        else
            dispatch({
                type: "GET_ALL",
                payload: []
            })
        
    }
}

export const addNewJournal = (userId, content) => {
    return async (dispatch) => {
        const response = await fetch(`${Constants.manifest.extra.URL}/api/journals/${userId}/add-one`, {
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
        const response = await fetch(`${Constants.manifest.extra.URL}/api/journals/${id}/edit-one`, {
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