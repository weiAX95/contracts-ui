import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import someReducer from './reducers/someReducer';

// Import your reducers here

// Combine all reducers
const rootReducer = combineReducers({
  some: someReducer,
  // Add other reducers here
});

// Create the Redux store with middleware
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
