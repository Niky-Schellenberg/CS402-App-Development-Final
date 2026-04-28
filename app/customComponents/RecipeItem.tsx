import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, Text, View, Image} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import asyncStorage from '@react-native-async-storage/async-storage';

const RecipeItem = (props: any) => {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#000000',
            flex: 1,
            width: "100%",
            borderWidth: 5,
            borderColor: '#fff000',
        },
        mainView: {
            flex: 1,
            padding: 5,
            textAlign: "center",
            margin: 5,
            flexDirection: "row"
        },
        image: {
            borderWidth: 5,
            borderColor: '#5500a0',
            padding: 5,
            fontSize: 20,
            margin: 5,
            width: 135,
            height: 135,
        },
        infoBreif: {
            justifyContent: "center"
        },
        title: {
            fontSize: 20,
            color: "#ffffff",
            width: 225
        },
        tags: {
            fontSize: 12,
            color: "#cacaca"
        },
        buttonContainer: {
            flex: 0,
            flexDirection: "row",
            margin: 20,
            justifyContent: "space-around"
        },
        button: {
            backgroundColor: "#5500a0",
            padding: 5,
        },
        text: {
            color: "#FFFFFF",
            fontSize: 20
        },
        ingredients: {
            padding: 10
        },
        instructions: {
            fontSize: 20,
            color: "#ffffff",
            padding: 10,
        }
    });

    const recipe = props.json.item;
    const [instructions, setIntructions] = useState(<View></View>);
    const [isHidden, setHidden] = useState(true);

    // There really doesn't seem to be a better way due to how the api gives data
    var ingredients = [
        recipe.strIngredient1,
        recipe.strIngredient2,
        recipe.strIngredient3,
        recipe.strIngredient4,
        recipe.strIngredient5,
        recipe.strIngredient6,
        recipe.strIngredient7,
        recipe.strIngredient8,
        recipe.strIngredient9,
        recipe.strIngredient10,
        recipe.strIngredient11,
        recipe.strIngredient12,
        recipe.strIngredient13,
        recipe.strIngredient14,
        recipe.strIngredient15,
        recipe.strIngredient16,
        recipe.strIngredient17,
        recipe.strIngredient18,
        recipe.strIngredient19,
        recipe.strIngredient20
    ];
    var measurements = [
        recipe.strMeasure1,
        recipe.strMeasure2,
        recipe.strMeasure3,
        recipe.strMeasure4,
        recipe.strMeasure5,
        recipe.strMeasure6,
        recipe.strMeasure7,
        recipe.strMeasure8,
        recipe.strMeasure9,
        recipe.strMeasure10,
        recipe.strMeasure11,
        recipe.strMeasure12,
        recipe.strMeasure13,
        recipe.strMeasure14,
        recipe.strMeasure15,
        recipe.strMeasure16,
        recipe.strMeasure17,
        recipe.strMeasure18,
        recipe.strMeasure19,
        recipe.strMeasure20
    ];

    for(var i = 0; i < ingredients.length; i++) {
        if(ingredients[i] == "" || ingredients[i] == null) {
            ingredients = ingredients.slice(0, i);
            measurements = measurements.slice(0, i);
        }
    }

    var combination = measurements;
    for(var i = 0; i < ingredients.length; i++) {
        combination[i] += " " + ingredients[i];
    }

    async function onPress() {
        if(isHidden) {
            const favorites = (await asyncStorage.getItem("favorites"))?.split(",");
            generateIntructions(((find(recipe.idMeal, favorites) != false) ? "#FFFFFF" : "#FFF000"));
        } else {
            setIntructions(<View></View>);
        }
        setHidden(!isHidden);
    }

    function find(item: any, list: any) {
        if(list != null) {
            for(var i = 0; i < list.length; i++) {
                if(list[i] == item) {
                    return false;
                }
            }
        }
        return item;
    }

    async function saveList(listName: string, list: any) {
        const fetchedList = await asyncStorage.getItem(listName);
        if(fetchedList == null) {
            await asyncStorage.setItem(listName, list.toString());
        } else {
            var toSave = fetchedList.split(",");
            const trimmedList = list.filter(function(item: any) {
                return find(item, toSave);
            });
            toSave = toSave.concat(trimmedList);
            await asyncStorage.setItem(listName, toSave.toString());
        }
    }

    async function addIngredients() {
        saveList("ingredients", ingredients);
    }

    async function changeFav() {
        const fetchedList = await asyncStorage.getItem("favorites");
        if(fetchedList == null) {
            await asyncStorage.setItem("favorites", recipe.idMeal);
            generateIntructions("#FFF000");
        } else {
            var compareTo = fetchedList.split(",");
            for(var i = 0; i < compareTo.length; i++) {
                if(compareTo[i] == recipe.idMeal) {
                    compareTo = compareTo.filter(function(item) {return item != recipe.idMeal});
                    await asyncStorage.setItem("favorites", compareTo.toString());
                    generateIntructions("#FFFFFF");
                    return;
                }
            }
            compareTo = compareTo.concat(recipe.idMeal);
            await asyncStorage.setItem("favorites", compareTo.toString());
            generateIntructions("#FFF000");
        }
    }

    function generateIntructions(starColor: string) { 
        var id = 0;
        setIntructions(<View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={addIngredients}>
                    <Text style={styles.text}>Add Ingredients to List</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={changeFav}>
                    <Ionicons name='star' size={30} color={starColor}/>
                </TouchableOpacity>
            </View>
            <View style={styles.ingredients}>
                {combination.map((ingredient) => {
                    return <Text style={styles.text} key={id++}>• {ingredient}</Text>
                })}
            </View>
            <Text style={styles.instructions}>{recipe.strInstructions}</Text>
        </View>);}
    
    return <View style={styles.container}>
        <TouchableOpacity style={styles.mainView} onPress={onPress}>
            <Image style={styles.image} source={{uri: recipe.strMealThumb}}/>
            <View style={styles.infoBreif}>
                <Text style={styles.title}>{recipe.strMeal}</Text>
                <Text style={styles.tags}>{recipe.strTags}</Text>
            </View>
        </TouchableOpacity>
        {instructions}
    </View>
}

export default RecipeItem;