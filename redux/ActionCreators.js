import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";
import { auth, fireauth, firestore, firebasestore } from '../firebase/firebase.js';
import * as SecureStore from 'expo-secure-store';

// Handle dishes

export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true));

  return firestore.collection('dishes').get()
    .then(snapshot => {
      let dishes = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        const _id = doc.id;
        dishes.push({ _id, ...data });
      });
      return dishes;
    })
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(err => dispatch(dishesFailed(err.message)));
};

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess
});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
});

// Comments

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment
});

export const postComment = (comment) => dispatch => {

  if (!auth.currentUser) {
    console.log('No user logged in!');
    return
  };

  return firestore.collection('comments').add({
    author: {
      '_id': auth.currentUser.uid,
      'author': auth.currentUser.displayName ? auth.currentUser.displayName : auth.currentUser.email
    },
    dishId: comment.dishId,
    rating: comment.rating,
    comment: comment.comment,
    createdAt: firebasestore.FieldValue.serverTimestamp(),
    updatedAt: firebasestore.FieldValue.serverTimestamp(),
  })
    .then(docRef => {
      firestore.collection('comments').doc(docRef.id).get()
        .then(doc => {
          if (doc.exists) {
            const data = doc.data();
            const _id = doc.id;
            const comment = { _id, ...data };
            dispatch(addComment(comment));
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          };
        });
    })
    .catch(err => {
      alert('Your comment could not be posted\n Error: ' + err.message);
    });
};

export const fetchComments = () => (dispatch) => {
  return firestore.collection('comments').get()
    .then(snapshot => {
      let comments = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        const _id = data.id;
        comments.push({ _id, ...data });
      });
      return comments;
    })
    .then(comments => {
      dispatch(addComments(comments));
    })
    .catch(err => dispatch(commentsFailed(err.message)));
};

export const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});

// Promos

export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading(true));

  return firestore.collection('promotions').get()
    .then(snapshot => {
      const promos = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        const _id = doc.id;
        promos.push({ _id, ...data });
      });
      return promos;
    })
    .then(promos => {
      dispatch(addPromos(promos));
    })
    .catch(err => dispatch(promosFailed(err.message)));
};

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess
});

export const addPromos = (promotions) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promotions
});

// Leaders

export const fetchLeaders = () => (dispatch) => {

  dispatch(leadersLoading(true));

  return firestore.collection('leaders').get()
    .then(snapshot => {
      const leaders = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        const _id = data.id;
        leaders.push({ _id, ...data });
      });
      return leaders;
    })
    .then(leaders => {
      dispatch(addLeaders(leaders));
    })
    .catch(err => dispatch(leadersFailed(err.message)));
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

// Feedback

export const addFeedback = (feedback) => ({
  type: ActionTypes.ADD_FEEDBACK,
  payload: feedback
});

export const feedbackFailed = (errmess) => ({
  type: ActionTypes.FEEDBACK_FAILED,
  payload: errmess
});

export const postFeedback = (feedback) => {

  return firestore.collection('feedback').add(feedback)
    .then(response => {
      console.log('Feedback', response);
      alert('Thank you for your feedback!');
    })
    .catch(error => {
      console.log('Feedback', error.message);
      alert('Your feedback could not be posted\nError: ' + error.message);
    });
};

// Favourites

export const favouritesLoading = () => ({
  type: ActionTypes.FAVOURITES_LOADING
});

export const favouritesFailed = (errmess) => ({
  type: ActionTypes.FAVOURITES_FAILED,
  payload: errmess
});

export const addFavourites = (favourites) => ({
  type: ActionTypes.ADD_FAVOURITES,
  payload: favourites
});

export const fetchFavourites = () => (dispatch) => {

  if (!auth.currentUser) {
    console.log('No user logged in!');
    return;
  }

  var user = auth.currentUser;
  dispatch(favouritesLoading(true));

  return firestore.collection('favourites').where('user', '==', user.uid).get()
    .then(snapshot => {
      let favourites = { user: user, dishes: [] };
      snapshot.forEach(doc => {
        const data = doc.data()
        favourites.dishes.push(data.dish);
      });
      return favourites;
    })
    .then(favourites => dispatch(addFavourites(favourites)))
    .catch(error => dispatch(favouritesFailed(error.message)));

};

export const postFavourite = (dishId) => (dispatch) => {

  if (!auth.currentUser) {
    dispatch(favouritesFailed('No user logged in!'));
    return;
  }

  return firestore.collection('favourites').add({
    user: auth.currentUser.uid,
    dish: dishId
  })
    .then(docRef => {
      firestore.collection('favourites').doc(docRef.id).get()
        .then(doc => {
          if (doc.exists) {
            dispatch(fetchFavourites());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        });
    })
    .catch(error => dispatch(favouritesFailed(error.message)));
};

export const deleteFavourite = (dishId) => (dispatch) => {

  if (!auth.currentUser) {
    console.log('No user logged in!');
    return;
  };

  var user = auth.currentUser;

  return firestore.collection('favourites').where('user', '==', user.uid).where('dish', '==', dishId).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        firestore.collection('favourites').doc(doc.id).delete()
          .then(() => {
            dispatch(fetchFavourites());
          })
      });
    })
    .catch(error => dispatch(favouritesFailed(error.message)));

};

// Authentication

export const requestLogin = () => ({
  type: ActionTypes.LOGIN_REQUEST,
});

export const receiveLogin = (user) => ({
  type: ActionTypes.LOGIN_SUCCESS,
  user
});

export const loginError = (message) => ({
  type: ActionTypes.LOGIN_FAILURE,
  payload: message
});

export const loginUser = (creds, remember, cb) => (dispatch) => {
  // We dispatch requestLogin to kickoff the call to the API
  dispatch(requestLogin());

  auth.signInWithEmailAndPassword(creds.username, creds.password)
    .then(() => {
      var user = auth.currentUser;
      if (user) {
        cb(null, true);
      };
      // Dispatch the success action
      dispatch(fetchFavourites());
      dispatch(receiveLogin(user));
      remember
        ? SecureStore.setItemAsync(
          'userinfo',
          JSON.stringify({
            creds
          })
        )
          .catch(err => console.log('Could not save user info', err))

        : SecureStore.deleteItemAsync('userinfo')
          .catch(err => console.log('Could not save user info', err))
    })
    .catch(error => {
      dispatch(loginError('Error ' + error.message));
      cb(false, error.message);
    });
};

// Users

export const postUser = (creds, cb) => (dispatch) => {

  dispatch(userRequest());

  auth.createUserWithEmailAndPassword(creds.username, creds.password)
    .then((user) => {
      if (user) {
        dispatch(userCreate());
        dispatch(loginUser(creds, creds.remember, (err, verify) => {
          console.log('meni loginiin asti');
          if (err) {
            cb(err, null);
          } else if (verify) {
            cb(null, true);
          };
        }));
      } else {
        dispatch(userFailure());
      };
    })
    .catch(err => {
      dispatch(userFailure(err.message));
      cb(err.message, null);
    });
};

export const userRequest = () => ({
  type: ActionTypes.CREATE_REQUEST
});

export const userCreate = () => ({
  type: ActionTypes.CREATE_SUCCESS
});

export const userFailure = (err) => ({
  type: ActionTypes.CREATE_FAILURE,
  payload: err
});


export const googleLogin = () => (dispatch) => {
  const provider = new fireauth.GoogleAuthProvider();

  auth.signInWithPopup(provider)
    .then((result) => {
      var user = result.user;
      localStorage.setItem('user', JSON.stringify());
      // Dispatch the success action
      dispatch(fetchFavourites());
      dispatch(receiveLogin(user));
    })
    .catch((error) => {
      dispatch(loginError(error.message));
    });
};

export const authValidation = () => (dispatch) => {

  return auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch(receiveLogin(user));
      dispatch(fetchFavourites(user));
    } else {
      dispatch(logoutUser());
    };
  });

};

// Logout

export const requestLogout = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST
  }
}

export const receiveLogout = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS
  }
}

export const logoutFailed = (err) => {
  return {
    type: ActionTypes.LOGOUT_FAILURE,
    payload: err
  };
};

export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout())
  auth.signOut()
    .then(() => {
    }).catch(err => {
      dispatch(logoutFailed(err.message));
    });
  dispatch(favouritesFailed("Error 401: Unauthorized"));
  dispatch(receiveLogout())
};



