import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
  return {
    leaders: state.leaders
  };
};

  const History = () => {
    return (
      <Card title="Our History">
        <View>
          <Text>
            Started in 2010, Ristorante con Fusion quickly established
            itself as a culinary icon par excellence in Hong Kong. With 
            its unique brand of world fusion cuisine that can be found nowhere 
            else, it enjoys patronage from the A-list clientele in Hong Kong.  
            Featuring four of the best three-star Michelin chefs in the world, 
            you never know what will arrive on your plate the next time you visit us.{"\n\n"}

            The restaurant traces its humble beginnings to The Frying Pan, a successful 
            chain started by our CEO, Mr. Peter Pan, that featured for the first time the 
            world's best cuisines in a pan.
          </Text>
        </View>
      </Card>
    )

  }

  const RenderLeaders = ({leaders}) => {
    return (
      <Card title="Corporate Leadership">
          {
            leaders.map(leader => 
              <ListItem
              key={leader.name}
              title={leader.name}
              subtitle={leader.description}
              hideChevron={true}
              leftAvatar={{source: {uri: baseUrl + leader.image}}}
            />
              )
          }
      </Card>
    );
  };

  const About = ({leaders}) => {

  return (
    leaders.isLoading
    ?
    <ScrollView>
      <Card title="Corporate Leadership">
        <Loading/>
      </Card>
    </ScrollView>
    : leaders.errMess
    ?     
    <ScrollView>
      <Animatable.View
        animation="fadeInDown"
        duration={2000}
        delay={0}
      >
        <Card title="Corporate Leadership">
          <View>
            <Text>
              {leaders.errMess}
            </Text>
          </View>
        </Card>
      </Animatable.View>
    </ScrollView>
    :
    <ScrollView>
      <Animatable.View
        animation="fadeInDown"
        duration={2000}
        delay={1000}
      >
        <History/>
        <RenderLeaders leaders={leaders.leaders}/>
      </Animatable.View>
    </ScrollView>
  );
};

export default connect(mapStateToProps)(About);