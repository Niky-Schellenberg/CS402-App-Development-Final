import { Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs 
    screenOptions = {{
      headerStyle: {
        backgroundColor: '#353535'
      },
      headerTintColor: 'white',
      tabBarStyle: {
        backgroundColor: '#353535'
      },
      tabBarActiveTintColor: '#a259e2c9'
    }}
    >
      <Tabs.Screen name = "Recipe" options = {{
        title: 'Recipes',
        tabBarIcon: ({color, size}) => (
          <Ionicons name = 'book' size = {20} color= {'white'} />
        )
        }} 
      />
      <Tabs.Screen name = "index" options = {{
        href: null
        }} />
      <Tabs.Screen name = "Ingredients" options = {{
        title: 'Ingredients',
        tabBarIcon: ({color, size}) => (
          <Ionicons name= 'list' size = {20} color = {'white'} />
          )
        }} 
      />
    </Tabs>
  );
}
