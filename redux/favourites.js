import * as ActionTypes from './ActionTypes';

export const favourites = (state = [], action) => {
  switch(action.type) {
    case ActionTypes.ADD_FAVOURITE:
      if(state.some(el => el === action.payload)) {
        return state.filter(favourite => favourite !== action.payload);
      } else {
        return state.concat(action.payload);
      };        

    default:
      return state; 
  };
};