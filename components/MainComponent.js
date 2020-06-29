import React, { useState } from 'react';
import { View } from 'react-native';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import Dishdetail from './DishdetailComponent';

const Main = () => {

  const [dishes, setDishes] = useState({
    dishes: DISHES,
    selectedDish: ''
  });

  const onDishSelect = (dishId) => {
    setDishes({...dishes, selectedDish: dishId})
  };
    

  return (
    <View>
      <Menu 
        dishes={dishes.dishes}
        onPress={dishId => onDishSelect(dishId)}
      />
      <Dishdetail dish={dishes.dishes.filter(dish => dish.id === dishes.selectedDish)[0]}/>
    </View>
  )
};

export default Main;