import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer'
import {View} from 'react-native'
import {NavigationContainer,DarkTheme,DefaultTheme} from '@react-navigation/native'
import {Provider as PaperProvider,DarkTheme as PaperDarkTheme,DefaultTheme as PaperDefault,Switch} from 'react-native-paper'
import Personal from '../screens/Personal'
import Pedometer from "../screens/Pedometer"
import Login from '../screens/Login'
import {styles} from '../global/styles'
import {connect} from 'react-redux'
import * as ACTIONS from '../global/store/actions'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Calories from '../screens/Calories'
import Trends from '../screens/Trends'
import Food from '../screens/Food'
import Meals from '../screens/Meals'
import { useFonts, Ruda_600SemiBold } from '@expo-google-fonts/ruda';
import AppLoading from 'expo-app-loading';


const Drawer = createDrawerNavigator()
function Navigator(props) {
    let [fontsLoaded] = useFonts({
        Ruda_600SemiBold
      });
    const DrawerScreen = (icon,title,component)=>{
        return <Drawer.Screen name={title} component={component}
        options={{
            title,
            drawerActiveTintColor:props.main.theme ? "lightgrey" : "#00CAB1",
            drawerIcon:()=>{
                return <MaterialCommunityIcons  
                size={28}
                color={props.main.theme ? "#C867FF" : "#00CAB1"}
                name={icon}/>  
            }
        }}></Drawer.Screen>
    }
        if(!fontsLoaded){
            return <AppLoading />;
        }else{
            return(
                <PaperProvider theme={props.main.theme ? PaperDarkTheme : PaperDefault}>
                <View style={styles.navbarContainer}>
                </View>
                    <NavigationContainer  style={{...styles.navigatorContainer}} theme={props.main.theme ? DarkTheme : DefaultTheme}>
                        <Drawer.Navigator screenOptions={{
                            headerStyle:{...styles.navbar},
                            headerTintColor: props.main.theme ? "white" : "black",
                            headerRight: ()=> {
                                return <View style={styles.switchButton}>
                                    <Switch thumbColor={props.main.theme ? "#C867FF" : "#00CAB1"} style={{padding: 20}} trackColor={{false:"black",true:"white"}} value={props.main.theme} onValueChange={()=>props.setTheme()}/>
                                    <MaterialCommunityIcons name={props.main.theme ? "moon-waxing-crescent" : "white-balance-sunny"} color={props.main.theme ? "#C867FF" : "#00CAB1"} size={35} style={{alignSelf:'center',marginHorizontal:10,marginBottom:5}}/>
                                </View>
                            }
                        }}
                        >
                            {!props.main.session ? DrawerScreen("home","Login",Login):DrawerScreen("walk","Pedometer",Pedometer)}
                            {props.main.session ? DrawerScreen("human","Personal",Personal) : null}
                            {props.main.session ? DrawerScreen("fish","Food",Food) : null}
                            {props.main.session ? DrawerScreen("silverware-fork-knife","Meals",Meals) : null}
                            {props.main.session ? DrawerScreen("chart-bar","Trends",Trends) : null}
                            {props.main.session ? DrawerScreen("fire","Macros",Calories) : null}
                        </Drawer.Navigator>
                    </NavigationContainer>
            </PaperProvider>
            )
        }
}

const mapStateToProps = state =>{
    return {
        main: state.main
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        setTheme: ()=> dispatch(ACTIONS.setTheme())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navigator);