import React from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import { deleteFavourite } from '../redux/ActionCreators';
import Swipeout from 'react-native-swipeout';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
  return ({
    dishes: state.dishes,
    favourites: state.favourites
  });
};

const mapDispatchToProps = dispatch => ({
  deleteFavourite: dishId => dispatch(deleteFavourite(dishId))
});

const Favourites = ({ dishes, favourites, navigation, deleteFavourite }) => {

  const { navigate } = navigation;

  const renderMenuItem = ({ item, index }) => {

    const rightButton = [
      {
        text: 'Delete',
        type: 'delete',
        onPress: () => {
          Alert.alert(
            'Delete favourite',
            'Are you sure you wish to delete the favourite dish ' + item.name + '?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log(item.name + ' Not Deleted'),
                style: 'cancel'
              },
              {
                text: 'Delete',
                onPress: () => deleteFavourite(item._id),
                style: 'delete'
              }
            ],
            { cancelable: false }
          );
        }
      }
    ];

    return (
      <Swipeout
        right={rightButton}
        autoClose={true}
      >
        <Animatable.View
          animation="fadeInRightBig"
          duration={1000}
          delay={0}
        >
          <ListItem
            key={index}
            title={item.name}
            subtitle={item.description}
            hideChevron={true}
            onPress={() => navigate('Dishdetail', { dishId: item._id })}
            leftAvatar={{ source: { uri: baseUrl + item.image } }}
          />
        </Animatable.View>
      </Swipeout>
    );
  };

  return (
    dishes.isLoading
      ? <Loading />
      : dishes.errMess
        ?
        <View>
          <Text>
            {dishes.errMess}
          </Text>
        </View>
        : favourites.favourites
        ?
        <FlatList
          data={dishes.dishes.filter(dish => favourites.favourites.dishes.some(el => el === dish._id))}
          renderItem={renderMenuItem}
          keyExtractor={item => item._id}
        />
        : <Loading/>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);