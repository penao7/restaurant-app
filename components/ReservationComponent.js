import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Switch, Platform, Modal} from 'react-native';
import { Picker } from '@react-native-community/picker';
import { DateTimePickerModal } from 'react-native-modal-datetime-picker';
import moment from 'moment';

const Reservation = ({ navigation }) => {

  const [dateTimeVisibility, setDateTimeVisibility] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [reservation, setReservation] = useState({
    guests: 1,
    type: false,
    date: new Date()
  });

  const toggleDate = () => {
    setDateTimeVisibility(!dateTimeVisibility);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleConfirm = (date) => {
    setDateTimeVisibility(Platform.OS === 'ios');
    setReservation({...reservation, date: date})
  };

  const handleReservation = () => {
    toggleModal();
  };

  const resetForm = () => {
    setReservation({
      guests: 1,
      menu: false,
      date: new Date()
    });
  };

  return (
    <ScrollView>
      <View style={styles.formRow}>
        <Text style={styles.formLabel}>
          Number of Guests
        </Text>
        <Picker
          style={styles.formItem}
          selectedValue={reservation.guests}
          onValueChange={itemValue => setReservation({...reservation, guests: itemValue})}
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
          onValueChange={value => setReservation({...reservation, menu: value})}
        />
      </View>
      <View style={styles.formRow}>
        <View style={styles.formPickerLabel}>
          <Button title="Select date" onPress={toggleDate}/>
        </View>
          <Text style={styles.formDateItem}>
            {
              reservation.date 
              ? moment(reservation.date.toISOString()).format('Do MMMM YYYY, h:mm') 
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
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={showModal}
        onDismiss={() => toggleModal()}
        onRequestClose={() => {toggleModal(); resetForm()}}
      >
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>
            Your Reservation
          </Text>
          <Text style={styles.modalText}>
            Number of Guests: {reservation.guests}
          </Text>
          <Text style={styles.modalText}>
            Menu type: {reservation.menu ? 'Tasting menu' : 'Classic menu'}  
          </Text>
          <Text style={styles.modalText}>
            {moment(reservation.date.toISOString()).format('Do MMMM YYYY, h:mm')}
          </Text>
          <Button
            onPress={() => {toggleModal(); resetForm()}}
            color='#512DA8'
            title='close'
          />
        </View>
      </Modal>

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
