import React from 'react';
import { FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
  return {
    dishes: state.dishes
  }
};

const Menu = ({navigation, dishes}) => {

  const { navigate } = navigation;

  const renderMenuItem = ({item}) => {
    return (
      <Tile
        key={item.name}
        title={item.name}
        caption={item.description}
        featured
        imageSrc={{ uri: baseUrl + item.image }}
        onPress={() => navigate('Dishdetail', { dishId: item.id })}
      />
    )
  };

  return (
    <FlatList
      data={dishes.dishes}
      renderItem={renderMenuItem}
      keyExtractor={item => item.id.toString()}
    />
  )
};

export default connect(mapStateToProps)(Menu);