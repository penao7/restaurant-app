import * as ActionTypes from './ActionTypes';

export const dishes = (state = {
  isLoading: true,
  errMess: "",
  dishes: []
}, action) => {
  switch(action.type) {
    case ActionTypes.ADD_DISHES:
      return {...state, isLoading: false, errMess: "", dishes: action.payload};

    case ActionTypes.DISHES_LOADING:
      return {...state, isLoading: true, errMess: "", dishes: []};

    case ActionTypes.DISHES_FAILED:
      return {...state, isLoading: false, errMess: action.payload, dishes: []};

    default:
      return state; 
  };
};

