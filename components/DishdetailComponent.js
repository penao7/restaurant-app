import React, { useState, useRef } from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Modal,
  StyleSheet,
  Button,
  Alert,
  PanResponder,
  Share
} from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { toggleFavourite, postComment, postFavourite, deleteFavourite } from '../redux/ActionCreators';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favourites: state.favourites,
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => ({
  postFavourite: (dishId) => dispatch(postFavourite(dishId)),
  deleteFavourite: (dishId) => dispatch(deleteFavourite(dishId)),
  postComment: (comment) => dispatch(postComment(comment))
});

const RenderDish = ({ dish, favourite, postFavourite, deleteFavourite, toggleModal }) => {

  const handleViewRef = useRef('');

  const recognizeDrag = ({ dx }) => {
    return (
      dx < -200 ? true : false
    );
  };

  const recognizeComment = ({ dx }) => {
    return (
      dx > 200 ? true : false
    );
  };

  const shareDish = (title, message, url) => {
    Share.share({
      title: title,
      message: title + ': ' + message + ' ' + url,
      url: url
    }, {
      dialogTitle: 'Share ' + title
    });
  };

  const panResponder = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => {
      return true;
    },
    onPanResponderGrant: () => {
      handleViewRef.current.shake(800);
    },
    onPanResponderEnd: (e, gestureState) => {
      if (recognizeDrag(gestureState)) {
        Alert.alert(
          'Add to favourite',
          'Are you sure you wish to add ' + dish.name + ' to you favourites?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel pressed'),
              style: 'cancel'
            },
            {
              text: 'Add',
              onPress: () => postFavourite(dish._id),
            }
          ],
          { cancelable: false }
        );
      } else if (recognizeComment(gestureState)) {
        toggleModal()
      };
      return true;
    }
  })).current;

  return (
    dish
      ?
      <View>
        <Animatable.View
          ref={handleViewRef}
          animation="fadeInDown"
          duration={1000}
          delay={500}
          {...panResponder.panHandlers}
        >
          <Card
            featuredTitle={dish.name}
            image={{ uri: baseUrl + dish.image }}
          >
            <Text style={{ margin: 10 }}>
              {dish.description}
            </Text>
            <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
              <Icon
                raised
                reverse
                name={favourite ? "heart" : "heart-o"}
                type="font-awesome"
                color="#f50"
                onPress={() => favourite ? deleteFavourite(dish._id) : postFavourite(dish._id)}
              />
              <Icon
                raised
                reverse
                name="pencil"
                type="font-awesome"
                color="blue"
                onPress={() => toggleModal()}
              />
              <Icon
                raised
                reverse
                name="share"
                type="font-awesome"
                color="#51D2A8"
                onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)}
              />
            </View>
          </Card>
        </Animatable.View>
      </View>
      : <Text></Text>
  );
};

const RenderComments = ({ comments }) => {

  const renderCommentItem = ({ item }) => {
    return (
      <View key={item._id} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>
          {item.comment}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Rating
            fractions={0}
            style={{ margin: 5 }}
            readonly
            startingValue={item.rating}
            imageSize={30}
          />
        </View>
        <Text style={{ fontSize: 12 }}>
          {"-- " + item.author.author + ', ' + moment(item.updatedAt.toDate()).format('MMMM Do YYYY')}
        </Text>
      </View>
    );
  };

  return (
    <Animatable.View
      animation="fadeInUp"
      duration={1000}
      delay={500}
    >
      <Card title="Comments">
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={item => item._id}
        />
      </Card>
    </Animatable.View>
  );

};

const Dishdetail = ({ dishes, favourites, comments, route, postFavourite, deleteFavourite, postComment, auth }) => {

  const dishId = route.params.dishId

  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState({
    dishId: dishId,
    comment: "",
  });

  const [rating, setRating] = useState(3);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const submitComment = () => {
    const newComment = ({
      dishId: comment.dishId,
      comment: comment.comment,
      rating: rating
    })
    postComment(newComment);
    resetForm();
  };

  const resetForm = () => {
    setComment({
      dishId: dishId,
      comment: '',
    });
    toggleModal();
  }

  const markFavourite = (dishId) => {
    toggleFavourite(dishId);
  };

  return (
    <ScrollView>
      {auth.isAuthenticated && favourites.favourites
        ?
        <RenderDish
          dish={dishes.dishes.filter(dish => dish._id === dishId)[0]}
          favourite={favourites.isLoading ? false : favourites.favourites.dishes.some(el => el === dishId)}
          onPress={() => markFavourite(dishId)}
          postComment={postComment}
          toggleModal={toggleModal}
          postFavourite={postFavourite}
          deleteFavourite={deleteFavourite}
        />
        :
        <RenderDish
          dish={dishes.dishes.filter(dish => dish._id === dishId)[0]}
          favourite={false}
          onPress={() => markFavourite(dishId)}
          postComment={postComment}
          toggleModal={toggleModal}
          postFavourite={postFavourite}
          deleteFavourite={deleteFavourite}
        />
      }
      <RenderComments comments={comments.comments.filter(comment => comment.dishId === dishId)} />
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={showModal}
        onDismiss={() => toggleModal()}
        onRequestClose={() => toggleModal()}
      >
        <View style={styles.modal}>
          <View>
            <Rating
              fractions={0}
              showRating
              onFinishRating={rating => setRating(rating)}
              startingValue={3}
            >
            </Rating>
          </View>
          <View style={styles.modalText}>
            <Input
              placeholder="Comment"
              name="message"
              onChangeText={text => setComment({ ...comment, comment: text })}
              leftIcon={
                <Icon
                  name="comment-o"
                  type="font-awesome"
                  size={24}
                  color="black"
                />
              }
            />
          </View>
          <View style={{ margin: 10 }}>
            <Button color='#512DA8' style={{ margin: 20 }} title="Submit" onPress={submitComment} />
          </View>
          <View style={{ margin: 10 }}>
            <Button color="gray" title="Cancel" onPress={resetForm} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    margin: 20
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#512DA8',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20
  },
  modalText: {
    fontSize: 18,
    margin: 10
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);