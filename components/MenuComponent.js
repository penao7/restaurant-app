import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

const Menu = ({dishes, onPress}) => {

  const renderMenuItem = ({item}) => {
    return (
      <ListItem
        key={item.name}
        title={item.name}
        subtitle={item.description}
        hideChevron={true}
        leftAvatar={{source: require('./images/uthappizza.png')}}
        onPress={() => onPress(item.id)}
      />
    )
  };

  return (
    <FlatList
      data={dishes}
      renderItem={renderMenuItem}
      keyExtractor={item => item.id.toString()}
    />
  )
};

export default Menu;