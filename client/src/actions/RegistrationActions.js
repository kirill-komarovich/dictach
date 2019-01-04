import * as types from '../types/registration';


export function signUpBegin() {
  return {type: types.SIGN_UP_BEGIN}
}

export function signUpSuccess() {
  return {type: types.SIGN_UP_SUCCESS}
}

export function signUpFailure(errors) {
  return {type: types.SIGN_UP_FAILURE, errors}
}


// export function signUpUser(credentials) {
//   return function(dispatch) {
//     dispatch(signUpBegin());
//     return RegistrationApi.signup(credentials).then(response => {
//       if (!response.errors) {
//         dispatch(signUpSuccess());
//         history.push(urls.root);
//       } else {
//         dispatch(signUpFailure(response.errors));
//       }
//     }).catch(error => {
//       throw(error);
//     });
//   };
// }
