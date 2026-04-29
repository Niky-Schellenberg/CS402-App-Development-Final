import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import asyncStorage from '@react-native-async-storage/async-storage';

const IngredientsItem = (props: any) => {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#000000',
            flex: 1,
            width: "100%",
            borderWidth: 5,
            borderColor: '#585851d7',
            padding: 5,
            textAlign: "center",
            margin: 5,
            flexDirection: "row"
        },
        text: {
            color: '#ffffff',
            fontSize: 18,
            flex: 1,
        }
    });

    const ingredient = props.ingredient.item;
    const rerender = props.rerender;
    const [checked, setChecked] = useState(false);

    useEffect (() =>{
        setChecked(props.allChecked);
    }, [props.allChecked]);

    async function remove() {
        const fetchedList = await asyncStorage.getItem("ingredients");
        if(fetchedList != null){
            const list = fetchedList.split(',').filter((item) => item !== ingredient);
            await asyncStorage.setItem("ingredients", list.toString())
            rerender();
        }
    }

    const checkbox = <Ionicons name='checkbox' size= {30} color = {"white"}/>
    const openbox = <Ionicons name = 'square' size = {30} color = {"white"}/>
    return <View style={styles.container}>
        <TouchableOpacity onPress = {() =>setChecked(!checked)}>
            {checked ? checkbox : openbox}
        </TouchableOpacity>
        <Text style = {styles.text}>{ingredient}</Text>
        <TouchableOpacity onPress= {remove}>
            <Ionicons name='close' size={30} color={"white"}/>
        </TouchableOpacity>
    </View>
}

export default IngredientsItem;