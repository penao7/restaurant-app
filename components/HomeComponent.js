import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    promotions: state.promotions,
    leaders: state.leaders
  };
};

const RenderItem = ({item}) => {
  return (
    item
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

  return (
    <ScrollView>
      <RenderItem
        item={dishes.dishes.filter(dish => dish.featured)[0]}
      />
      <RenderItem
        item={leaders.leaders.filter(leader => leader.featured)[0]}
      />
      <RenderItem
        item={promotions.promotions.filter(promotion => promotion.featured)[0]}
      />
    </ScrollView>
  );
};

export default connect(mapStateToProps)(Home);