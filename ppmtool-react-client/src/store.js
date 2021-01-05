import { createStore, applyMiddleware } from "redux"; // Creating store, middleware and compose displays reponse on redux dev tools in Chrome extension
import thunk from "redux-thunk"; // It is Middlware
import rootReducer from './reducers'; // Return Response Payload Data
import { composeWithDevTools } from 'redux-devtools-extension'; // Enable Devtools In Development Only

// Initializing State
const initialState = {};

// Redux Thunk is a middleware that lets you call action creators that return a function instead of an action object
const middleware = [thunk];

// Creating Store
const store = createStore(
    rootReducer, 
    initialState, 
    composeWithDevTools (
        applyMiddleware(...middleware)
    )
);

export default store;