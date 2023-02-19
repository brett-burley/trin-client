import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Library from '../Library/Library';
import Book from '../Book/Book';

const Tab = createBottomTabNavigator();

export default function Navigation()
{
  return (
    <NavigationContainer>
      <Tab.Navigator sceneContainerStyle={{ 
        backgroundColor: '#eeeeff',
      }}>

        <Tab.Screen 
          name='Library'
          component={Library} 
          options={{
            title: 'Library',
            tabBarIcon: () => <Ionicons name="library-outline" size={24} color="black" />,
          }}
        />

        <Tab.Screen 
          name='Book'
          component={Book}
          options={{
            tabBarStyle: { display: 'none' },
            headerShown: false,
            title: 'Read',
            tabBarIcon: () => <Ionicons name="reader-outline" size={24} color="black" />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
