import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

const RenderItem = ({item}) => {
  return (
    item
    ? 
      <Card
        featuredTitle={item.name}
        featuredSubtitle={item.designation}
        image={require('./images/uthappizza.png')}
      >
        <Text style={{margin: 10}}>
          {item.description}
        </Text>
      </Card>
    : ""
  );
};

const Home = () => {

  const [data] = useState({
    dishes: DISHES,
    promotions: PROMOTIONS,
    leaders: LEADERS
  });

  return (
    <ScrollView>
      <RenderItem
        item={data.dishes.filter(dish => dish.featured)[0]}
      />
      <RenderItem
        item={data.leaders.filter(leader => leader.featured)[0]}
      />
      <RenderItem
        item={data.promotions.filter(promotion => promotion.featured)[0]}
      />
    </ScrollView>
  );
};

export default Home;