import React, { useState } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments
  };
};

const RenderDish = ({dish, favourite, onPress, onDelete}) => {
  return (
    dish 
    ?
      <Card
        featuredTitle={dish.name}
        image={{uri: baseUrl + dish.image}}
      >
        <Text style={{margin: 10}}>
          {dish.description}
        </Text>  
        <Icon
          raised
          reverse
          name={favourite ? "heart" : "heart-o"}
          type="font-awesome"
          color="#f50"
          onPress={() => favourite ? onDelete() : onPress()}
        >
        </Icon>
      </Card>
    : <Text></Text>
  );
};

const renderStars = (rating) => {
  let i = 0;
  let stars = []
  while (i < rating) {
    stars.push(<Icon key={i} name="star" type="ion-icon" color="orange"/>
    );
    i++
  };
  return stars
};

const RenderComments = ({comments}) => {

  const renderCommentItem = ({ item }) => {
    return (
      <View key={item.id} style={{margin: 10}}>
        <Text style={{fontSize: 14}}>
          {item.comment}
        </Text>
        <View style={{flexDirection: "row"}}>
          {renderStars(item.rating).map(star => star)}
        </View>
        <Text style={{fontSize: 12}}>
          {"-- " + item.author + ', ' + item.date}
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

const Dishdetail = ({dishes, comments, route}) => {

  const [data, setData] = useState({
    favourites: []
  });

  const dishId = route.params.dishId

  const markFavourite = (dishId) => {
    setData({...data, favourites: data.favourites.concat(dishId)})
  };

  const removeFavourite = (dishId) => {
    setData({...data, favourites: data.favourites.filter(favourite => favourite !== dishId)})
  } 

  return (
    <ScrollView>
      <RenderDish 
        dish={dishes.dishes[+dishId]}
        favourite={data.favourites.some(el => el === dishId)}
        onPress={() => markFavourite(dishId)}
        onDelete={() => removeFavourite(dishId)}
      />
      <RenderComments comments={comments.comments.filter(comment => comment.dishId === dishId)}/>    
    </ScrollView>  
  );
};

export default connect(mapStateToProps)(Dishdetail);