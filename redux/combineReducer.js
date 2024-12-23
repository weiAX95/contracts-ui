// combineReducers 函数
function combineReducers(reducers) {
  // 返回一个新的 reducer 函数
  return function combination(state = {}, action) {
    // 初始化一个新的 state 对象
    const nextState = {};
    // 遍历所有的 reducer
    for (let key in reducers) {
      // 获取当前的 reducer
      const reducer = reducers[key];
      // 获取当前 state 中对应的部分
      const previousStateForKey = state[key];
      // 调用 reducer 并传入当前 state 和 action，获取新的 state
      const nextStateForKey = reducer(previousStateForKey, action);
      // 将新的 state 存入 nextState 对象中
      nextState[key] = nextStateForKey;
    }
    // 返回新的 state 对象
    return nextState;
  };
}

// 示例 reducers
const userReducer = (state = { name: '' }, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    default:
      return state;
  }
};

const postsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_POST':
      return [...state, action.payload];
    default:
      return state;
  }
};

// 使用 combineReducers 函数
const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
});

// 示例 action
const action = { type: 'SET_NAME', payload: 'John Doe' };

// 示例 state
const initialState = {
  user: { name: '' },
  posts: [],
};

// 调用 rootReducer
const newState = rootReducer(initialState, action);

console.log(newState);
