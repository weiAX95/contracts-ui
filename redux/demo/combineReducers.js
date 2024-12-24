export const combineReducers = reducers => {
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
};
