import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DashboardScreen, MenuScreen } from '../screens';

const Stack = createNativeStackNavigator();

export function DashboardStackNavigation() {
  return (
    <Stack.Navigator initialRouteName="DashboardNumbers">
      <Stack.Screen
        name="DashboardNumbers"
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Menu"
        component={MenuScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
