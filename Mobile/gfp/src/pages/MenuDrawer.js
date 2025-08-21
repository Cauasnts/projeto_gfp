import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text, View } from 'react-native';
import Principal from './Principal';
import Contas from './contas';
import CadContas from './CadContas';
import CadCategorias from './CadCategorias';
import Categorias from './Categorias';


const Drawer = createDrawerNavigator();

export default function MenuDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#00B894', // verde vibrante
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTintColor: '#fff', // texto branco no header
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 22,
          letterSpacing: 1,
        },
        drawerStyle: {
          backgroundColor: '#006d77', // ciano escuro no drawer
          width: 250,
        },
        drawerActiveTintColor: '#00b894', // cor do item ativo no drawer
        drawerInactiveTintColor: '#fff', // cor dos itens inativos
        drawerLabelStyle: {
          fontSize: 18,
          fontWeight: '600',
          letterSpacing: 0.5,
        },
      }}
    >
      <Drawer.Screen name="Principal" component={Principal} options={{drawerLabel: 'Página Principal',
      drawerIcon: () => (
            <View style={{ width: 24, height: 24,  }} />
            // Aqui você pode trocar por um ícone real usando react-native-vector-icons ou similar
          ),
        }}
      />
      <Drawer.Screen name="Contas" component={Contas} />
      <Drawer.Screen name="Categorias" component={Categorias} options={{ title: 'Categorias' }} />
      <Drawer.Screen name="CadContas" component={CadContas} options={{ title: '' }} />
      <Drawer.Screen name="CadCategorias" component={CadCategorias} options={{ title: '' }} />

    </Drawer.Navigator>
  );
}
