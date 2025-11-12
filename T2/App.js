import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "./screens/HomeScreen"
import AddEditScreen from "./screens/AddEditScreen"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#000",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Mis Contactos" }} />
        <Stack.Screen
          name="AddEdit"
          component={AddEditScreen}
          options={({ route }) => ({
            title: route.params?.contact ? "Editar Contacto" : "Agregar Contacto",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
