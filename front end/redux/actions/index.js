export const getAllJournals = (journals) => {
    return {
        type: GET_ALL,
        payload: journals
    }
}