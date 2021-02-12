const user = {
    name: "",
    email: "",
    dateOfBirth: {
      date: null,
      month: null,
      year: null,
    },
    profilePicture: "",
    journals: [],
  };
  
  const usersReducer = (state = user, action) => {
    switch (action.type) {
      case "ADD_NEW": {
        return { ...state, ...action.payload };
      }
      default: {
        return state;
      }
    }
  };
  
  export default usersReducer;
  