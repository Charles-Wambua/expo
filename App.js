import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {GestureHandlerRootView} from "react-native-gesture-handler"
import WelcomeScreen from "./app/screens/WelcomeScreen";
import ViewForm from "./app/screens/ViewForm";
import FrontPage from "./app/screens/FirstScreen";
import Admin from "./app/screens/Admin";
import StackNavigator from "./StackNavigator";

const Stack = createStackNavigator();
export default function App() {
  return (
    <StackNavigator/>
    // <GestureHandlerRootView style={{flex: 1}}>
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="FrontPage" screenOptions={{ headerShown: false }}>
    //     <Stack.Screen name="FrontPage" component={FrontPage} />
    //     <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
    //     <Stack.Screen name="ViewForm" component={ViewForm} />
    //     <Stack.Screen name="Admin" component={Admin} />
    //   </Stack.Navigator>
    //   </NavigationContainer>
    //   </GestureHandlerRootView>
  );
}
