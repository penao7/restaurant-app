import * as ActiontTypes from './ActionTypes';

export const comments = (state = {
  errMess: "",
  comments: []
}, action) => {
  switch(action.type) {
    case ActiontTypes.ADD_COMMENTS:
      return {...state, isLoading: true, errMess: "", comments: action.payload};

    case ActiontTypes.COMMENTS_FAILED:
      return {...state, isLoading: false, errMess: action.payload, comments: []};

    default:
      return state; 
  };
};