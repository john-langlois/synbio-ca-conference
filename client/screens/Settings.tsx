import { StyleSheet, Text, View } from 'react-native';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { Button } from 'react-native-elements';
import FooterList from '../components/Footer/FooterList';
import { signOut, getAuth, sendPasswordResetEmail } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useFocusEffect } from '@react-navigation/native';

const auth = getAuth();

const Settings = () => {
    
  const API = "https://synbio-conference-2023.ue.r.appspot.com/lead";
  const [data, setData] = useState([]);
  const [resetPasswordMessage, setResetPasswordMessage] = useState('');
  const { user } = useAuthentication();

  const getUsers = async () => {
    await fetch(`${API}/get-lead/${user.email}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  };

  useFocusEffect(
    React.useCallback(() => {
      if (user?.email) {
         getUsers(); // Call the API function here
      }
    }, [user?.email])
  );

  const convertToCSV = (jsonArray) => {
    const keys = Object.keys(jsonArray[0]);

    const csv = jsonArray.map((row) => keys.map((key) => row[key]).join(','));

    return [keys.join(','), ...csv].join('\n');
  };

  const saveCSVToFile = async (csvData) => {
    const fileUri = FileSystem.documentDirectory + 'data.csv';

    try {
      await FileSystem.writeAsStringAsync(fileUri, csvData);
      return fileUri;
    } catch (error) {
      console.error('Error saving CSV file:', error);
      return null;
    }
  };

  const shareFile = async (fileUri) => {
    try {
      await Sharing.shareAsync(fileUri, {
        mimeType: 'text/csv',
        dialogTitle: 'Share CSV file',
        UTI: 'public.comma-separated-values-text',
      });
    } catch (error) {
      console.error('Error sharing CSV file:', error);
    }
  };

  const handleExportToCSV = async () => {
    try {
      if (data.length > 0) {
        const csvData = convertToCSV(data);
        const fileUri = await saveCSVToFile(csvData);
        if (fileUri) {
          await shareFile(fileUri);
        }
      }
    } catch (error) {
      console.error('Error exporting to CSV:', error);
    }
  };

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, user.email)
      .then(() => {
        // Password reset email sent successfully
        setResetPasswordMessage('Password reset email sent, please check junk folder');
      })
      .catch((error) => {
        // An error occurred while sending the password reset email
        console.log('Error sending password reset email:', error);
      });
  };

  const FooterListMemo = React.memo(FooterList);

  return (
    <View style={styles.container}>
        <Text style={styles.emailText}>Welcome {user?.displayName}</Text>
      <Text style={styles.emailText}>{user?.email}</Text>
      <Button
        title="Reset Password"
        buttonStyle={styles.button}
        onPress={handleResetPassword}
      />
      {resetPasswordMessage !== '' && (
        <Text style={styles.resetPasswordMessage}>{resetPasswordMessage}</Text>
      )}
      
      <Button
        title="Export to CSV"
        buttonStyle={styles.button}
        onPress={handleExportToCSV}
      />
      <Button
        title="Sign Out"
        buttonStyle={styles.button}
        onPress={() => signOut(auth)}
      />
      <FooterListMemo />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginVertical: 40,
    width: 200,
    borderRadius: 15,
    backgroundColor: 'black',
  },
  emailText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resetPasswordMessage: {
    fontSize: 16,
    color: 'green',
    marginBottom: 10,
  },
});
