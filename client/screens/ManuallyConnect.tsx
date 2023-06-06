import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Image, Keyboard } from 'react-native';
import { Button } from 'react-native-elements';
import React from 'react';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { StackScreenProps } from '@react-navigation/stack';
import FooterList from '../components/Footer/FooterList';

import { getAuth } from 'firebase/auth';
const auth = getAuth();

const ManuallyConnect: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const FooterListMemo = React.memo(FooterList);
  const API = 'https://synbio-conference-2023.ue.r.appspot.com/lead';
  const { user } = useAuthentication();

  const [name, setName] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [role, setRole] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const addLead = async () => {
    if (name === '' || company === '' || role === '' || email === '') {
      setError('Please fill out all fields');
      return;
    }

    try {
      const response = await fetch(`${API}/add-lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, company, email, role, vendorEmail: user?.email }),
      });

      if (response.status === 200) {
        setSuccess(`Success adding ${name} to your contacts`);
        navigation.navigate('Home');
      } else {
        setError(`There was an error adding ${name} to your contacts, please try again`);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleNameChange = (text: string) => {
    setName(text);
  };
  const handleCompanyChange = (text: string) => {
    setCompany(text);
  };
  const handleRoleChange = (text: string) => {
    setRole(text);
  };
  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={handleNameChange}
          style={styles.input}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={handleEmailChange}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Company</Text>
        <TextInput
          placeholder="Company"
          value={company}
          onChangeText={handleCompanyChange}
          style={styles.input}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Role</Text>
        <TextInput
          placeholder="Role"
          value={role}
          onChangeText={handleRoleChange}
          style={styles.input}
          autoCapitalize="none"
        />
      </View>
      {error !== '' && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      {success !== '' && (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>{success}</Text>
        </View>
      )}
      <TouchableOpacity style={styles.buttonStyle} onPress={addLead}>
        <Text style={styles.buttonText}>Add Contact</Text>
      </TouchableOpacity>
      <FooterListMemo />
    </KeyboardAvoidingView>
  );
};

export default ManuallyConnect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  inputContainer: {
    marginTop: 20,
    marginHorizontal: 24,
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    color: '#8e93a1',
  },
  input: {
    borderBottomWidth: 0.5,
    height: 58,
    borderBottomColor: '#8e93a1',
  },
  errorContainer: {
    marginHorizontal: 24,
    marginBottom: '5%',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  successContainer: {
    marginHorizontal: 24,
    marginBottom: '5%',
  },
  successText: {
    fontSize: 16,
    color: 'green',
    textAlign: 'center',
  },
  buttonStyle: {
    backgroundColor: 'black',
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    marginHorizontal: 85,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
