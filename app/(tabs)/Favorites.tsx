import React, {useState, useEffect} from 'react';
import {StyleSheet, View, VirtualizedList} from 'react-native';
import RecipeItem from '../customComponents/RecipeItem';
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

export default function Favorites() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {init();}, []);

  const URL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

  async function init() {
    const fetchedList = await asyncStorage.getItem("favorites");
    if(fetchedList != null) {
        const list = fetchedList.split(",");
        console.log(list);
        list.forEach(async element => {
            const response = ((await (await fetch(URL + element)).json()).meals);
            setRecipes(recipes.concat(response));
        });
    }
  }

  const getListLength = () => recipes.length;
  const getListItem = (data: any, index: number) => recipes[index];

  const listItem = (onentry: any) => {
    return <RecipeItem json={onentry}/>
  }

  return <View style={styles.container}>
    <VirtualizedList style={styles.list} data={recipes} renderItem={listItem} getItemCount={getListLength} getItem={getListItem}/>
  </View>
}
