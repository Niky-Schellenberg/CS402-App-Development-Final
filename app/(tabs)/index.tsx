import { View, StyleSheet, Text } from 'react-native';


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#353535'
  },
  welcome: {
    fontSize: 32,
    color: 'white'
  },
});


export default function Index() {
  return <View style = {styles.container}>
    <Text style = {styles.welcome}> Welcome to Reciprep! </Text>
    </View>;
}

