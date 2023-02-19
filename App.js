import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AllStates from './components/layout/AllStates';
import Navigation from './components/Navigation/Navigation';
import Alert from './components/layout/Alert';

export default function App() {
  return (
    <AllStates>
      <SafeAreaProvider>
        <Alert>
          <StatusBar hidden={true} />
          <Navigation />
        </Alert>
      </SafeAreaProvider>
    </AllStates>
  );
}


const sty = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
