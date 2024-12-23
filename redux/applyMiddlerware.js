import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';

// applyMiddleware.js

// Middleware 是一个函数，它接收 store 的 dispatch 和 getState 方法作为参数，并返回一个函数。
// 这个返回的函数接收 next 方法作为参数，并返回一个函数。
// 最终返回的函数接收 action 作为参数，并在适当的时候调用 next(action)。

const loggerMiddleware = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
};

// applyMiddleware 是一个 Redux 提供的函数，用于将 middleware 应用到 Redux store 上。
// 它接收多个 middleware 作为参数，并返回一个 enhancer 函数。
// enhancer 函 数接收 createStore 函数作为参数，并返回一个新的 createStore 函数。

const store = createStore(rootReducer, applyMiddleware(loggerMiddleware));

export default store;
