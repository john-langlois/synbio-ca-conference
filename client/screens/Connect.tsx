import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { StackScreenProps } from '@react-navigation/stack';
import FooterList from '../components/Footer/FooterList';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';

type Props = StackScreenProps<any>;

const Connect: React.FC<Props> = ({ navigation }) => {
  const FooterListMemo = React.memo(FooterList);
  const { user } = useAuthentication();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [data, setData] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const API = "https://synbio-conference-2023.ue.r.appspot.com/lead";

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }: { data: number }) => {
    setScanned(true);
    setData(data);

    // Send the request to the API
    sendLeadData(data);
  };

  const sendLeadData = async (data: number | null) => {
    // Perform the necessary API request with the lead data
    if (data) {
      // Example fetch request
      await fetch(`${API}/get-lead-by-id/${data}`)
        .then((res) => res.json())
        .then(async (badgeUser) => {
          const response = await fetch(`${API}/add-lead`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: badgeUser.firstName + ' ' + badgeUser.lastName,
              company: badgeUser.company,
              email: badgeUser.email,
              role: badgeUser.jobTitle,
              vendorEmail: user?.email,
            }),
          });
          if (response.ok) {
            navigation.navigate('Home');
          } else {
            setError('Error sending lead data. Please try again.');
          }
        });

      // Handle the response as needed
    }
  };

  if (hasPermission === null) {
    return <View style={styles.container} />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/SynbioLogo.jpeg')} style={styles.image} />
      <View style={styles.contentContainer}>
        <View style={styles.scannerContainer}>
          {!scanned && (
            <BarCodeScanner
              onBarCodeScanned={handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
              barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            />
          )}
          {scanned && (
            <View style={styles.checkmarkContainer}>
              <Image source={require('../assets/checkmark.png')} style={styles.checkmarkImage} />
            </View>
          )}
          <View style={styles.cameraBorder} />
        </View>
        {error && (
          <Text style={{ fontSize: 16, color: 'red', textAlign: 'center', marginBottom: '5%' }}>{error}</Text>
        )}
        <Text style={styles.orText}>OR</Text>
        <Button
          title="Enter Manually"
          buttonStyle={styles.buttonStyle}
          onPress={() => navigation.navigate('Manually Connect')}
        />
      </View>
      <FooterListMemo />
    </View>
  );
};

const { height } = Dimensions.get('window');
const scannerHeight = height * 0.4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  scannerContainer: {
    position: 'relative',
    height: scannerHeight,
    aspectRatio: 1,
    marginBottom: 20,
  },
  cameraBorder: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 2,
    borderColor: 'blue',
    borderRadius: 10,
    margin: 10,
  },
  checkmarkContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  checkmarkImage: {
    width: 100,
    height: 100,
  },
  orText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonStyle: {
    backgroundColor: 'black',
    height: 50,
    justifyContent: 'center',
    marginHorizontal: 85,
    borderRadius: 15,
  },
  image: {
    resizeMode: 'contain',
    width: '60%',
    height: '20%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    marginLeft: 75,
  },
});

export default Connect;
