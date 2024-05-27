import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from '../utils/AuthContext';
import { useNavigation } from '@react-navigation/native';

const API_URL = 'http://10.0.2.2:8083/notice/univactivity/checked-list';

export default function PortfolioListScreen() {
  const [portfolioList, setPortfolioList] = useState([]);
  const { user, token } = useAuth(); // 현재 로그인한 유저의 user, token
  const navigation = useNavigation();

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const response = await axios.get(`${API_URL}?memberId=${user.email}`);
      if (response.status === 200) {
        setPortfolioList(response.data); // Set the fetched activity data in the state
      }
    } catch (error) {
      console.error('해당 참여 공지사항 불러오기 오류:', error);
    }
  };
  

  const handleHomePress = () => {
    navigation.navigate('Main'); 
  };

    return (
      <>
        <View style={styles.container}>
          <LinearGradient
            colors={['#E2D0F8', '#A0BFE0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.linearGradient}
          >
            <View style={styles.header}>
              <TouchableOpacity onPress={handleHomePress} style={styles.homeButton}>
                <AntDesign name="home" size={24} color="rgba(74, 85, 162, 1)" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.headerTitle}>참여한 공지사항 목록</Text>
                </TouchableOpacity>
                
            </View>
          </LinearGradient>
    
          <View style={styles.main}>
              <FlatList
                data={portfolioList}
                keyExtractor={(item) => item.id.toString()} // Assuming 'id' is a unique identifier
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.activityItem}
                    onPress={() => navigation.navigate('myportfolio', { portfolioId: item.id })} // Pass the activityId to the 'Activity' screen
                  >
                    <View style={styles.activityDetails}>
                      <Text style={styles.activityCategory}>참여한 공지사항</Text>
                      {/* <Text style={styles.activityDday}>D-10</Text> */}
                    </View>
                    <Text style={styles.activityItemTitle}>{item.title}</Text>
                  </TouchableOpacity>
                )}
              />
          </View>
        </View>
      </>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      linearGradient: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
      },
      homeButton: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
      },
      headerTitle: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
      },
      nav: {
        height: 80,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        overflow: 'hidden',
      },
      navContent: {
        alignItems: 'flex-start',
        paddingVertical: 10,
        paddingHorizontal: 20,
      },
      navButton: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginRight: 10,
        marginBottom: 10,
      },
      navButtonText: {
        color: 'rgba(74, 85, 162, 1)',
        fontWeight: 'bold',
      },
      main: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: 'white',
      },
      activityList: {
        flexDirection: 'column',
        alignItems: 'stretch',
      },
      activityItem: {
        backgroundColor: 'rgba(226, 208, 248, 0.3)',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 10,
      },
      activityDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
      },
      activityCategory: {
        fontWeight: 'bold',
        color: 'rgba(74, 85, 162, 1)',
      },
      activityDday: {
        fontWeight: 'bold',
      },
      activityItemTitle: {
        fontWeight: 'bold',
        fontSize: 16,
      },
      navButtonPlus: {
        backgroundColor: 'transparent',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginRight: 10,
        marginBottom:13,
        flexDirection: 'row',
        justifyContent: 'flex-end',
      },
      navButtonTextPlus: {
        color: 'blue',
        fontWeight: 'bold',
      },
    });