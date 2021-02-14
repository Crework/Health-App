const journalsReducer = (state = [], action) => {
    switch (action.type) {
      case "GET_ALL": {
        return action.payload.reverse();
      }
      case "ADD_New": {
        return [...state, action.payload];
      }
      default: {
        return state;
      }
    }
  };
  
  export default journalsReducer;
  