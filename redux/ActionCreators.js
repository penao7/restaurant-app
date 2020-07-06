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
      let errmess = new Error(error.message);
      throw errmess
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

  export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
  });

  export const postComment = (comment) => (dispatch) => {

    return fetch(baseUrl + "comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(comment)
    })
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
        let errmess = new Error(error.message);
        throw errmess
      })
      .then(response => response.json())
      .then(response => dispatch(addComment(response)))
      .catch(error => alert(error.message))
  };

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
        let errmess = new Error(error.message);
        throw errmess
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

    export const fetchPromos = () => (dispatch) => {
      dispatch(promosLoading());
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
          let errmess = new Error(error.message);
          throw errmess
        })
        .then(response => response.json())
        .then(response => dispatch(addPromos(response)))
        .catch(error => dispatch(promosFailed(error.message)))
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

   export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading());

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
         let errmess = new Error(error.message);
         throw errmess
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

     // Handle Favourites

     export const postFavourite = (dishId) => (dispatch) => {
         dispatch(addFavourite(dishId));
     };

     export const addFavourite = (dishId) => ({
       type: ActionTypes.ADD_FAVOURITE,
       payload: dishId
     });

 