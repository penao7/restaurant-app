import React from 'react';
import { FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
  return {
    dishes: state.dishes
  }
};

const Menu = ({ navigation, dishes }) => {

  const { navigate } = navigation;

  const renderMenuItem = ({ item }) => {
    
    return (
      <Animatable.View
        animation="fadeInRightBig"
        duration={1000}
        delay={0}
      >
        <Tile
          key={item._id}
          title={item.name}
          caption={item.description}
          featured
          imageSrc={{ uri: baseUrl + item.image }}
          onPress={() => navigate('Dishdetail', { dishId: item._id })}
        />
      </Animatable.View>
    )
  };

  return (

    dishes.dishes 
    ?
    dishes.isLoading
      ? <Loading />
      : dishes.errMess
        ?
        <View>
          <Text>
            {dishes.errMess}
          </Text>
        </View>
        :
        <FlatList
          data={dishes.dishes}
          renderItem={renderMenuItem}
          keyExtractor={item => item._id}
        />
      : <Loading/>
  )
};

export default connect(mapStateToProps)(Menu);