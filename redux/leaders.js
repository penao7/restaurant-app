import * as ActiontTypes from './ActionTypes';

export const leaders = (state = {
  isLoading: true,
  errMess: "",
  leaders: []
}, action) => {
  switch(action.type) {
    case ActiontTypes.ADD_LEADERS:
      return {...state, isLoading: true, errMess: "", leaders: action.payload};

    case ActiontTypes.LEADERS_LOADING:
      return {...state, isLoading: true, errMess: "", leaders: []};

    case ActiontTypes.LEADERS_FAILED:
      return {...state, isLoading: false, errMess: action.payload, leaders: []};

    default:
      return state; 
  };
};