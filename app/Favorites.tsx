import React, {useState, useEffect} from 'react';
import {StyleSheet, View, VirtualizedList} from 'react-native';
import RecipeItem from './customComponents/RecipeItem';
import asyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
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
    backgroundColor: '#00000000',
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

export default function Favorites() {
  const [recipes, setRecipes] = useState<any[]>([]);
  useEffect(() => {
    const timer = setTimeout(() => {
      init();
    }, 1000);
    return() => clearTimeout(timer);
  }, []);

  const URL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

  async function init() {
    try {
    const fetchedList = await asyncStorage.getItem("favorites");
    if(fetchedList != null) {
        const list = fetchedList.split(",");
        console.log(list);
        const results = await Promise.all(
        list.map(async element =>{
          try{
          const response = await (await fetch(URL + element)).json();
          return response.meals[0];
          } catch (e) {
            console.log("Failed to fetch meal: " + element);
            return null;
          }
        })
        );
        setRecipes(results);
    }
  } catch (e) {
    console.log("Init error: " + e)
  }
  }

  const getListLength = () => recipes.length;
  const getListItem = (data: any, index: number) => recipes[index];

  const listItem = (onentry: any) => {
    return <RecipeItem json={onentry}/>
  }

  return <View style={styles.container}>
    <VirtualizedList 
    style={styles.list} 
    data={recipes} 
    renderItem={listItem} 
    getItemCount={getListLength} 
    getItem={getListItem}
    keyExtractor={(item, index) => item?.idMeal ?? index.toString()}
    />
  </View>
}
