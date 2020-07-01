import React from 'react';
import { View, ScrollView, Text } from 'react-native';
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