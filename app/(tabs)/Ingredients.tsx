import React, {useState} from 'react';
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
    borderColor: '#fff000',
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
    backgroundColor: "#5500a0",
    padding: 5,
  },
});

export default function HomeScreen() {
  const [ingredients, setIngredients] = useState([""]);

  const getListLength = () => ingredients.length;
  const getListItem = (data: any, index: number) => ingredients[index];

  const listItem = (onentry: any) => {
    return <IngredientItem ingredient={onentry} rerender={refresh}/>
  }

  async function refresh() {
    const fetchedList = await asyncStorage.getItem("ingredients");
    if(fetchedList != null) {
      setIngredients(fetchedList.split(","));
    } else {
      setIngredients([]);
    }
  }

  async function clear() {
    await asyncStorage.setItem("ingredients", "");
    await refresh();
  }

  refresh();

  return <View style={styles.container}>
    <View style={styles.navBar}>
      <TouchableOpacity style={styles.button} onPress={clear}>
        <Text style={styles.text}>Clear List</Text>
      </TouchableOpacity>
    </View>
    <VirtualizedList style={styles.list} data={ingredients} renderItem={listItem} getItemCount={getListLength} getItem={getListItem}/>
  </View>
}
