import initialState from './initialState';
import * as types from 'src/actionTypes/notifications';

function NotificationsReducer(state = initialState.notifications, action) {
  switch (action.type) {
  case types.ENQUEUE_SNACKBAR:
    return [
      ...state,
      { ...action.notification },
    ];
  case types.REMOVE_SNACKBAR:
    return state.filter((notification) => notification.key !== action.key );
  default:
    return state;
  }
}

export default NotificationsReducer;
