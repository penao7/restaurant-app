import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

// Handle Comments

export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + "comments")
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let error = new Error("Error " + response.status + ": " + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
      let errMess = new Error(error.message);
      throw errMess
    })
    .then(response => response.json())
    .then(response => dispatch(addComments(response)))
    .catch(error => dispatch(commentsFailed(error.message)))
  };

  export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
  });

  export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
  });

  // Handle Dishes

  export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading());

    return fetch(baseUrl + "dishes")
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let error = new Error("Error " + response.status + ": " + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
        let errMess = new Error(error.message);
        throw errMess
      })
      .then(response => response.json())
      .then(response => dispatch(addDishes(response)))
      .catch(error => dispatch(dishesFailed(error.message)))
    };

    export const dishesLoading = () => ({
      type: ActionTypes.DISHES_LOADING,
    });
  
    export const dishesFailed = (errmess) => ({
      type: ActionTypes.DISHES_FAILED,
      payload: errmess
    });
  
    export const addDishes = (dishes) => ({
      type: ActionTypes.ADD_DISHES,
      payload: dishes
    });

    // Handle Promotions

    dispatch(promosLoading());

    export const fetchPromos = () => (dispatch) => {
      return fetch(baseUrl + "promotions")
        .then(response => {
          if (response.ok) {
            return response;
          } else {
            let error = new Error("Error " + response.status + ": " + response.statusText);
            error.response = response;
            throw error;
          }
        },
        error => {
          let errMess = new Error(error.message);
          throw errMess
        })
        .then(response => response.json())
        .then(response => dispatch(addPromos(response)))
        .catch(error => dispatch(promotionsFailed(error.message)))
      };

      export const promosLoading = () => ({
        type: ActionTypes.PROMOS_LOADING
      });
    
      export const promosFailed = (errmess) => ({
        type: ActionTypes.PROMOS_FAILED,
        payload: errmess
      });
    
      export const addPromos = (promos) => ({
        type: ActionTypes.ADD_PROMOS,
        payload: promos
      });
  
   // Handle Leaders

   dispatch(leadersLoading());

   export const fetchLeaders = () => (dispatch) => {
     return fetch(baseUrl + "leaders")
       .then(response => {
         if (response.ok) {
           return response;
         } else {
           let error = new Error("Error " + response.status + ": " + response.statusText);
           error.response = response;
           throw error;
         }
       },
       error => {
         let errMess = new Error(error.message);
         throw errMess
       })
       .then(response => response.json())
       .then(response => dispatch(addLeaders(response)))
       .catch(error => dispatch(leadersFailed(error.message)))
     };

     export const leadersLoading = () => ({
       type: ActionTypes.LEADERS_LOADING
     });
   
     export const leadersFailed = (errmess) => ({
       type: ActionTypes.LEADERS_FAILED,
       payload: errmess
     });
   
     export const addLeaders = (leaders) => ({
       type: ActionTypes.ADD_LEADERS,
       payload: leaders
     });