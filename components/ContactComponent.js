import React from 'react';
import { View, Text } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as MailComposer from 'expo-mail-composer';
import * as Animatable from 'react-native-animatable';

const Contact = () => {

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
            <Button
              title=' Send Email'
              buttonStyle={{ backgroundColor: '#512DA8'}}
              icon={<Icon name='envelope-o' type='font-awesome' color='white'/>}
              onPress={sendMail}
            />
          </Card>
        </Animatable.View>
    );
  };

  const sendMail = () => {
    MailComposer.composeAsync({
      recipients: ['confusion@food.net'],
      subject: 'Enquiry',
      body: 'To whom it may concern'
    });
  };

  return (
    <View>
      <Information/>
    </View>
  );
};

export default Contact;