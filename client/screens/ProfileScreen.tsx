import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import FooterList from '../components/Footer/FooterList';
import { StackScreenProps } from '@react-navigation/stack';

const ProfileScreen: React.FC<StackScreenProps<any>> = ({ route, navigation }) => {
  const FooterListMemo = React.memo(FooterList);
  const { userProfile } = route.params;
  const [error, setError] = React.useState('');
  const API = 'https://synbio-conference-2023.ue.r.appspot.com/lead';

  const { name, company, email, role, vendorEmail } = userProfile;

  const deleteUser = async () => {
    try {
      const response = await fetch(`${API}/delete-lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, vendorEmail: vendorEmail }),
      });

      if (response.status === 200) {
        navigation.navigate('Home');
      } else {
        setError(`There was an error deleting ${name}, please try again`);
      }
    } catch (err) {
      setError(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.profileDetails}>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Company:</Text>
          <Text style={styles.value}>{company}</Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email:</Text>
          <TouchableOpacity onPress={() => Linking.openURL(`mailto:${email}`)}>
            <View style={styles.valueContainer}>
              <Text style={styles.value}>{email}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Role:</Text>
          <Text style={styles.value}>{role}</Text>
        </View>
        <TouchableOpacity style={styles.buttonStyle} onPress={deleteUser}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
      <FooterListMemo />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#138f3a',
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  line: {
    height: 1,
    backgroundColor: '#CCCCCC',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  profileDetails: {
    padding: 16,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  valueContainer: {
    backgroundColor: '#e6e6e6',
    padding: 8,
    borderRadius: 4,
  },
  value: {
    fontSize: 16,
  },
  buttonStyle: {
    backgroundColor: 'black',
    height: 50,
    marginTop: 20,
    justifyContent: 'center',
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 25,
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
