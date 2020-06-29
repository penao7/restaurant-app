import React from 'react';
import { View, Text } from 'react-native';
import { ListItem, Card } from 'react-native-elements';

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

const Dishdetail = ({dish}) => {
  return (
      <RenderDish dish={dish}/>
  );
};

export default Dishdetail