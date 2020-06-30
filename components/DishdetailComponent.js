import React, { useState } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';

const RenderDish = ({dish, favourite, onPress, onDelete}) => {
  return (
    dish 
    ?
      <Card
        featuredTitle={dish.name}
        image={require('./images/uthappizza.png')}
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
    stars.push(<Icon name="star" type="ion-icon" color="orange"/>
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

const Dishdetail = ({route}) => {

  const [data, setData] = useState({
    dishes: DISHES,
    comments: COMMENTS,
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
        dish={data.dishes[+dishId]}
        favourite={data.favourites.some(el => el === dishId)}
        onPress={() => markFavourite(dishId)}
        onDelete={() => removeFavourite(dishId)}
      />
      <RenderComments comments={data.comments.filter(comment => comment.dishId === dishId)}/>    
    </ScrollView>  
  );
};

export default Dishdetail