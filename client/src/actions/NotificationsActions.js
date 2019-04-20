import * as types from 'src/actionTypes/notifications';

const ERROR_HIDE_DURATION = 3000;

export function enqueueErrors(errors = []) {
  return async function(dispatch) {
    errors.forEach((error) => {
      dispatch(enqueueSnackbar({
        message: error,
        options: {
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
          variant: 'error',
          autoHideDuration: ERROR_HIDE_DURATION,
        },
      }));
    });
  };
}

export function enqueueSnackbar(notification) {
  return {
    type: types.ENQUEUE_SNACKBAR,
    notification: {
      key: new Date().getTime() + Math.random(),
      ...notification,
    },
  };
}

export function removeSnackbar(key) {
  return async function(dispatch) {
    dispatch({
      type: types.REMOVE_SNACKBAR,
      key,
    });
  };
}
