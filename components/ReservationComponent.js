import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Switch, Platform, Alert } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { DateTimePickerModal } from 'react-native-modal-datetime-picker';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';

const Reservation = ({ navigation }) => {

  const [dateTimeVisibility, setDateTimeVisibility] = useState(false);

  const [reservation, setReservation] = useState({
    guests: 1,
    type: false,
    date: new Date().toISOString()
  });

  const toggleDate = () => {
    setDateTimeVisibility(!dateTimeVisibility);
  };

  const handleConfirm = (date) => {
    setDateTimeVisibility(Platform.OS === 'ios');
    setReservation({ ...reservation, date: date.toISOString() })
  };

  const resetForm = () => {
    setReservation({
      guests: 1,
      menu: false,
      date: new Date()
    });
  };

  const obtainNotificationPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
    if (status !== 'granted') {
      Alert.alert('Permission not granted to show notification');
    }
    return status;
  };

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false
    })
  });


  const triggerNotification = async (date) => {
    await obtainNotificationPermission();
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Your Reservation',
        body:
          'Your reservation for date ' +
          moment(date).format('Do MMMM YYYY, h:mm') +
          ' is requested'
      },
      trigger: null
    });
  };

  const obtainCalendarPermission = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission not granted for using calendar')
    }
    return status;
  };

  const addReservationToCalendar = async (date) => {

    await obtainCalendarPermission();
    Calendar.createEventAsync(Calendar.DEFAULT, {
      title: 'Con Fusion Table Reservation',
      startDate: moment(date, "YYYY-MM-DD'T'HH:mm:ss.sssZ").toDate(),
      endDate: moment(date, "YYYY-MM-DD'T'HH:mm:ss.sssZ").add(2, 'hours').toDate(),
      timeZone: 'Asia/Hong_Kong',
      location: '121, Clear Water Bay Road, Kowloon, Hong Kong'
    });
  };

  const handleReservation = () => {
    triggerNotification();
    addReservationToCalendar(reservation.date);
    resetForm();
  };

  return (
    <ScrollView>
      <Animatable.View
        animation="zoomIn"
        duration={300}
      >
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>
            Number of Guests
        </Text>
          <Picker
            style={styles.formItem}
            selectedValue={reservation.guests}
            onValueChange={itemValue => setReservation({ ...reservation, guests: itemValue })}
          >
            <Picker.Item label='1' value='1' />
            <Picker.Item label='2' value='2' />
            <Picker.Item label='3' value='3' />
            <Picker.Item label='4' value='4' />
            <Picker.Item label='5' value='5' />
            <Picker.Item label='6' value='6' />
          </Picker>
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>
            Classic menu / Tasting menu
        </Text>
          <Switch
            style={styles.formItem}
            value={reservation.menu}
            onTrackColor='#512DA8'
            onValueChange={value => setReservation({ ...reservation, menu: value })}
          />
        </View>
        <View style={styles.formRow}>
          <View style={styles.formPickerLabel}>
            <Button title="Select date" onPress={toggleDate} />
          </View>
          <Text style={styles.formDateItem}>
            {
              reservation.date
                ? moment(reservation.date).format('Do MMMM YYYY, h:mm')
                : 'Please select date'
            }
          </Text>
          <DateTimePickerModal
            isVisible={dateTimeVisibility}
            mode='datetime'
            locale='en_GB'
            date={new Date()}
            onConfirm={handleConfirm}
            onCancel={toggleDate}
          />
        </View>
        <View style={styles.formRow}>
          <View style={styles.formButtonItem}>
            <Button onPress={() => navigation.goBack()} title="Cancel" />
          </View>
          <View style={styles.formButtonItem}>
            <Button
              title='Reserve'
              color='#512DA8'
              onPress={() => handleReservation()}
              accessibilityLabel='Learn more about this purple button'
            />
          </View>
        </View>
      </Animatable.View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  formRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 4,
    flexDirection: 'row',
    margin: 20
  },
  formLabel: {
    fontSize: 18,
    flex: 4
  },
  formPickerLabel: {
    fontSize: 18,
    flex: 1
  },
  formItem: {
    flex: 1,
  },
  formDateItem: {
    flex: 1,
    marginLeft: 40
  },
  formButtonItem: {
    flex: 1,
    margin: 10
  },
  datePicker: {
    flex: 1,
    marginRight: 20
  },
  modal: {
    justifyContent: 'center',
    margin: 20
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#512DA8',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20
  },
  modalText: {
    fontSize: 18,
    margin: 10
  }
});

export default Reservation
