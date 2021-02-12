import { combineReducers } from "redux";
import journalsReducer from "./journalsReducer";
import usersReducer from "./usersReducer";

const rootReducer = combineReducers({
    user: usersReducer,
    journals: journalsReducer
});

export default rootReducer;
