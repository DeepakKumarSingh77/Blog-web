import {combineReducers,applyMiddleware, createStore} from "redux";
import {thunk} from 'redux-thunk';
import {composeWithDevTools} from '@redux-devtools/extension';
import UserReducer from "./Reducer/userReducer";
import postReducer from "./Reducer/postReducer";
import commentReducer from "./Reducer/commentReducer";
import profileReducer from "./Reducer/profileReducer";
import recentReducer from "./Reducer/recentReducer";
const reducer=combineReducers({
    Authu:UserReducer,
    Post:postReducer,
    comm:commentReducer,
    profile:profileReducer,
    recent:recentReducer
})

const middleware=[thunk];
const store=createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;