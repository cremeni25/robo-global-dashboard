import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import EstadoCapital from "./screens/EstadoCapital";
import Ofertas from "./screens/Ofertas";
import Decisao from "./screens/Decisao";
import Logs from "./screens/Logs";
import Acoes from "./screens/Acoes";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Estado" component={EstadoCapital} />
        <Tab.Screen name="Ofertas" component={Ofertas} />
        <Tab.Screen name="Decisão" component={Decisao} />
        <Tab.Screen name="Logs" component={Logs} />
        <Tab.Screen name="Ações" component={Acoes} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
