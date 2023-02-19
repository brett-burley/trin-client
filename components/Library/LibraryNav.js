import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Books from './Books';
import Upload from './Upload';

const Tab = createBottomTabNavigator();

export default function LibraryNav()
{
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name='Books'
        component={Books} 
        options={{
          tabBarIcon: () => <Ionicons name="book-outline" size={24} color="black" />,
        }}
      />

      <Tab.Screen 
        name='Upload'
        component={Upload}
        options={{
          tabBarIcon: () => <Ionicons name="cloud-upload-outline" size={24} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
}

