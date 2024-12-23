import { createStore } from './store';
import { combineReducers } from './combineReducers';

const store = createStore(
  combineReducers({
    some: someReducer,
  }),
);

export default store;
