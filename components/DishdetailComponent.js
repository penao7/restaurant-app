import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';

const RenderDish = ({dish}) => {
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
      </Card>
    : <Text></Text>
  );
};

const Dishdetail = ({route}) => {

  const [dishes] = useState(DISHES);
  const dishId = route.params.dishId

  return (
      <RenderDish dish={dishes[+dishId]}/>
  );
};

export default Dishdetail