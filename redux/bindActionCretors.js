function bindActionCreators(actionCreators, dispatch) {
  // 如果 actionCreators 是一个函数，直接返回一个绑定了 dispatch 的函数
  if (typeof actionCreators === 'function') {
    return function () {
      return dispatch(actionCreators.apply(this, arguments));
    };
  }

  // 如果 actionCreators 不是对象或函数，抛出错误
  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error(
      'bindActionCreators expected an object or a function, instead received ' +
        (actionCreators === null ? 'null' : typeof actionCreators) +
        '.',
    );
  }

  // 创建一个对象来存储绑定后的 action creators
  const boundActionCreators = {};
  for (const key in actionCreators) {
    const actionCreator = actionCreators[key];
    // 确保 actionCreator 是一个函数
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = function () {
        return dispatch(actionCreator.apply(this, arguments));
      };
    }
  }
  return boundActionCreators;
}

export default bindActionCreators;
