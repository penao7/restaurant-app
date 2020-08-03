import * as ActionTypes from './ActionTypes';

export const users = (state = {
  isLoading: false,
  errMess: null,
}, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_REQUEST:
      return { ...state, isLoading: true, errMess: null };

    case ActionTypes.CREATE_SUCCESS:
      return { ...state, isLoading: false, errMess: null };

    case ActionTypes.CREATE_FAILURE:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  };
};