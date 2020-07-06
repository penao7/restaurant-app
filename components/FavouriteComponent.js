import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
  return ({
    dishes: state.dishes,
    favourites: state.favourites
  });
};

const Favourites = ({dishes, favourites, navigation}) => {

  const { navigate } = navigation;

      
  const renderMenuItem = ({item, index}) => {
      return (
        <ListItem
          key={index}
          title={item.name}
          subtitle={item.description}
          hideChevron={true}
          onPress={() => navigate('Dishdetail', {dishId: item.id})}
          leftAvatar={{ source: {uri: baseUrl + item.image}}}
        />
      );
  };

  return (
    dishes.isLoading
    ? <Loading/>
    : dishes.errMess
    ? 
      <View>
        <Text>
          {dishes.errMess}
        </Text>  
      </View>
    : 
      <FlatList
        data={dishes.dishes.filter(dish => favourites.some(el => el === dish.id))}
        renderItem={renderMenuItem}
        keyExtractor={item => item.id.toString()}
      />
  );
};

export default connect(mapStateToProps)(Favourites);