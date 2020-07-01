import * as ActiontTypes from './ActionTypes';

export const dishes = (state = {
  isLoading: true,
  errMess: "",
  dishes: []
}, action) => {
  switch(action.type) {
    case ActiontTypes.ADD_DISHES:
      return {...state, isLoading: true, errMess: "", dishes: action.payload};

    case ActiontTypes.DISHES_LOADING:
      return {...state, isLoading: true, errMess: "", dishes: []};

    case ActiontTypes.DISHES_FAILED:
      return {...state, isLoading: false, errMess: action.payload, dishes: []};

    default:
      return state; 
  };
};

