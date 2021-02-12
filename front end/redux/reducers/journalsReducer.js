const journalsReducer = (state = [], action) => {
    switch (action.type) {
      case "GET_ALL": {
        return [...state, ...action.payload];
      }
      default: {
        return state;
      }
    }
  };
  
  export default journalsReducer;
  