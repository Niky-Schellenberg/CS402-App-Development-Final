import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const RecipeItem = (props: any) => {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#000000',
            flex: 1,
            width: "100%",
            borderWidth: 5,
            borderColor: '#fff000',
            padding: 5,
            textAlign: "center",
            margin: 5,
            flexDirection: "row"
        },
    });

    const ingredient = props.ingredient.item;
    const rerender = props.rerender.item;

    return <View style={styles.container}>
        <TouchableOpacity>
            <Ionicons name='checkbox' size={30} color={"while"}/>
        </TouchableOpacity>
        <Text>{ingredient}</Text>
        <TouchableOpacity>
            <Ionicons name='close' size={30} color={"while"}/>
        </TouchableOpacity>
    </View>
}

export default RecipeItem;