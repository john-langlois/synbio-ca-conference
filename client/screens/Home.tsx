import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, FlatList } from 'react-native';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import FooterList from '../components/Footer/FooterList';
import { getAuth } from 'firebase/auth';
import { StackScreenProps } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const auth = getAuth();

const HomeScreen:React.FC<StackScreenProps<any>>  = ({navigation}) => {
  const FooterListMemo = React.memo(FooterList);
  const API = "https://synbio-conference-2023.ue.r.appspot.com/lead"
  const PAGE_SIZE = 6;

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { user } = useAuthentication();
  const [refresh,setRefresh] = useState(false);
  

  const getUsers = async () => {
    if (user?.email && page === 1) {
      setLoading(true);
      await fetch(`${API}/get-lead/${user.email}?page=${page}&limit=${PAGE_SIZE}`)
        .then((res) => res.json())
        .then((newData) => {
          setData(newData);
          setPage((prevPage) => prevPage + 1);
          setLoading(false);
        });
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if(user?.email){
         getUsers(); // Call the API function here
      }
    }, [user?.email])
  );


  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredProfiles = data.filter((profile) =>
      profile?.name.toLowerCase().includes(text.toLowerCase()) || profile?.company.toLowerCase().includes(text.toLowerCase()) || profile?.role.toLowerCase().includes(text.toLowerCase()) 
    );
    setFilteredData(filteredProfiles);
  };

  const handleLoadMore = () => {
    if (!loading && filteredData.length === 0) {
      getUsers();
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen', { userProfile: item })}>
      <View style={styles.card}>
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.company}>{item.company}</Text>
          <Text style={styles.role}>{item.role}</Text>
        </View>
        <View style={styles.arrowContainer}>
          <View style={styles.arrow} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View key={page} style={styles.container}>
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={24} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <ScrollView style={styles.contentContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredData.length > 0 ? filteredData : data}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading && <ActivityIndicator size="small" color="#000000" />}
        />
      </ScrollView>
      <FooterListMemo style={styles.footer} />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginHorizontal: 15,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
    marginTop: 16,
  },
  contentContainer: {
    flexGrow: 1,
    marginBottom: 100,
  },
  searchIcon: {
    marginLeft: 8,
    marginRight: 4,
  },
  searchBar: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 8,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  company: {
    fontSize: 14,
  },
  role: {
    fontSize: 12,
    color: 'gray',
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    backgroundColor: '#138f3a',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  arrow: {
    width: 16,
    height: 16,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: '#FFFFFF',
    transform: [{ rotate: '45deg' }],
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  }
});
