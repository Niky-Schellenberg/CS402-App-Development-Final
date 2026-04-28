import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Button, StyleSheet, Text, View, VirtualizedList, TextInput, TextInputSubmitEditingEvent} from 'react-native';
import RecipeItem from '../customComponents/RecipeItem';
import {Ionicons} from '@expo/vector-icons';
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
  const [input, setInput] = useState("");
  const [recipes, setRecipes] = useState([]);

  const URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

  const getListLength = () => recipes.length;
  const getListItem = (data: any, index: number) => recipes[index];

  const listItem = (onentry: any) => {
    return <RecipeItem json={onentry}/>
  }

  async function searchRecipe(e: TextInputSubmitEditingEvent) {
    const response = await fetch(URL + e["nativeEvent"]["text"]);
    console.log("HTTP Load Response Code: " + response.status);
    setRecipes((await response.json()).meals);
  }

  function goFavs() {
    //
  }

  return <View style={styles.container}>
    <View style={styles.navBar}>
      <TextInput
        style={styles.input}
        onSubmitEditing={searchRecipe}
        placeholder="Enter to search"
        placeholderTextColor={"#dcdcdc"}
        onChangeText={setInput}
        value={input}
      />
      <TouchableOpacity style={styles.button} onPress={goFavs}>
          <Ionicons name='star' size={30} color={'#FFF000'}/>
      </TouchableOpacity>
    </View>
    <VirtualizedList style={styles.list} data={recipes} renderItem={listItem} getItemCount={getListLength} getItem={getListItem}/>
  </View>
}
