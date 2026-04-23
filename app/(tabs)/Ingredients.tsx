  import React, {useState, useEffect} from 'react';
  import {TouchableOpacity, Button, StyleSheet, Text, View, VirtualizedList, TextInput, TextInputSubmitEditingEvent} from 'react-native';

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white'
    },

    title: {
      fontSize: 21,
    }
  });

  export default function HomeScreen() {
  return <View style = {styles.container}>
   <Text style = {styles.title}> Ingredients </Text>
   </View>
  }
