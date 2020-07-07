import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

const Information = () => {
  return (
      <Animatable.View
        animation="fadeInDown"
        duration={1000}
        delay={0}
      >
        <Card
          title="Contact information"
          featuredTitle="Our address"
        >
          <Text>
            121, Clear Water Bay Road{"\n\n"}
            Clear Water Bay, Kowloon{"\n\n"}
            HONG KONG{"\n\n"}
            Tel: +852 1234 5678{"\n\n"}
            Fax: +852 8765 4321{"\n\n"}
            Email: confusion@food.net{"\n"}
          </Text>
        </Card>
      </Animatable.View>
  );
};

const Contact = () => {
  return (
    <View>
      <Information/>
    </View>
  );
};

export default Contact;