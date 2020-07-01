import * as ActiontTypes from './ActionTypes';

export const promotions = (state = {
  isLoading: true,
  errMess: "",
  promotions: []
}, action) => {
  switch(action.type) {
    case ActiontTypes.ADD_PROMOS:
      return {...state, isLoading: true, errMess: "", promotions: action.payload};

    case ActiontTypes.PROMOS_LOADING:
      return {...state, isLoading: true, errMess: "", promotions: []};

    case ActiontTypes.PROMOS_FAILED:
      return {...state, isLoading: false, errMess: action.payload, promotions: []};

    default:
      return state; 
  };
};