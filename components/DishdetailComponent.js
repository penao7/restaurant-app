import React, { useState } from 'react';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Button } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavourite, postComment } from '../redux/ActionCreators';
import moment from 'moment';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favourites: state.favourites
  };
};

const mapDispatchToProps = dispatch => ({
  postFavourite: (dishId) => dispatch(postFavourite(dishId)),
  postComment: (comment) => dispatch(postComment(comment))
});
  
const RenderDish = ({dish, favourite, onPress, toggleModal}) => {

  return (
    dish 
    ?
    <View>
      <Card
        featuredTitle={dish.name}
        image={{uri: baseUrl + dish.image}}
      >
        <Text style={{margin: 10}}>
          {dish.description}
        </Text>
        <View style={{justifyContent: 'center', flexDirection: 'row'}}>
          <Icon
            raised
            reverse
            name={favourite ? "heart" : "heart-o"}
            type="font-awesome"
            color="#f50"
            onPress={() => onPress()}
          />
          <Icon
            raised
            reverse
            name="pencil"
            type="font-awesome"
            color="blue"
            onPress={() => toggleModal()}
          />
        </View>
      </Card>
    </View>
    : <Text></Text>
  );
};

const RenderComments = ({comments}) => {

  const renderCommentItem = ({ item }) => {
    return (
      <View key={item.id} style={{margin: 10}}>
        <Text style={{fontSize: 14}}>
          {item.comment}
        </Text>
        <View style={{flexDirection: "row"}}>
          <Rating
            fractions={0}
            style={{margin: 5}}
            readonly
            startingValue={item.rating}
            imageSize={30}
          />
        </View>
        <Text style={{fontSize: 12}}>
          {"-- " + item.author + ', ' + moment(item.date).format('MMMM Do YYYY')}
        </Text>
      </View>
    );
  };

  return (
      <Card title="Comments">
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={item => item.id.toString()}
        />
      </Card>
  );

};

const Dishdetail = ({dishes, favourites, comments, route, postFavourite, postComment}) => {

  const dishId = route.params.dishId

  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState({
    dishId: dishId,
    comment: "",
    author: "",
  });

  const [rating, setRating] = useState(3);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const submitComment = () => {
    console.log(comment);
    const newComment = ({
      dishId: comment.dishId,
      comment: comment.comment,
      author: comment.author,
      date: new Date().toISOString(),
      rating: rating
    })
    postComment(newComment);
    resetForm();
  };

  const resetForm = () => {
    setComment({
      dishId: dishId,
      author: '',
      comment: '',
      date: new Date().toISOString()
    });
    toggleModal();
  }

  const markFavourite = (dishId) => {
    postFavourite(dishId);
  };

  return (
    <ScrollView>
      <RenderDish 
        dish={dishes.dishes[+dishId]}
        favourite={favourites.some(el => el === dishId)}
        onPress={() => markFavourite(dishId)}
        postComment={postComment}
        toggleModal={toggleModal}
      />
      <RenderComments comments={comments.comments.filter(comment => comment.dishId === dishId)}/>
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
              placeholder="Author"
              name="author"
              onChangeText={text => setComment({...comment, author: text})}
              leftIcon={
                <Icon
                  name="user-o"
                  type="font-awesome"
                  size={24}
                  color="black"
                />
              }
            />
            <Input
              placeholder="Comment"
              name="message"
              onChangeText={text => setComment({...comment, comment: text})}
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
          <View style={{margin: 10}}>
            <Button color='#512DA8' style={{margin: 20}} title="Submit" onPress={submitComment}/>
          </View>
          <View style={{margin: 10}}>
            <Button color="gray" title="Cancel" onPress={resetForm}/>
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