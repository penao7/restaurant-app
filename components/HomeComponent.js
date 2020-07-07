import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Animated, Easing } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    promotions: state.promotions,
    leaders: state.leaders
  };
};

const RenderItem = ({item, isLoading, errMess}) => {

  return (
    isLoading
    ? <Loading/>
    : errMess
    ? 
      <View>
        <Text>{errMess}</Text>
      </View>
    : item
    ?
      <Card
        featuredTitle={item.name}
        featuredSubtitle={item.designation}
        image={{ uri: baseUrl + item.image}}
      >
        <Text style={{margin: 10}}>
          {item.description}
        </Text>
      </Card>
    : <View></View>
  );
};

const Home = ({dishes, promotions, leaders}) => {

  const [animatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    animate();
  });

  const animate = () => {
    animatedValue.setValue(0);
    Animated.timing (
      animatedValue,
      {
        toValue: 8,
        duration: 8000,
        useNativeDriver: false,
        easing: Easing.linear
      }
    ).start(() => animate());
  };

  const xpos1 = animatedValue.interpolate({
    inputRange: [0, 1, 3, 5, 8],
    outputRange: [1200, 600, 0, -600, -1200]
  });

  const xpos2 = animatedValue.interpolate({
    inputRange: [0, 2, 4, 6, 8],
    outputRange: [1200, 600, 0, -600, -1200]
  });

  const xpos3 = animatedValue.interpolate({
    inputRange: [0, 3, 5, 7, 8],
    outputRange: [1200, 600, 0, -600, -1200]
  });

  return (
    <ScrollView>
        <RenderItem
          item={dishes.dishes.filter(dish => dish.featured)[0]}
          errMess={dishes.errMess}
          isLoading={dishes.isLoading}
        />
        <RenderItem
          item={leaders.leaders.filter(leader => leader.featured)[0]}
          errMess={leaders.errMess}
          isLoading={leaders.isLoading}
        />
        <RenderItem
          item={promotions.promotions.filter(promotion => promotion.featured)[0]}
          errMess={promotions.errMess}
          isLoading={promotions.isLoading}
        />
    </ScrollView>
  );
};

export default connect(mapStateToProps)(Home);