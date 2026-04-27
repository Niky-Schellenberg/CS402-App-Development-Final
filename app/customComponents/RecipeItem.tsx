import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Button, StyleSheet, Text, View, VirtualizedList, TextInput, TextInputSubmitEditingEvent, Image} from 'react-native';

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
        }
    });
    
    return <View style={styles.container}>
        <View style={styles.mainView}>
            <Image style={styles.image} source={{uri: props.json.item.strMealThumb}}/>
            <View style={styles.infoBreif}>
                <Text style={styles.title}>{props.json.item.strMeal}</Text>
                <Text style={styles.tags}>{props.json.item.strTags}</Text>
            </View>
        </View>
        
    </View>
}

export default RecipeItem;