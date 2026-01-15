import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import EstadoCapital from "./screens/EstadoCapital";
import Ofertas from "./screens/Ofertas";
import Decisao from "./screens/Decisao";
import Logs from "./screens/Logs";
import Acoes from "./screens/Acoes";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            const icons: Record<string, string> = {
              Estado: "pulse",
              Ofertas: "pricetags",
              Decisão: "git-branch",
              Logs: "list",
              Ações: "hand-left",
            };

            return (
              <Ionicons
                name={icons[route.name] as any}
                size={size}
                color={color}
              />
            );
          },
        })}
      >
        <Tab.Screen name="Estado" component={EstadoCapital} />
        <Tab.Screen name="Ofertas" component={Ofertas} />
        <Tab.Screen name="Decisão" component={Decisao} />
        <Tab.Screen name="Logs" component={Logs} />
        <Tab.Screen name="Ações" component={Acoes} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
