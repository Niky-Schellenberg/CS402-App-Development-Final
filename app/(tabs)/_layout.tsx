import { Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name = "Recipe" options = {{
        title: 'Recipe',
        tabBarIcon: ({color, size}) => (
          <Ionicons name = 'book' size = {10} color= {'black'} />
        )
        }} 
      />
      <Tabs.Screen name = "index" options = {{
        href: null
        }} />
      <Tabs.Screen name = "Ingredients" options = {{
        title: 'Ingredients',
        tabBarIcon: ({color, size}) => (
          <Ionicons name= 'list' size = {10} color = {'black'} />
          )
        }} 
      />
    </Tabs>
  );
}
