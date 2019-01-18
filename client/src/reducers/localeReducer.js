import initialState from './initialState';

function localeReducer(state = initialState.locale, action) {
  // switch(action.type) {
  //   case types.SIGN_IN_BEGIN:
  //     return {
  //       ...state,
  //       authenticated: false,
  //       loading: true,
  //     };

  //   default:
  //     return state;
  // }
  return state;
}

export default localeReducer;
