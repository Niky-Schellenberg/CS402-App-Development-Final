import React, {useState, useCallback} from 'react';
import { useFocusEffect } from 'expo-router';
import {StyleSheet, View, VirtualizedList, Text, TouchableOpacity} from 'react-native';
import IngredientItem from '../customComponents/IngredientItem';
import asyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#353535",
  },
  list: {
    flex: 1,
  },
  text: {
    color: '#ffffff',
    alignSelf: "center",
    fontSize: 15
  },
  input: {
    margin: 5,
    borderWidth: 5,
    borderColor: '#585851d7',
    backgroundColor: '#000000',
    padding: 2,
    fontSize: 18,
    color: '#ffffff',
    flexGrow: 2
  },
  navBar: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#a259e2c9",
    padding: 5,
  },
});

export default function HomeScreen() {
  const [ingredients, setIngredients] = useState([""]);
  const [allChecked, setAllChecked] = useState(false);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [])
  );

  const getListLength = () => ingredients.length;
  const getListItem = (data: any, index: number) => ingredients[index];

  const listItem = (onentry: any) => {
    return <IngredientItem ingredient={onentry} rerender={refresh}/>
  }

  async function refresh() {
    const fetchedList = await asyncStorage.getItem("ingredients");
    if(fetchedList != "" && fetchedList != null) {
      setIngredients(fetchedList.split(","));
    } else {
      setIngredients([]);
    }
  }

  async function clear() {
    await asyncStorage.setItem("ingredients", "");
    await refresh();
  }


  return <View style={styles.container}>
    <View style={styles.navBar}>
      <TouchableOpacity style = {styles.button} onPress={() => setAllChecked(true)}>
        <Text style = {styles.text}> Check All</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.button} onPress = {() => setAllChecked(false)}>
        <Text style = {styles.text}> Uncheck All </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={clear}>
        <Text style={styles.text}>Clear List</Text>
      </TouchableOpacity>
    </View>
    <VirtualizedList 
    style={styles.list} 
    data={ingredients} 
    renderItem={(item) => <IngredientItem ingredient = {item} rerender={refresh} allChecked = {allChecked} />} 
    getItemCount={getListLength} 
    getItem={getListItem}
    keyExtractor={(item, index) => item.toString()}
    />
  </View>
}
